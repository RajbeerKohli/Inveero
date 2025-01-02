document.getElementById("calculateButton").addEventListener("click", calculateRetirementPlan);

// Call the function when the page loads
window.onload = function() {
    calculateRetirementPlan();
};

// Helper function to strip any non-numeric characters
function parseNumericValue(value, defaultValue) {
    if (typeof value !== 'string') return defaultValue;  // If it's not a string, return the default value

    // Remove non-numeric characters (including $ and %)
    const numericValue = value.replace(/[^\d.-]/g, '');

    // Parse and return the numeric value or the default if invalid
    return isNaN(numericValue) ? defaultValue : parseFloat(numericValue);
}

function calculateRetirementPlan() {
    try {
        // Get values from the form, stripping symbols before parsing
        const age = parseInt(parseNumericValue(document.getElementById("current_age").value), 10) || 30;
        const targetAge = parseInt(parseNumericValue(document.getElementById("retirement_age").value), 10) || 50;
        const desiredMonthlyIncome = parseNumericValue(document.getElementById("desired_retirement_income").value) || 3500;
        const currentMonthlyPayments = parseNumericValue(document.getElementById("monthly_contribution").value) || 500;
        const incrementPercent = parseNumericValue(document.getElementById("contribution_increments").value) || 10;
        const expectedRateOfReturn = parseNumericValue(document.getElementById("expected_return_on_investment").value) || 12;
        const inflationRate = parseNumericValue(document.getElementById("inflation").value) || 5;

        // Validate inputs
        if (isNaN(age) || isNaN(targetAge) || isNaN(desiredMonthlyIncome) ||
            isNaN(currentMonthlyPayments) || isNaN(incrementPercent) ||
            isNaN(expectedRateOfReturn) || isNaN(inflationRate)) {
            throw new Error("All inputs must be valid numbers.");
        }

        if (age >= targetAge) {
            throw new Error("Target retirement age must be greater than current age.");
        }

        // Perform calculations
        const incrementRate = 1 + incrementPercent / 100;
        const rateOfReturn = 1 + expectedRateOfReturn / 100;
        const inflationAdjustment = 1 + inflationRate / 100;

        const yearsUntilRetirement = targetAge - age;
        const inflationAdjustedIncome = [];
        const actualSavings = [];
        const savingsWithROI = [];
        const labels = [];

        let currentPayment = currentMonthlyPayments;
        let totalSavings = 0;
        let roiExceedsInflationYear = null;

        for (let year = 0; year <= yearsUntilRetirement; year++) {
            const yearlyPayment = currentPayment * 12;
            totalSavings = totalSavings * rateOfReturn + yearlyPayment;
            const inflationIncome = desiredMonthlyIncome * 12 * Math.pow(inflationAdjustment, year);

            inflationAdjustedIncome.push(inflationIncome.toFixed(2));
            actualSavings.push(totalSavings.toFixed(2));
            savingsWithROI.push((totalSavings * rateOfReturn).toFixed(2));
            labels.push(age + year);

            if (savingsWithROI[year] >= inflationIncome && roiExceedsInflationYear === null) {
                roiExceedsInflationYear = age + year;
            }

            currentPayment *= incrementRate;
        }

        console.log("Calculation Data:", { actualSavings, savingsWithROI, inflationAdjustedIncome });

        // Display chart
        const ctx = document.getElementById("retirementChart").getContext("2d");
        if (window.retirementChart instanceof Chart) {
            window.retirementChart.destroy(); // Destroy existing chart only if it exists and is a Chart.js instance
        }
        window.retirementChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Actual Savings",
                        data: actualSavings,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 2,
                        fill: true,
                    },
                    {
                        label: "Savings + ROI",
                        data: savingsWithROI,
                        borderColor: 'rgba(153, 102, 255, 1)',
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderWidth: 2,
                        fill: true,
                    },
                    {
                        label: "Inflation Adjusted Income",
                        data: inflationAdjustedIncome,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderWidth: 2,
                        fill: true,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: "Retirement Plan Projection",
                    },
                    tooltip: {
                        callbacks: {
                            afterLabel: function () {
                                if (roiExceedsInflationYear) {
                                    return `ROI exceeds inflation in year: ${roiExceedsInflationYear}`;
                                }
                                return "";
                            },
                        },
                    },
                },
            },
        });
    } catch (error) {
        console.error("Error in calculateRetirementPlan:", error.message);
        alert(error.message);
    }
}
