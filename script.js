const form = document.querySelector("#gstForm");
const amountInput = document.querySelector("#amount");
const customRateInput = document.querySelector("#customRate");
const gstAmountOutput = document.querySelector("#gstAmount");
const finalAmountOutput = document.querySelector("#finalAmount");
const errorMessage = document.querySelector("#errorMessage");
const digitalHeroesButton = document.querySelector("#digitalHeroesButton");
const rateRadios = document.querySelectorAll("input[name='gstRate']");

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

function getSelectedRate() {
  // Check if custom rate has a value
  const customVal = customRateInput.value.trim();
  if (customVal !== "") {
    const parsed = Number(customVal);
    if (Number.isFinite(parsed) && parsed >= 0) {
      return parsed;
    }
  }
  // Fall back to selected radio
  const checked = document.querySelector("input[name='gstRate']:checked");
  return checked ? Number(checked.value) : 18;
}

// When a preset radio is clicked, clear custom input
rateRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    customRateInput.value = "";
  });
});

// When custom input gets focus, uncheck all presets
customRateInput.addEventListener("focus", () => {
  rateRadios.forEach(r => r.checked = false);
});

function updateResults(gstAmount, finalAmount) {
  gstAmountOutput.textContent = currencyFormatter.format(gstAmount);
  finalAmountOutput.textContent = currencyFormatter.format(finalAmount);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const amount = Number(amountInput.value);
  const gstRate = getSelectedRate();

  // Validate amount
  if (!Number.isFinite(amount) || amount < 0) {
    updateResults(0, 0);
    errorMessage.textContent = "Please enter a valid amount of 0 or more.";
    amountInput.focus();
    return;
  }

  // Validate custom rate if entered
  const customVal = customRateInput.value.trim();
  if (customVal !== "") {
    const parsed = Number(customVal);
    if (!Number.isFinite(parsed) || parsed < 0 || parsed > 100) {
      updateResults(0, 0);
      errorMessage.textContent = "Please enter a valid GST rate between 0 and 100.";
      customRateInput.focus();
      return;
    }
  }

  // Validate rate
  if (!Number.isFinite(gstRate) || gstRate < 0) {
    updateResults(0, 0);
    errorMessage.textContent = "Please select or enter a valid GST rate.";
    return;
  }

  const gstAmount = amount * (gstRate / 100);
  const finalAmount = amount + gstAmount;

  errorMessage.textContent = "";
  updateResults(gstAmount, finalAmount);
});

digitalHeroesButton.addEventListener("click", () => {
  window.open("https://digitalheroesco.com", "_blank", "noopener,noreferrer");
});