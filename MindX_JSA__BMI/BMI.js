document.addEventListener("DOMContentLoaded", () => {
  const heightInput = document.getElementById("height-value");
  const weightInput = document.getElementById("weight-value");
  const ageInput = document.getElementById("age-value");
  const calculateButton = document.getElementById("calculate");
  const resultSection = document.getElementById("result-section");
  const bmiValueElement = document.getElementById("bmi-value");
  const bmiCategoryElement = document.getElementById("bmi-category");
  const adviceElement = document.getElementById("advice");
  const genderCards = document.querySelectorAll(".gender-card");

  const heightInputSection = heightInput.closest(".input-section");
  const heightControlButtons = heightInputSection.querySelectorAll(
    ".controls .control-button"
  );

  let selectedGender = null;

  // Get references to control buttons
  // Corrected selectors to find the control buttons within their respective input sections
  const weightInputSection = weightInput.closest(".input-section");
  const weightControlButtons = weightInputSection.querySelectorAll(
    ".controls .control-button"
  );
  const ageInputSection = ageInput.closest(".input-section");
  const ageControlButtons = ageInputSection.querySelectorAll(
    ".controls .control-button"
  );

  // Add event listeners to height control buttons
  heightControlButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let currentValue = parseInt(heightInput.value);
      if (button.textContent === "+") {
        heightInput.value = currentValue + 1;
      } else if (button.textContent === "-" && currentValue > 1) {
        // Ensure height doesn't go below 1
        heightInput.value = currentValue - 1;
      }
    });
  });

  // Add event listeners to weight control buttons
  weightControlButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let currentValue = parseInt(weightInput.value);
      if (button.textContent === "+") {
        weightInput.value = currentValue + 1;
      } else if (button.textContent === "-" && currentValue > 0) {
        weightInput.value = currentValue - 1;
      }
    });
  });

  // Add event listeners to age control buttons
  ageControlButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let currentValue = parseInt(ageInput.value);
      if (button.textContent === "+") {
        ageInput.value = currentValue + 1;
      } else if (button.textContent === "-" && currentValue > 0) {
        ageInput.value = currentValue - 1;
      }
    });
  });

  genderCards.forEach((card) => {
    card.addEventListener("click", () => {
      genderCards.forEach((gc) => gc.classList.remove("selected"));
      card.classList.add("selected");
      selectedGender = card.getAttribute("data-gender");
    });
  });

  function displayResult(bmi) {
    let category = "";
    let advice = "";

    if (bmi < 18.5) {
      category = "Underweight";
      advice =
        "Focus on healthy weight gain. Consider a balanced diet and consult a healthcare professional.";
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "Normal weight";
      advice =
        "Maintain a healthy lifestyle with balanced diet and regular exercise.";
    } else if (bmi >= 25 && bmi < 30) {
      category = "Overweight";
      advice =
        "Focus on healthy weight loss. Consider a balanced diet and regular physical activity to help reduce weight healthily.";
    } else {
      category = "Obese";
      advice =
        "Consider a weight management program. Consult a healthcare professional for guidance on diet and exercise.";
    }

    bmiValueElement.textContent = bmi.toFixed(1);
    bmiCategoryElement.textContent = category;
    adviceElement.textContent = advice;
    resultSection.style.display = "block";
    calculateButton.textContent = "Recalculate";
  }

  function resetCalculator() {
    heightInput.value = "0";
    weightInput.value = "0";
    ageInput.value = "0";
    genderCards.forEach((gc) => gc.classList.remove("selected"));
    selectedGender = null;
    resultSection.style.display = "none";
    calculateButton.textContent = "Calculate";
  }

  calculateButton.addEventListener("click", () => {
    if (calculateButton.textContent === "Recalculate") {
      resetCalculator();
      return;
    }

    const height = parseInt(heightInput.value);
    const weight = parseInt(weightInput.value);
    const age = parseInt(ageInput.value);

    if (
      isNaN(height) ||
      isNaN(weight) ||
      isNaN(age) ||
      height <= 0 ||
      weight <= 0 ||
      age <= 0
    ) {
      alert("Please enter valid positive numbers for height, weight, and age.");
      return;
    }

    if (!selectedGender) {
      alert("Please select your gender.");
      return;
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    displayResult(bmi);
  });

  // Initialize input values to 0
  heightInput.value = "0";
  weightInput.value = "0";
  ageInput.value = "0";
});
