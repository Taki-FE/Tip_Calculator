document.addEventListener('DOMContentLoaded', () => {

  const errorMessage = document.querySelectorAll('.error-message');
  const bill = document.querySelector('#bill');
  const tips = document.querySelectorAll('#buttons > button');
  const customTip = document.querySelector('#custom');
  const numberOfPeople = document.querySelector('#num-of-people');
  const inputFields = [bill, numberOfPeople];
  const tipAmount = document.querySelector('#tip-amount');
  const totalAmount = document.querySelector('#total-amount');
  const resetBtn = document.querySelector('#reset');

  let previousClickedTip = null;

  function calculateAndDisplay() {
    // Get user inputs, store them in variables.
    const userBill = parseFloat(bill.value);
    const customTipInput = parseFloat(customTip.value);
    const people = parseInt(numberOfPeople.value);
    // Determine the tip percentage to use (predefined or custom)
    const tip = previousClickedTip ? parseInt(previousClickedTip.textContent) : customTipInput;

    if (!isNaN(userBill) && !isNaN(tip) && !isNaN(people)) {
      const tipPerPerson = userBill * (tip / 100) / people;
      const roundedTipPerPerson = Math.ceil(tipPerPerson * 100) / 100; // Round up to 2 decimal places.
      tipAmount.textContent = '$' + roundedTipPerPerson.toFixed(2); // Display with exactly 2 decimal places.

      const totalPerPerson = (userBill / people) + roundedTipPerPerson;
      const roundedTotalPerPerson = Math.ceil(totalPerPerson * 100) / 100; // Round up to 2 decimal places.
      totalAmount.textContent = '$' + roundedTotalPerPerson.toFixed(2); // Display with exactly 2 decimal places.

      // Check if tip and total amounts are filled.
      if (tipAmount.textContent !== '0.00' && totalAmount.textContent !== '0.00') {
        resetBtn.style.backgroundColor = '#26c0ab'; // Change reset button color.
        resetBtn.style.color = '#00494d'; // Change reset button text color.
        resetBtn.style.opacity = '1';
      } else {
        resetBtn.style.backgroundColor = ''; // Reset reset button color.
      };
    };  
  };

  // Event listeners for bill and numberOfPeople fields
  inputFields.forEach(element => {
    element.addEventListener('input', () => {
      calculateAndDisplay();
    });
  });

  customTip.addEventListener('input', () => {
    calculateAndDisplay();
  });
  
  tips.forEach((param) => {
    param.addEventListener('click', () => {
      // Clear user input from custom input when predefined tip is button clicked.
      customTip.value = '';

      if (param === previousClickedTip) {
        // If the same button was clicked twice, deselect it.
        param.style.backgroundColor = '#00494d';
        param.style.color = '#ffffff';
        previousClickedTip = null; // Reset the previousClickedTip.
      } else {
        // Deselect the previously clicked button (if any).
        if (previousClickedTip) {
          previousClickedTip.style.backgroundColor = '#00494d';
          previousClickedTip.style.color = '#ffffff';
        }

        // Select the clicked button.
        param.style.backgroundColor = '#26c0ab';
        param.style.color = '#00494d';

        previousClickedTip = param;
      };

      calculateAndDisplay();
    });
  });

  customTip.addEventListener('click', () => {
    previousClickedTip.style.backgroundColor = '#00494d';
    previousClickedTip.style.color = '#ffffff';
    calculateAndDisplay();
  });

  resetBtn.addEventListener('click', () => {
    // Reset everything
    inputFields.forEach(element => {
      element.value = '';
    });

    tips.forEach((param) => {
      param.style.backgroundColor = '#00494d';
      param.style.color = '#ffffff';
    });

    customTip.value = '';
    errorMessage.forEach(message => {
      message.textContent = '';
    });

    tipAmount.textContent = '$0.00';
    totalAmount.textContent = '$0.00';

    resetBtn.style.backgroundColor = ''; // Reset reset button color
    resetBtn.style.opacity = '0.3';

    previousClickedTip = null;
  });

});