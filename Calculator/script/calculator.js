let string = '';
let openBrackets = 0;
let buttons = document.querySelectorAll('.all-buttons');

Array.from(buttons).forEach((button) => {
  button.addEventListener('click', (event) => {

    let value = '';
    const btn = event.currentTarget;

    if (btn.classList.contains('minus-button')) {
      value = '-';
      console.log(value);
      string += value;
      document.querySelector('.textbox').value = string;
    }
    else if (btn.classList.contains('mult-button')) {
      value = '*';
      console.log(value);
      string += value;
      document.querySelector('.textbox').value = string;
    }
    else if (btn.classList.contains('clear-button')) {
      string = '';
      openBrackets = 0;
      document.querySelector('.textbox').value = string;
    }
    else if (btn.classList.contains('delete-button')) {
      string = string.slice(0, -1);
      document.querySelector('.textbox').value = string;
    }
    else if (btn.classList.contains('bracket-button')) {
      let i = string.length - 1;

      if (string === '' || openBrackets === 0 || string.slice(-1) === '(' || isOperator(string.slice(-1))) {
        if (!isOperator(string.slice(-1)) && string !== '') {
          value = '*(';
        } else {
          value = '(';
        }
        openBrackets++;
      } else {
        value = ')';
        openBrackets--;
      }
      string += value;
      document.querySelector('.textbox').value = string;
    }
    else if (btn.classList.contains('plusminus-button')) {
      // Find the index where the last number starts
      let i = string.length - 1;

      // Go backwards through the string until a non-digit (or .) or bracket is found
      while (i >= 0 && ("0123456789.()").includes(string[i])) {
        i--;
      }

      // Check if it's already wrapped as negative like (-45)
      if (string.slice(i - 1, i + 1) === '(-' && string[string.length - 1] === ')') {
        // Remove (-...) wrapping
        string = string.slice(0, i - 1) + string.slice(i + 1, -1);
      } else {
        // Wrap the number in (-...)
        const number = string.slice(i + 1); // from digit start to end
        string = string.slice(0, i + 1) + '(-' + number + ')';
      }

      document.querySelector('.textbox').value = string;
    } 
    else if (btn.classList.contains('decimal-button')) {
      let i = string.length - 1;
      if (string === '' || isOperator(string[i])) {
        string += '0.';
        document.querySelector('.textbox').value = string;
      }
      while (i >= 0 && ("0123456789.").includes(string[i])) {
        i--;
      }
      const lastNumber = string.slice(i + 1);
      if (!lastNumber.includes('.')) {
        string += '.';
      }
      document.querySelector('.textbox').value = string;
      openBrackets = 0;
    } 
    else if (btn.classList.contains('percentage-button')) {
      let lastOpIndex = -1;
      let operator = null;

      // Find the last operator
      for (let i = string.length - 1; i >= 0; i--) {
        if ('+-*/'.includes(string[i])) {
          lastOpIndex = i;
          operator = string[i];
          break;
        }
      }

      if (lastOpIndex === -1) return;

      // Find start of the number before the operator (the base)
      let baseEnd = lastOpIndex - 1;
      let baseStart = baseEnd;
      while (baseStart >= 0 && "0123456789.".includes(string[baseStart])) {
        baseStart--;
      }

      const base = parseFloat(string.slice(baseStart + 1, lastOpIndex));
      const percent = parseFloat(string.slice(lastOpIndex + 1));

      if (isNaN(base) || isNaN(percent)) return;

      let result;

      if (operator === '+' || operator === '-') {
        const delta = base * (percent / 100);
        result = operator === '+' ? base + delta : base - delta;
      } else if (operator === '*') {
        result = base * (percent / 100);
      } else if (operator === '/') {
        result = base / (percent / 100);
      }

      // Final expression = old up to base + new result
      string = string.slice(0, baseStart + 1) + result.toString();
      document.querySelector('.textbox').value = string;
    } 
    else if (btn.classList.contains('equal-button')) {
      try {
        // Replace '(-3)' with '-3'
       let expression = string.replace(/\(-/g, '(-1*');

        // Evaluate the expression
        const result = eval(expression);

        // Display result
        string = result.toString();
        document.querySelector('.textbox').value = string;
      } catch (err) {
        document.querySelector('.textbox').value = "Error";
        string = '';
      }
    }
    else {
      console.log(event.target.innerText);
      string += event.target.innerText;
      document.querySelector('.textbox').value = string;
    }
  })

})

function isOperator(char) {
  if (char === '+' || char === '-' || char === '/' || char === '*') {
    return true;
  } else { return false; }
}

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (('1234567890+-*/()%.').includes(key)) {
    string += key;
    document.querySelector('.textbox').value = string;
  }
  else if (key === 'Enter' || key==='=') {
    try {
      // Replace 'X' with '*' if you're using 'X' for multiply
      let expression = string.replace(/X/g, '*');

      // Replace '(-3)' with '-3'
      expression = expression.replace(/\(-/g, '(-1*');

      // Evaluate the expression
      const result = eval(expression);

      // Display result
      string = result.toString();
      document.querySelector('.textbox').value = string;
    } catch (err) {
      document.querySelector('.textbox').value = "Error";
      string = '';
    }
  }
  else if (key === 'Backspace') {
    string = string.slice(0, -1);
    document.querySelector('.textbox').value = string;
  }
  else if (key === 'c' || key === 'C') {
    string = '';
    openBrackets = 0;
    document.querySelector('.textbox').value = string;
  }
})
