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
            colorChoices[i].className = "";
        }
        for (i=3; i<colorChoices.length; i++) {
            colorChoices[i].className = "is-hidden";
        }
        colorSelect.selectedIndex = 0;
    } else if (designSelect.selectedIndex === 2) {
        for (i=0; i<3; i++) {
            colorChoices[i].className = "is-hidden";
        }
        for (i=3; i<colorChoices.length; i++) {
            colorChoices[i].className = "";
        }
        colorSelect.selectedIndex = 3;
    } else {
        for (i=0; i<colorChoices.length; i++) {
            colorChoices[i].className = "";
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
    var paymentSelect = document.querySelector("#payment");
    var selectedPayment = paymentSelect.selectedIndex;
    var paymentOptions = document.querySelectorAll("div > p");
    if (selectedPayment === 1) {
        document.querySelector("#credit-card").setAttribute("class", "credit-card");
        paymentOptions[0].setAttribute("class", "is-hidden");
        paymentOptions[1].setAttribute("class", "is-hidden");
    } else if (selectedPayment === 2) {
        document.querySelector("#credit-card").setAttribute("class", "credit-card is-hidden");
        paymentOptions[0].setAttribute("class", "");
        paymentOptions[1].setAttribute("class", "is-hidden");
    } else if (selectedPayment === 3) {
        document.querySelector("#credit-card").setAttribute("class", "credit-card is-hidden");
        paymentOptions[0].setAttribute("class", "is-hidden");
        paymentOptions[1].setAttribute("class", "");
    } else {
        document.querySelector("#credit-card").setAttribute("class", "credit-card");
        paymentOptions[0].setAttribute("class", "is-hidden");
        paymentOptions[1].setAttribute("class", "is-hidden");
    }
};

function bindScheduleCheck() {
    var cost = document.createElement("h3");
    cost.setAttribute("id", "cost");
    cost.innerText = "TOTAL COST = $0";
    var schedule = document.querySelector("fieldset[class='activities']");
    var activities = schedule.getElementsByTagName("input");
    schedule.appendChild(cost);
    for (i=0; i<activities.length; i++) {
        var notice = document.createElement("div");
        notice.innerText = "THIS EVENT IS UNAVAILABLE DUE TO YOUR CURRENT SELECTION";
        notice.setAttribute("class", "is-hidden");
        activities[i].parentElement.appendChild(notice);
        activities[i].addEventListener("change", adjustEvents);
    }
};

function adjustEvents() {
    var schedule = document.querySelector("fieldset[class='activities']");
    var activities = schedule.getElementsByTagName("input");
    var totalCost = 0;
    if (activities[0].checked) {
        totalCost += 200;
    }
    for (i=0; i<activities.length; i++) {
        activities[i].removeAttribute("disabled");
        activities[i].nextElementSibling.setAttribute("class", "is-hidden");
    }
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
    for (i=1; i<activities.length; i++) {
        if (activities[i].checked){
            totalCost += 100;           
        }
    }
    document.getElementById("cost").innerText = "TOTAL COST = $" + totalCost;
    
};

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

function checkCreditCard() {
    var ccvalid = false;
    var creditNum = document.querySelector("#cc-num").value;
    var zip = document.querySelector("#zip").value;
    var cvc = document.querySelector("#cvv").value;
    if (number.length > 0) {
        ccvalid = verifyCCNumber(creditNum);
    }
    if (ccvalid = true && zip.length === 5 && cvc.length === 3) {
        return true;
    }
    //check number format
    //check cvc
    //check expiration date
    //return true or false
};

function verifyCCNumber(creditNum) {
    if (creditNum.length !== 16) {
        return false;
    }
    var lastDig = creditNum.pop();
    var creditNumRev = creditNum.reverse();
    var total;
    for (i=0; i<creditNumRev.length; i+=2) {
        creditNumRev[i] *= 2;
        if (creditNumRev[i] > 9) {
            creditNumRev[i] -= 9;
        }
        total += creditNum[i];
    }
    if (total % 10 === lastDig) {
        return true;
    } else {
        return false;
    }
};

function validateForm() {
    var verifiedActivity = checkForActivity();
    var verifiedPayment = false;
    var paymentType = document.querySelector("#payment").selectedIndex;
    //check for payment type
    //if credit card chosen,
    if (paymentType === 1) {
        var verify = checkCreditCard();
        if (verify === true) {
            verifiedPayment = true;
        }
    } else {
        verifiedPayment = true;
    }
    if (verifiedActivity === true && verifiedPayment === true) {
       document.querySelector("button[type='submit']").disabled=false;
    } else {
        document.querySelector("button[type='submit']").disabled=true;
    }
    console.log("The form has been checked");
};

function bindSubmitValidation() {
    validateForm();
    document.querySelector("button[type='submit']").addEventListener("mouseover", validateForm);
};

function main() {
    initializeValidation();
    document.querySelector("#name").focus();
    hideOtherTitleInput();
    addOtherJobOption();
    bindShirtOptions();
    showPaymentOptions();
    bindScheduleCheck();
    bindSubmitValidation();
};

window.onload = main;

