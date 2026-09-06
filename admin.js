/* =================================
   QUEUELESS ADMIN JAVASCRIPT
================================= */


/*
    Get queue from localStorage.
*/

let queue = JSON.parse(
    localStorage.getItem("queue")
) || [];


/*
    Get current token.
*/

let currentToken =
    parseInt(
        localStorage.getItem("currentToken")
    ) || 0;



/* =================================
   SAVE DATA
================================= */

function saveData() {


    localStorage.setItem(
        "queue",
        JSON.stringify(queue)
    );


    localStorage.setItem(
        "currentToken",
        currentToken
    );

}



/* =================================
   NEXT TOKEN
================================= */

function nextToken() {


    /*
        Increase current token.
    */

    currentToken++;


    /*
        Save the new number.
    */

    saveData();


    /*
        Refresh dashboard.
    */

    updateAdminPage();

}



/* =================================
   UPDATE ADMIN PAGE
================================= */

function updateAdminPage() {


    /*
        Reload queue from storage.

        This allows the dashboard to
        detect newly created tokens.
    */

    queue =
        JSON.parse(
            localStorage.getItem("queue")
        ) || [];


    currentToken =
        parseInt(
            localStorage.getItem("currentToken")
        ) || 0;



    /*
        HTML elements.
    */

    let current =
        document.getElementById(
            "adminCurrentToken"
        );


    let smallCurrent =
        document.getElementById(
            "adminCurrentSmall"
        );


    let waitingCount =
        document.getElementById(
            "waitingCount"
        );


    let nextWaiting =
        document.getElementById(
            "nextWaiting"
        );


    let queueCount =
        document.getElementById(
            "queueCount"
        );


    let waitingList =
        document.getElementById(
            "waitingList"
        );



    /*
        Current token display.
    */

    let currentTokenText =
        "A" +
        String(currentToken)
            .padStart(2, "0");


    if (current) {

        current.textContent =
            currentTokenText;

    }


    if (smallCurrent) {

        smallCurrent.textContent =
            currentTokenText;

    }



    /*
        Find people who haven't
        been served yet.
    */

    let waitingPeople =
        queue.filter(function(person) {

            return person.number >
                currentToken;

        });



    /*
        Waiting count.
    */

    if (waitingCount) {

        waitingCount.textContent =
            waitingPeople.length;

    }


    if (queueCount) {

        queueCount.textContent =
            waitingPeople.length +
            " people";

    }



    /*
        Next waiting token.
    */

    if (nextWaiting) {


        if (waitingPeople.length > 0) {

            nextWaiting.textContent =
                waitingPeople[0].token;

        }

        else {

            nextWaiting.textContent =
                "--";

        }

    }



    /*
        Clear existing waiting list.
    */

    if (waitingList) {

        waitingList.innerHTML = "";


        /*
            No people waiting.
        */

        if (
            waitingPeople.length === 0
        ) {

            waitingList.innerHTML =
                '<p class="empty-queue">' +
                'No one is waiting right now.' +
                '</p>';

        }


        /*
            Create token badges.
        */

        waitingPeople.forEach(
            function(person) {


                let tokenElement =
                    document.createElement(
                        "div"
                    );


                tokenElement.className =
                    "waiting-token";


                tokenElement.textContent =
                    person.token;


                waitingList.appendChild(
                    tokenElement
                );

            }
        );

    }

}



/* =================================
   START DASHBOARD
================================= */

updateAdminPage();



/*
    Automatically update dashboard
    every second.
*/

setInterval(
    updateAdminPage,
    1000
);