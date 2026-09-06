/* =================================
   QUEUELESS STUDENT JAVASCRIPT
================================= */


/*
    Get the queue from localStorage.

    If no queue exists yet,
    create an empty array.
*/

let queue = JSON.parse(
    localStorage.getItem("queue")
) || [];



/*
    Current token being served.

    Example:

    A00
    A01
    A02
*/

let currentToken =
    parseInt(
        localStorage.getItem("currentToken")
    ) || 0;



/* =================================
   SAVE QUEUE
================================= */

function saveQueue() {

    localStorage.setItem(
        "queue",
        JSON.stringify(queue)
    );

}



/* =================================
   GET TOKEN
================================= */

function getToken(serviceName) {


    /*
        Find the highest token number.
    */

    let highestToken = 0;


    queue.forEach(function(person) {

        if (person.number > highestToken) {

            highestToken = person.number;

        }

    });


    /*
        Generate next token.
    */

    let newNumber = highestToken + 1;


    /*
        Create token object.
    */

    let newPerson = {

        number: newNumber,

        token:
            "A" +
            String(newNumber).padStart(2, "0"),

        service: serviceName

    };


    /*
        Add person to queue.
    */

    queue.push(newPerson);


    /*
        Save queue.
    */

    saveQueue();


    /*
        Save student's token.
    */

    localStorage.setItem(
        "myToken",
        JSON.stringify(newPerson)
    );


    /*
        Open student page.
    */

    window.location.href =
        "student.html";

}



/* =================================
   UPDATE STUDENT PAGE
================================= */

function updateStudentPage() {


    /*
        Get student's token.
    */

    let myTokenData =
        JSON.parse(
            localStorage.getItem("myToken")
        );


    /*
        If no token exists,
        show default information.
    */

    if (!myTokenData) {

        return;

    }


    /*
        Find HTML elements.
    */

    let serviceName =
        document.getElementById("serviceName");

    let myToken =
        document.getElementById("myToken");

    let current =
        document.getElementById("currentToken");

    let peopleAhead =
        document.getElementById("peopleAhead");

    let waitTime =
        document.getElementById("waitTime");

    let status =
        document.getElementById("queueStatus");


    /*
        Display information.
    */

    if (serviceName) {

        serviceName.textContent =
            myTokenData.service;

    }


    if (myToken) {

        myToken.textContent =
            myTokenData.token;

    }


    /*
        Current token.
    */

    let currentNumber =
        parseInt(
            localStorage.getItem("currentToken")
        ) || 0;


    if (current) {

        current.textContent =
            "A" +
            String(currentNumber)
                .padStart(2, "0");

    }


    /*
        Calculate people ahead.
    */

    let ahead =
        myTokenData.number -
        currentNumber;


    /*
        Don't allow negative values.
    */

    if (ahead < 0) {

        ahead = 0;

    }


    if (peopleAhead) {

        peopleAhead.textContent =
            ahead;

    }


    /*
        Estimated wait.

        Assume each person takes
        approximately 3 minutes.
    */

    let estimatedTime =
        ahead * 3;


    if (waitTime) {

        waitTime.textContent =
            estimatedTime + " min";

    }


    /*
        Update status.
    */

    if (status) {


        if (
            currentNumber ===
            myTokenData.number
        ) {

            status.textContent =
                "🟢 It is your turn! Please proceed to the counter.";

            status.style.background =
                "#eaf8ef";

            status.style.color =
                "#24733c";


        }

        else if (
            ahead <= 2 &&
            ahead > 0
        ) {

            status.textContent =
                "🔔 Your turn is approaching!";

        }

        else if (
            currentNumber >
            myTokenData.number
        ) {

            status.textContent =
                "⚠️ Your token has been passed.";

        }

        else {

            status.textContent =
                "🟢 You are in the queue.";

        }

    }

}



/* =================================
   LEAVE QUEUE
================================= */

function leaveQueue() {


    /*
        Get student's token.
    */

    let myTokenData =
        JSON.parse(
            localStorage.getItem("myToken")
        );


    if (!myTokenData) {

        window.location.href =
            "index.html";

        return;

    }


    /*
        Remove token from queue.
    */

    queue =
        queue.filter(function(person) {

            return person.number !==
                myTokenData.number;

        });


    /*
        Save updated queue.
    */

    saveQueue();


    /*
        Remove student's token.
    */

    localStorage.removeItem(
        "myToken"
    );


    /*
        Return to home.
    */

    window.location.href =
        "index.html";

}



/* =================================
   AUTOMATIC PAGE UPDATE
================================= */

updateStudentPage();


/*
    Refresh information every second.

    This makes the student page
    automatically notice changes.
*/

setInterval(
    updateStudentPage,
    1000
);