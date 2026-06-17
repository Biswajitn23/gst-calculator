const form = document.querySelector("#gstForm");
const amountInput = document.querySelector("#amount");
const gstAmountOutput = document.querySelector("#gstAmount");
const finalAmountOutput = document.querySelector("#finalAmount");
const errorMessage = document.querySelector("#errorMessage");
const digitalHeroesButton = document.querySelector("#digitalHeroesButton");

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

function getSelectedRate() {
  return Number(document.querySelector("input[name='gstRate']:checked").value);
}

function updateResults(gstAmount, finalAmount) {
  gstAmountOutput.textContent = currencyFormatter.format(gstAmount);
  finalAmountOutput.textContent = currencyFormatter.format(finalAmount);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const amount = Number(amountInput.value);
  const gstRate = getSelectedRate();

  if (!Number.isFinite(amount) || amount < 0) {
    updateResults(0, 0);
    errorMessage.textContent = "Please enter a valid amount of 0 or more.";
    amountInput.focus();
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
