window.Webflow ||= [];
window.Webflow.push(() => {
  // Query the elements
  const form = document.querySelector<HTMLFormElement>('[fs-element="form"]');
  const resultMonthly = document.querySelector<HTMLFormElement>('[fs-element="result-monthly"]');
  const resultInterest = document.querySelector<HTMLFormElement>('[fs-element="result-interest"]');
  const resultYear = document.querySelector<HTMLFormElement>('[fs-element="result-year"]');
  const resultTotal = document.querySelector<HTMLFormElement>('[fs-element="result-total"]');

  // if there's no form or any of the below elements, just return from the function and don't do anything else
  if (!form || !resultMonthly || !resultInterest || !resultYear || !resultTotal) return;

  // Listen for form submission events
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation(); // prevent Webflow JS to do anything else

    // Get the data from the calculator
    // * the data outputted will be in string format, will need to convert to number type later *
    const formData = new FormData(form);
    const amount = Number(formData.get('amount')); // returning the value of amount
    const interest = Number(formData.get('interest'));
    const term = Number(formData.get('term'));
    const extra = Number(formData.get('extra'));

    if (!amount || !interest || !term || !extra) return;

    // Calculate
    const calculateInterest = interest / 100 / 12;
    const calculatePayments = term * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculateInterest, calculatePayments);
    const monthly = (amount * x * calculateInterest) / (x - 1);
    const monthlyPayment = monthly.toFixed(2); // 2 decimals

    // Compute Interest
    const totalInterest = (monthly * calculatePayments - amount).toFixed(2);

    // Compute Total Payment
    const totalPayment = (monthly * calculatePayments).toFixed(2);

    // Update the text of the elements
    // Use toString() to convert the elements back to string before setting as a text content of the element
    resultMonthly.textContent = '$' + monthlyPayment.toString();
    resultInterest.textContent = totalInterest.toString() + '%';
    resultYear.innerHTML = resultYear.toString();
    resultTotal.textContent = '$' + totalPayment.toString();

    console.log({ total: totalInterest });
    // Display results
  });
});
