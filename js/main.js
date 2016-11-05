// set required inputs
function initializeValidation() {
    //require name and email
    document.querySelector("#name").setAttribute("required", "true");
    document.querySelector("#mail").setAttribute("required", "true");
    document.querySelector("button[type='submit']").disabled=true;
}

// hide the text field for the "other" title
function hideOtherTitleInput() {
    var otherTitleLabel = document.querySelector("#otherLabel");
    var otherTitle = document.querySelector("#other-title");
    otherTitleLabel.className = "is-hidden";
    otherTitle.className = "is-hidden";
};

// show the "other" text field when the "other" option is selected
function addOtherJobOption() {
    var jobSelector = document.querySelector("#title");
    jobSelector.addEventListener("change", function() {
        var otherTitleLabel = document.querySelector("#otherLabel");
        var otherOption = document.querySelector("#other-title");
        if (jobSelector.selectedIndex === 5){
            otherOption.className = "is-not-hidden";
            otherTitleLabel.className = "is-not-hidden";
        } else {
            hideOtherTitleInput();
        }
    })
};

// bind changes to shirt styles to design selection
function bindShirtOptions () {
    var designSelect = document.querySelector("#design");
    designSelect.addEventListener("change", adjustShirtOptions);
};

// show or hide color choices depending on user selection of shirt design
function adjustShirtOptions() {
    var designSelect = document.querySelector("#design"); // get the design select element
    var colorSelect = document.querySelector("#color"); // get the color select element
    var colorChoices = colorSelect.children; // get the color options
    if (designSelect.selectedIndex === 1) { // assign color choices to corresponding design selection index
        for (i=0; i<3; i++) {
            colorChoices[i].className = ""; // show first set of choices
        }
        for (i=3; i<colorChoices.length; i++) {
            colorChoices[i].className = "is-hidden"; // hide second set of choices
        }
        colorSelect.selectedIndex = 0; 
    } else if (designSelect.selectedIndex === 2) {
        for (i=0; i<3; i++) {
            colorChoices[i].className = "is-hidden"; // hide first set of choices
        }
        for (i=3; i<colorChoices.length; i++) {
            colorChoices[i].className = ""; // show first set of choices
        }
        colorSelect.selectedIndex = 3;
    } else {
        for (i=0; i<colorChoices.length; i++) {
            colorChoices[i].className = ""; // show all choices
        }
        colorSelect.selectedIndex = 0;
    }
};

// bind visible payment options to payment select
function showPaymentOptions() {
    var paymentSelect = document.querySelector("#payment");
    var paymentOptions = document.querySelectorAll("div > p"); // get text informing user of redirection to paypal and bitcoin
    paymentOptions[0].setAttribute("class", "is-hidden"); // hide text
    paymentOptions[1].setAttribute("class", "is-hidden");
    paymentSelect.addEventListener("change", adjustPaymentDisplay); // bind changes in select menu to changes in payment display
};

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
};

// create messages, attach them to divs, and bind change event to check for conflicts
function bindScheduleCheck() {
    var cost = document.createElement("h3"); // create an h3 element
    cost.setAttribute("id", "cost"); // assign the id of 'cost'
    cost.innerText = "TOTAL COST = $0"; // set text of 'cost'
    var schedule = document.querySelector("fieldset[class='activities']"); // get activities fieldset
    var activities = schedule.getElementsByTagName("input"); // get input element of the fieldset, which is the set of choices
    schedule.appendChild(cost); // append message to bottom of options
    for (i=0; i<activities.length; i++) { // for each activity,
        var notice = document.createElement("div"); // create a div
        notice.innerText = "THIS EVENT IS UNAVAILABLE DUE TO YOUR CURRENT SELECTION"; // fill it with message communicating conflict
        notice.setAttribute("class", "is-hidden"); // hide the message
        activities[i].parentElement.appendChild(notice); // add the message to the schedule choice
        activities[i].addEventListener("change", adjustEvents); // bind a change event to each choice and run adjustEvents function when selections are made
    }
};

// check for conflicts, calculate total cost, and display or hide conflict and cost messages
function adjustEvents() {
    var schedule = document.querySelector("fieldset[class='activities']"); // get activities fieldset
    var activities = schedule.getElementsByTagName("input"); // get checkboxes
    var totalCost = 0; // set cost to zero
    if (activities[0].checked) { // add 200 to cost for conference
        totalCost += 200;
    }
    for (i=0; i<activities.length; i++) { // for each activity
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
    
};

// check that at least one activity is checked
function checkForActivity() {
    var activitiesSet = document.querySelectorAll("input[type='checkbox']");
    var numOfActivities = 0;
    for (i=0; i<activitiesSet.length; i++) {
        numOfActivities++;
    }
    //get list of activity inputs
    if (activitiesSet.length > 0) { //check that at least one activity is selected
        return true;
    } else {
        return false;
    }//return true or false
};

// verify credit card information has been entered
function checkCreditCard() {
    var ccvalid = false;
    var creditNum = document.querySelector("#cc-num").value;
    var zip = document.querySelector("#zip").value;
    var cvc = document.querySelector("#cvv").value;
    if (number.length > 0) {
        ccvalid = verifyCCNumber(creditNum); // verify credit card number
    }
    if (ccvalid = true && zip.length === 5 && cvc.length === 3) {
        return true; // return true if all is in order
    }
};

// confirm credit card number is valid
function verifyCCNumber(creditNum) {
    if (creditNum.length !== 16) { // check that credit card number is valid length
        return false;
    }
    var lastDig = creditNum.pop(); // get last digit
    var creditNumRev = creditNum.reverse(); // reverse number order
    var total;
    for (i=0; i<creditNumRev.length; i+=2) { // for odd numbers
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
};

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
    } else { // else payment selection is true
        verifiedPayment = true;
    }
    if (verifiedActivity === true && verifiedPayment === true) { // if activity and payment info is valid, 
       document.querySelector("button[type='submit']").disabled=false; // enable submit button
    } else {
        document.querySelector("button[type='submit']").disabled=true; 
    }
    console.log("The form has been checked");
};

// bind validation check to submit button when mouse hovers over submit
function bindSubmitValidation() {
    validateForm(); // run validation check
    document.querySelector("button[type='submit']").addEventListener("mouseover", validateForm);
};

function main() {
    initializeValidation(); // initialize form
    document.querySelector("#name").focus(); // give focus to name field
    hideOtherTitleInput(); // hide the other title text field
    addOtherJobOption(); // bind display of 'other' text field to select menu
    bindShirtOptions(); // bind display of shirt options to select menu
    showPaymentOptions(); // show payment info depending on selection
    bindScheduleCheck(); // bind check for schedule selection
    bindSubmitValidation(); // bind form validation to submit button
};

window.onload = main; // run main function when page is loaded

