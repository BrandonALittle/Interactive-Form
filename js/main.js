// set required inputs and hide t-shirt color select menu
function initializeForm() {
    //require name and email
    document.querySelector("#name").setAttribute("required", "true");
    document.querySelector("#mail").setAttribute("required", "true");
    var colorLabel = document.querySelector("label[for='color']");
    var colorSelect = document.querySelector("#color");
    colorLabel.className = "is-hidden";
    colorSelect.className = "is-hidden";
}

// hide the text field for the "other" title
function hideOtherTitleInput() {
    var otherTitleLabel = document.querySelector("#otherLabel"); // get the other title label
    var otherTitle = document.querySelector("#other-title"); // get the other title text field
    otherTitleLabel.className = "is-hidden"; // hide them
    otherTitle.className = "is-hidden";
}

// show the "other" text field when the "other" option is selected
function addOtherJobOption() {
    var jobSelector = document.querySelector("#title"); // get the title select menu
    jobSelector.addEventListener("change", function () { // listen for a change
        var otherTitleLabel = document.querySelector("#otherLabel"); // get the other title label
        var otherOption = document.querySelector("#other-title"); // get the other title text field
        if (jobSelector.selectedIndex === 5) { // if 'other' is selected
            otherOption.className = "is-not-hidden"; // show the text field
            otherTitleLabel.className = "is-not-hidden"; // and label
        } else {
            hideOtherTitleInput(); // or make sure the label and text field are hidden
        }
    });
}

// bind changes to shirt styles to design selection
function bindShirtOptions () {
    var designSelect = document.querySelector("#design"); // get the design select menu
    designSelect.addEventListener("change", adjustShirtOptions); // listen for a change and run a function to change the color options
}

// show or hide color choices depending on user selection of shirt design
function adjustShirtOptions() {
    var designSelect = document.querySelector("#design"); // get the design select element
    var colorLabel = document.querySelector("label[for='color']"); // get the color label element
    var colorSelect = document.querySelector("#color"); // get the color select element
    var colorChoices = colorSelect.children; // get the color options
    if (designSelect.selectedIndex === 1) { // assign color choices to corresponding design selection index
        colorLabel.className = "";
        colorSelect.className = "";
        for (var i=0; i<3; i++) {
            colorChoices[i].className = ""; // show first set of choices
        }
        for (i=3; i<colorChoices.length; i++) {
            colorChoices[i].className = "is-hidden"; // hide second set of choices
        }
        colorSelect.selectedIndex = 0; 
    } else if (designSelect.selectedIndex === 2) {
        colorLabel.className = ""; // show the color label
        colorSelect.className = ""; // show the color select menu
        for (var i=0; i<3; i++) {
            colorChoices[i].className = "is-hidden"; // hide first set of choices
        }
        for (i=3; i<colorChoices.length; i++) {
            colorChoices[i].className = ""; // show first set of choices
        }
        colorSelect.selectedIndex = 3;
    } else {
        colorSelect.className = "is-hidden"; // hide the color select menu
        colorLabel.className = "is-hidden"; // hide the color label
    }
}

// bind visible payment options to payment select
function showPaymentOptions() {
    var paymentSelect = document.querySelector("#payment");
    var paymentOptions = document.querySelectorAll("div > p"); // get text informing user of redirection to paypal and bitcoin
    paymentOptions[0].setAttribute("class", "is-hidden"); // hide text
    paymentOptions[1].setAttribute("class", "is-hidden");
    paymentSelect.addEventListener("change", adjustPaymentDisplay); // bind changes in select menu to changes in payment display
}

// change payment display based on menu selection
function adjustPaymentDisplay() {
    var paymentSelect = document.querySelector("#payment"); // get payment select input
    var selectedPayment = paymentSelect.selectedIndex; // get selected payment option
    var paymentOptions = document.querySelectorAll("div > p"); // select all paragraphs that are descendants of divs
    if (selectedPayment === 1) {
        document.querySelector("#credit-card").setAttribute("class", "credit-card"); // make sure credit card info displays
        paymentOptions[0].setAttribute("class", "is-hidden"); // hide other payment options
        paymentOptions[1].setAttribute("class", "is-hidden");
    } else if (selectedPayment === 2) {
        document.querySelector("#credit-card").setAttribute("class", "credit-card is-hidden"); // hide credit card info
        paymentOptions[0].setAttribute("class", ""); // show paypal info
        paymentOptions[1].setAttribute("class", "is-hidden"); // hide bitcoin info
    } else if (selectedPayment === 3) {
        document.querySelector("#credit-card").setAttribute("class", "credit-card is-hidden"); // hide credit card info
        paymentOptions[0].setAttribute("class", "is-hidden"); // hide paypal info
        paymentOptions[1].setAttribute("class", ""); // show bitcoin info
    } else {
        document.querySelector("#credit-card").setAttribute("class", "credit-card"); // revert to default, showing credit card info and hiding other option info
        paymentOptions[0].setAttribute("class", "is-hidden");
        paymentOptions[1].setAttribute("class", "is-hidden");
    }
}

// create messages, attach them to divs, and bind change event to check for conflicts
function bindScheduleCheck() {
    var cost = document.createElement("h3"); // create an h3 element
    cost.setAttribute("id", "cost"); // assign the id of 'cost'
    cost.innerText = "TOTAL COST = $0"; // set text of 'cost'
    var schedule = document.querySelector("fieldset[class='activities']"); // get activities fieldset
    var activities = schedule.getElementsByTagName("input"); // get input element of the fieldset, which is the set of choices
    schedule.appendChild(cost); // append message to bottom of options
    for (var i=0; i<activities.length; i++) { // for each activity,
        var notice = document.createElement("div"); // create a div
        notice.innerText = "THIS EVENT IS UNAVAILABLE DUE TO YOUR CURRENT SELECTION"; // fill it with message communicating conflict
        notice.setAttribute("class", "is-hidden"); // hide the message
        activities[i].parentElement.appendChild(notice); // add the message to the schedule choice
        activities[i].addEventListener("change", adjustEvents); // bind a change event to each choice and run adjustEvents function when selections are made
    }
}

// check for conflicts, calculate total cost, and display or hide conflict and cost messages
function adjustEvents() {
    var schedule = document.querySelector("fieldset[class='activities']"); // get activities fieldset
    var activities = schedule.getElementsByTagName("input"); // get checkboxes
    var totalCost = 0; // set cost to zero
    if (activities[0].checked) { // add 200 to cost for conference
        totalCost += 200;
    }
    for (var i=0; i<activities.length; i++) { // for each activity
        activities[i].removeAttribute("disabled"); // enable all choices
        activities[i].nextElementSibling.setAttribute("class", "is-hidden"); // hide conflict message
    }
    // disable conflicting activities and show conflict message
    if (activities[1].checked) {  
        activities[3].setAttribute("disabled", true);
        activities[3].nextElementSibling.setAttribute("class", "is-not-hidden");
    }
    if (activities[2].checked) {
        activities[4].setAttribute("disabled", true);
        activities[4].nextElementSibling.setAttribute("class", "is-not-hidden");
    }
    if (activities[3].checked) {
        activities[1].setAttribute("disabled", true);
        activities[1].nextElementSibling.setAttribute("class", "is-not-hidden");
    }
    if (activities[4].checked) {
        activities[2].setAttribute("disabled", true);
        activities[2].nextElementSibling.setAttribute("class", "is-not-hidden");
    }
    for (i=1; i<activities.length; i++) { // for each selected activity, add 100 to total cost
        if (activities[i].checked){
            totalCost += 100;           
        }
    }
    document.getElementById("cost").innerText = "TOTAL COST = $" + totalCost; // show new total
}

// check that at least one activity is checked
function checkForActivity() {
    var activitiesSet = document.querySelectorAll("input[type='checkbox']"); // get array of checkboxes
    var numOfActivities = 0; // set number of selected activities to zero
    for (var i=0; i<activitiesSet.length; i++) { // for each activity checkbox
        if (activitiesSet[i].checked === true) { // if it is checked
            numOfActivities++; // increment the selected activities counter
        }
    }
    if (numOfActivities > 0) { //check that at least one activity is selected
        return true;
    } else {
        return false;
    }//return true or false
}

// verify credit card information has been entered and number is valid
function checkCreditCard() {
    var ccvalid = false; // set validity to false by default
    var creditNum = document.querySelector("#cc-num").value; // get the CC number
    var zip = document.querySelector("#zip").value; // get the zip code
    var cvc = document.querySelector("#cvv").value; // get the CVC 
    if (creditNum !== null && creditNum.length > 0) { // check that a number has been entered
        ccvalid = verifyCCNumber(creditNum); // verify credit card number
    } else {
        return false;
    }
    if (ccvalid === true && zip.length === 5 && cvc.length === 3) {
        return true; // return true if all is in order
    }
}

// confirm credit card number is valid
function verifyCCNumber(creditNum) {
    if (creditNum.length !== 16) { // check that credit card number is valid length
        return false;
    }
    var lastDig = creditNum.pop(); // get last digit
    var creditNumRev = creditNum.reverse(); // reverse number order
    var total;
    for (var i=0; i<creditNumRev.length; i+=2) { // for odd numbers
        creditNumRev[i] *= 2; // double the number
        if (creditNumRev[i] > 9) { // for numbers greater than nine, subtract nine
            creditNumRev[i] -= 9;
        }
        total += creditNum[i]; // add to total
    }
    if (total % 10 === lastDig) { // check for remainder equal to last digit, and thereby valid CC number
        return true;
    } else {
        return false;
    }
}

// check all necessary elements to validate form
function validateForm() {
    var verifiedActivity = checkForActivity(); // verify activity selected
    var verifiedPayment = false; // set payment verification to false
    var paymentType = document.querySelector("#payment").selectedIndex; // get index of payment selection and verify accordingly
    //check for payment type
    //if credit card chosen,
    if (paymentType === 1) { // if CC is chosen, check info and verify number
        var verify = checkCreditCard();
        if (verify === true) {
            verifiedPayment = true;
        }
    } else { // else payment selection is true -- user selects paypal or bitcoin
        verifiedPayment = true;
    }
    if (verifiedActivity === true && verifiedPayment === true) { // if activity and payment info is valid, 
        return true;
    } else {
        return false; 
    }
}

// bind validation check to submission event
function bindSubmitValidation() {
    var form = document.getElementsByTagName("form")[0]; // get the form element
    form.addEventListener("submit", function(event) { // listen for submission
        var check = validateForm(); // check for correct and valid info
        if (check !== true) { // if something is wrong
            event.preventDefault(); // prevent submission event
        }
    });
}

function main() {
    initializeForm(); // initialize form
    document.querySelector("#name").focus(); // give focus to name field
    hideOtherTitleInput(); // hide the other title text field
    addOtherJobOption(); // bind display of 'other' text field to select menu
    bindShirtOptions(); // bind display of shirt options to select menu
    showPaymentOptions(); // show payment info depending on selection
    bindScheduleCheck(); // bind check for schedule selection
    bindSubmitValidation(); // bind form validation to submit button
}

window.onload = main; // run main function when page is loaded

