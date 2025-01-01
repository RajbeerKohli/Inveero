// Dynamically update the age label
function updateAgeLabel(value) {
  document.getElementById("age-label").innerText = value;
}

function updateRiskLabel(value) {
  let riskLabel = "";

  // Determine the risk level based on the value
  if (value == 0) {
    riskLabel = "Low";
  } else if (value == 1) {
    riskLabel = "Medium";
  } else if (value == 2) {
    riskLabel = "High";
  }

  // Update the risk label text on the page
  document.getElementById("risk-label").innerText = riskLabel;
}

document.getElementById("number").addEventListener("input", function (e) {
  // Allow only numeric characters
  this.value = this.value.replace(/[^0-9]/g, "");
});
