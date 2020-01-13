//selecting the form in the HTML//
const form  = document.getElementsByTagName('investment-db')[0];
const presentValue = document.getElementById('presentValue');
const investmentValue= document.getElementById('investmentValue');
const timeHorizon= document.getElementById('horizon');

// Reguar Expressions//
// Reguar Expression1: limits our present value and investment value to whole numbers greater than two digits//
//Will not accept numbers like 0 or numbers< 100//
const presentValueRegExp = [0-9][0-9]{2,};
const investmentValueRegExp=  [0-9][0-9]{2,};

// Reguar Expression2: limits our Time Horizon input to whole numbers, input > 0 , can be single digit//
const timeHorizonRegExp= \b([1-9]|[0-4][0-5])\b;


// build validation for presentValue, what is valid and invalid//
addEvent(window, "load", function () {
  //Test regular Expressions//
  const test = presentValueRegExp.test(presentValue.value);
  presentValue.className = test ? "valid" : "invalid";
});

//Input//
addEvent(presentValue, "input", function () {
  const test = presentValueRegExp.test(presentValue.value);
  if (test) {
    presentValue.className = "valid";
    error.innerHTML = "";
    error.className = "error";
  } else {
    presentValue.className = "invalid";
  }
});

//Submission//
addEvent(form, "submit", function () {
  const test = presentValueRegExp.test(presentValue.value);

  if (!test) {
    presentValue.className = "invalid";
    error.innerHTML = "Please enter a whole number greater than 100.";
    error.className = "error active";

    return false;
  } else {
    presentValue.className = "valid";
    error.innerHTML = "";
    error.className = "error";
  }
});

// build validation for investmentValue, what is valid and invalid//
addEvent(window, "load", function () {
  //Test regular Expressions//
  const test2 = investmentValueRegExp.test(investmentValue.value);
  investmentValue.className = test ? "valid" : "invalid";
});

//Input//
addEvent(investmentValue, "input", function () {
  const test2 = investmentValueRegExp.test(investmentValue.value);
  if (test2) {
    investmentValue.className = "valid";
    error.innerHTML = "";
    error.className = "error";
  } else {
    investmentValue.className = "invalid";
  }
});

//Submission//
addEvent(form, "submit", function () {
  const test2 = investmentValueRegExp.test(investmentValue.value);

  if (!test2) {
    investmentValue.className = "invalid";
    error.innerHTML = "Please enter a whole number greater than 100.";
    error.className = "error active";

    return false;
  } else {
    investmentValue.className = "valid";
    error.innerHTML = "";
    error.className = "error";
  }
});


// build validation for timeHorizon, what is valid and invalid//
addEvent(window, "load", function () {
  //Test regular Expressions//
  const test3 = timeHorizonRegExp.test(timeHorizon.value);
  timeHorizon.className = test3 ? "valid" : "invalid";
});

//Input//
addEvent(timeHorizon, "input", function () {
  const test3 = timeHorizonRegExp.test(timeHorizon.value);
  if (test3) {
    timeHorizon.className = "valid";
    error.innerHTML = "";
    error.className = "error";
  } else {
    timeHorizon.className = "invalid";
  }
});

//Submission//
addEvent(form, "submit", function () {
  const test = timeHorizonRegExp.test(timeHorizon.value);

  if (!test3) {
    timeHorizon.className = "invalid";
    error.innerHTML = "Please enter a whole number betweeen 1 and 45.";
    error.className = "error active";

    return false;
  } else {
    timeHorizon.className = "valid";
    error.innerHTML = "";
    error.className = "error";
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////
//custom error messages
//////////////////////////////////////////////////////////////////////////////////////////////
//custom error message presentValue//
const presentValue = document.getElementById('presentValue');

presentValue.addEventListener("input", function (event) {
  if (presentValue.validity.typeMismatch) {
    presentValue.setCustomValidity("Please enter a whole number greater than 100.");
  } else {
    presentValue.setCustomValidity("");
  }
});
//custom error message investmentValue//
const investmentValue = document.getElementById('investmentValue');

investmentValue.addEventListener("input", function (event) {
  if (investmentValue.validity.typeMismatch) {
    investmentValue.setCustomValidity("Please enter a whole number greater than 100.");
  } else {
    investmentValue.setCustomValidity("");
  }
});
//custom error message for timeHorizon//
const timeHorizon = document.getElementById('horizon');

timeHorizon.addEventListener("input", function (event) {
  if (timeHorizon.validity.typeMismatch) {
    timeHorizon.setCustomValidity("Please enter a whole number between 1 and 45.");
  } else {
    timeHorizon.setCustomValidity("");
  }
});