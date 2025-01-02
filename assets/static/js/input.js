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