// Dynamically update the age label
function updateCurrentAgeLabel(value) {
  document.getElementById("current_age_label").innerText = value;
}

// Dynamically update the age label
function updateRetirementAgeLabel(value) {
  document.getElementById("retirement_age_label").innerText = value;
}

// Get the slider elements and their display values
const retirement_age = document.getElementById("retirement_age"); // slider1
const current_age = document.getElementById("current_age"); // slider2
const retirement_age_label = document.getElementById("retirement_age_label"); // value1
const current_age_label = document.getElementById("current_age_label"); // value2

// Update the value display for slider 1
retirement_age.addEventListener("input", function() {
  retirement_age_label.textContent = retirement_age.value;
  // Set slider 2's value to the minimum of slider 1's value
  current_age.value = Math.min(retirement_age.value, current_age.value);
  current_age_label.textContent = current_age.value;
});

// Update the value display for slider 2
current_age.addEventListener("input", function() {
  current_age_label.textContent = current_age.value;
  // Ensure slider 2 value does not exceed slider 1's value
  current_age.value = Math.min(retirement_age.value, current_age.value);
  current_age_label.textContent = current_age.value;
});


// Select both input fields by their IDs
const monthly_contribution = document.getElementById('monthly_contribution');
const input2 = document.getElementById('desired_retirement_income');

// Function to add the $ sign
function addDollarSign(input) {
  // Automatically add the $ sign when the input is focused
  input.addEventListener('focus', function () {
    if (input.value === '') {
      input.value = '$';
    }
  });

  // Handle the input and strip out the $ sign when submitting
  input.addEventListener('input', function () {
    if (input.value[0] !== '$') {
      input.value = '$' + input.value.replace('$', ''); // Ensure $ is added, but no duplicates
    }
  });

  // When the user leaves the input, remove the $ sign if necessary
  input.addEventListener('blur', function () {
    if (input.value === '$') {
      input.value = '';
    }
  });
}

// Apply the function to both inputs
addDollarSign(monthly_contribution);
addDollarSign(desired_retirement_income);

// Select both input fields by their IDs
const contribution_increments = document.getElementById('contribution_increments');
const expected_return_on_investment = document.getElementById('expected_return_on_investment');
const inflation = document.getElementById('inflation');

// Function to add the % sign
function addPercentageSign(input) {
  // Automatically add the % sign when the input is focused
  input.addEventListener('focus', function () {
    if (input.value === '') {
      input.value = '';
    }
  });

  // Handle the input and strip out the % sign when submitting
  input.addEventListener('input', function () {
    if (input.value[0] !== '%') {
      input.value = input.value.replace('%', '') + '%'; // Ensure % is added, but no duplicates
    }
  });

  // When the user leaves the input, remove the % sign if necessary
  input.addEventListener('blur', function () {
    if (input.value === '%') {
      input.value = '';
    }
  });
}

// Apply the function to both inputs
addPercentageSign(contribution_increments);
addPercentageSign(expected_return_on_investment);
addPercentageSign(inflation);


