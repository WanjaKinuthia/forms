// Function to calculate interest
function calculateInterest(amount, rate) {
    const interest = amount * rate / 100;
    const eventInterestCalculated = new CustomEvent('interestCalculated', { detail: { interest } });
    document.dispatchEvent(eventInterestCalculated);
    return interest;
}

// Function to calculate tax
function calculateTax(amount, taxRate) {
    const tax = amount * taxRate / 100;
    const eventTaxCalculated = new CustomEvent('taxCalculated', { detail: { tax } });
    document.dispatchEvent(eventTaxCalculated);
    return tax;
}

// Function to calculate final amount after deducting tax
function calculateFinalAmount(amount, rate, taxRate) {
    const interest = calculateInterest(amount, rate);
    const tax = calculateTax(amount, taxRate);
    const finalAmount = amount + interest - tax; // Calculate final amount
    //custom events
    const eventFinalAmountCalculated = new CustomEvent('finalAmountCalculated', { detail: { finalAmount } });
    document.dispatchEvent(eventFinalAmountCalculated);
    
    return finalAmount;
}

// Function to handle form submission and calculation
function handleFormSubmission() {
    const amount = parseFloat(document.getElementById('amount').value) || 0; // Get amount from input field, default to 0 if empty or NaN
    const rate = parseFloat(document.getElementById('rate').value) || 0.17; // Get rate from input field, default to 0.17 if empty or NaN
    const taxableRate = parseFloat(document.getElementById('taxable_rate').value) || 0.05; // Get taxable rate from input field, default to 0.05 if empty or NaN

    // Calculate interest
    const interest = calculateInterest(amount, rate);

    // Calculate tax
    const tax = calculateTax(amount, taxableRate);

    // Calculate final amount after deducting tax
    const finalAmount = calculateFinalAmount(amount, rate, taxableRate);

    // Display results
    document.getElementById('interest').value = isNaN(interest) ? '' : interest.toFixed(2);
    document.getElementById('tax').value = isNaN(tax) ? '' : tax.toFixed(2);
    document.getElementById('total').value = isNaN(finalAmount) ? '' : finalAmount.toFixed(2);
}

// Add event listeners to rate and taxable rate input fields
document.getElementById('rate').addEventListener('input', handleFormSubmission);
document.getElementById('taxable_rate').addEventListener('input', handleFormSubmission);

// Event listeners to handle custom events
document.addEventListener('interestCalculated', function(event) {
    console.log('Interest calculated:', event.detail.interest);
});

document.addEventListener('taxCalculated', function(event) {
    console.log('Tax calculated:', event.detail.tax);
});

document.addEventListener('finalAmountCalculated', function(event) {
    console.log('Final amount calculated:', event.detail.finalAmount);
});

// Trigger initial calculation
handleFormSubmission();
