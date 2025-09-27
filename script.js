// Function to calculate the day of the week manually using the given formula
export function calculate_day_of_week(dateString) {
  // Split the input "YYYY-MM-DD" into year, month, day
  const [year, month, day] = dateString.split("-").map(Number);

  let YY = year % 100;           // last two digits of year
  let CC = Math.floor(year / 100); // first two digits of year
  let MM = month;
  let DD = day;

  // Formula trick: January and February are treated as 13 and 14 of the PREVIOUS year
  if (MM < 3) {
    MM += 12;    // shift Jan (1) → 13, Feb (2) → 14
    YY -= 1;     // go back one year
  }

  // Apply the formula step by step
  let d = ((CC / 4) - (2 * CC) - 1 + Math.floor(5 * YY / 4) + Math.floor(26 * (MM + 1) / 10) + DD) % 7;

  // Make sure the result is always positive
  return ((d + 7) % 7); // gives a number between 0–6
}
// Arrays of Akan names based on day index
const male_names = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
const female_names = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];

// function to generate Akan name
export function generate_name() {
  const birthday = document.getElementById("birthday").value;
  const gender = document.getElementById("gender").value;
  const resultDiv = document.getElementById("result");
  // Check if user filled in everything
  if (!birthday || !gender) {
    resultDiv.textContent = "Please enter both your birthdate and gender.";
    return;
  }
  //
  // Get the day of the week using the formula
  const day_of_week = calculate_day_of_week(birthday);
  //
  // Pick the Akan name based on gender
  let akan_name;
  if (gender === "male") {
    akan_name = male_names[day_of_week];
  } else {
    akan_name = female_names[day_of_week];
  }
  //
  // Show the result
  resultDiv.textContent = `You were born on day ${day_of_week}, your Akan name is ${akan_name}!`;
}
