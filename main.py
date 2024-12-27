import pandas as pd

# Input parameters
age = int(input("Enter your current age: "))
target_age = int(input("Enter your target retirement age: "))
desired_monthly_income = float(input("Enter your desired monthly income at retirement ($): "))
current_monthly_payments = float(input("Enter your current monthly payments ($): "))
increment_percent = float(input("Enter the percentage increment for monthly payments per year (%): "))
expected_rate_of_return = float(input("Enter the expected annual rate of return (%): "))
inflation_rate = float(input("Enter the expected annual inflation rate (%): "))

# Calculations
increment_rate = 1 + increment_percent / 100
rate_of_return = 1 + expected_rate_of_return / 100
inflation_adjustment = 1 + inflation_rate / 100

# Adjust the desired income for inflation
adjusted_monthly_income = desired_monthly_income
years_until_retirement = target_age - age
adjusted_yearly_income = desired_monthly_income * 12

# Calculate the inflation-adjusted income for all years
inflation_adjusted_income = []
for year in range(years_until_retirement + 1):
    yearly_income = desired_monthly_income * 12 * (inflation_adjustment ** year)
    inflation_adjusted_income.append(yearly_income)

# Prepare a DataFrame for yearly projections
data = []
current_payment = current_monthly_payments
total_savings = 0
year_investment_exceeds_income = None
year = 0

while True:
    yearly_payment = current_payment * 12
    if year == 0:
        total_savings = yearly_payment
    else:
        total_savings = total_savings * rate_of_return + yearly_payment

    # Calculate yearly investment return
    investment_return = total_savings * (expected_rate_of_return / 100)

    # Get inflation-adjusted income for the current year
    if year < len(inflation_adjusted_income):
        yearly_income_taken_out = inflation_adjusted_income[year]
    else:
        yearly_income_taken_out = yearly_income_taken_out * inflation_adjustment

    # Append data for the current year
    data.append({
        "Year": age + year,
        "Monthly Payment": current_payment,
        "Yearly Payment": yearly_payment,
        "Total Savings": total_savings,
        "Investment Return": investment_return,
        "Inflation-Adjusted Yearly Income Taken Out": yearly_income_taken_out,
    })

    # Check if investment return exceeds inflation-adjusted yearly income
    if year_investment_exceeds_income is None and investment_return >= yearly_income_taken_out:
        year_investment_exceeds_income = age + year

    # Stop calculation if investment return exceeds adjusted income after the target age
    if year_investment_exceeds_income and year >= years_until_retirement:
        break

    # Increment year and payment
    year += 1
    current_payment *= increment_rate

# Add the inflation-adjusted income to the output
adjusted_income_summary = {
    "Inflation-Adjusted Monthly Income at Retirement": adjusted_monthly_income,
    "Inflation-Adjusted Yearly Income at Retirement": adjusted_yearly_income,
    "Year Investment Return Exceeds Adjusted Income": year_investment_exceeds_income
}

# Display the DataFrame and adjusted income
df = pd.DataFrame(data)
print("\nRetirement Savings Plan:")
print(df)
print("\nAdjusted Income Summary:")
print(adjusted_income_summary)

# # Optionally save the results to a CSV
# df.to_csv("retirement_savings_plan.csv", index=False)
