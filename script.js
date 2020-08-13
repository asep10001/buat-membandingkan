
(function() {

  // Shortcut to get elements
  let el = (element) => {
    if (element.charAt(0) === "#") { // If passed an ID...
      return document.querySelector(element); // ... returns single element
    }

      return document.querySelectorAll(element); // Otherwise, returns a nodelist
  };

  let display = el("#viewer"), // Calculator screen where result is displayed
    equals = el("#equals"), // Equal button
    angka = el(".num"), // List of numbers
    ops = el(".ops"), // List of operators
    angkaSaatIni = "", // Current number
    angkaLama = "", // First number
    hasil, // Result
    operator; // Batman

    // When: Number is clicked. Get the current number selected
  let setNum = function() {
    if (hasil) { // If a result was displayed, reset number
      angkaSaatIni = this.getAttribute("data-num"); 
      hasil = "";
    } else { // Otherwise, add digit to previous number (this is a string!)
      angkaSaatIni += this.getAttribute("data-num");
    }

    display.innerHTML = angkaSaatIni; // Display current number

  };
// When: Operator is clicked. Pass number to angkaLama and save operator
  let pindahAngka = function() {
    angkaLama = angkaSaatIni;//=="78 "plus" 8"
    angkaSaatIni = "";
    operator = this.getAttribute("data-ops");//"plus"

    equals.setAttribute("data-result", ""); // Reset result in attr
  };

  // When: Equals is clicked. Calculate result
  let displayNum = function() {

    // Convert string input to numbers
    angkaLama = parseFloat(angkaLama); //=78
    angkaSaatIni = parseFloat(angkaSaatIni); //=8

    // Perform operation
    switch (operator) {
      case "plus":
        hasil = angkaLama + angkaSaatIni;
        break;

      case "minus":
        hasil = angkaLama - angkaSaatIni;
        break;

      case "times":
        hasil = angkaLama * angkaSaatIni;
        break;

      case "divided by":
        hasil = angkaLama / angkaSaatIni;
        break;

        // If equal is pressed without an operator, keep number and continue
      default:
        hasil = angkaSaatIni;
    }

    // If NaN or Infinity returned
    if (!isFinite(hasil)) {
      if (isNaN(hasil)) { // If result is not a number; set off by, eg, double-clicking operators
        hasil = "You broke it!";
      } else { // If result is infinity, set off by dividing by zero
        hasil = "Look at what you've done";
        el('#calculator').classList.add("broken"); // Break calculator
        el('#reset').classList.add("show"); // And show reset button
      }
    }

    // Display result, finally!
    display.innerHTML = hasil;//==86
    equals.setAttribute("data-result", hasil);//==86

    // Now reset angkaLama & keep result
    angkaLama = 0;
    angkaSaatIni = hasil;

  };

  // When: Clear button is pressed. Clear everything
  let clearAll = function() {
    angkaLama = "";
    angkaSaatIni = "";
    display.innerHTML = "0";
    equals.setAttribute("data-result", angkaSaatIni);
  };

  /* The click events */

  // Add click event to numbers
  for (let i = 0; i < angka.length; i++) {
    angka[i].onclick = setNum;
  }

  // Add click event to operators
  for (let i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = pindahAngka;
  }

  // Add click event to equal sign
  equals.onclick = displayNum;

  // Add click event to clear button
  el("#clear").onclick = clearAll;

  // Add click event to reset button
  el("#reset").onclick = function() {
    window.location = window.location;
  };


}());
