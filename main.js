window.onload = function(){

	// When the basic calculator form submits, calculate, and display the answer in the appropriate div
	document.getElementById('bc-form').onsubmit = function(){
		
		// Fetch values from input fields
		var num1 				= parseFloatForInput('bc-num-1');
		var num2 				= parseFloatForInput('bc-num-2');
		var operatorSelect 		= document.getElementById("bc-operator");
		var operator 			= operatorSelect.options[operatorSelect.selectedIndex].value;
		var answer;


		// Use diffferent equations base on the operator
		switch (operator){
			case 'add':
				answer = num1 + num2;
				break;
			case 'subtract':
				answer = num1 - num2
				break;
			case 'multiply':
				answer = num1 * num2
				break;
			case 'divide':
				answer = num1 / num2
				break;
		}

		//console.log('num1', num1, 'num2', num2, 'operator', operator, 'answer', answer);

		displayAnswer('bc-answer', answer);

		return false;
	}

	// When the trip calculator form submits, calculate, and display the answer in the appropriate div
	document.getElementById('tc-form').onsubmit = function(){
		
		// Fetch values from input fields
		var distance 	= parseFloatForInput('tc-distance');
		var mpg 		= parseFloatForInput('tc-mpg');
		var cost 		= parseFloatForInput('tc-cost');
		var speed 		= parseFloatForInput('tc-speed');
		var answer;

		// Use diffferent equations base on the speed
		if (speed < 60){
			answer = distance / mpg * cost;
		} else{
			answer = distance / (mpg - (speed - 60) * 2) * cost;
		}

		//console.log('distance', distance,'mpg', mpg, 'cost', cost, 'speed', speed, 'answer', answer);

		displayAnswer('tc-answer', answer);

		return false;
	};

	// When the bmic unit changes, update the labels accordingly
	document.getElementById('bmic-unit').onchange = function(){
		
		// Fetch values from input fields
		var unitSelect 		= document.getElementById("bmic-unit");
		var unit 			= unitSelect.options[unitSelect.selectedIndex].value;

		if (unit == "metric"){
			document.getElementById("bmic-mass-unit-label").innerText 	= "kg";
			document.getElementById("bmic-height-unit-label").innerText = "m";
		} else if (unit == "imperial"){
			document.getElementById("bmic-mass-unit-label").innerText 	= "lb";
			document.getElementById("bmic-height-unit-label").innerText = "in";
		}
	};

	// When the BMI calculator form submits, calculate, and display the answer in the appropriate div
	document.getElementById('bmic-form').onsubmit = function(){

		// Fetch values from input fields
		var unitSelect	= document.getElementById("bmic-unit");
		var unit		= unitSelect.options[unitSelect.selectedIndex].value;
		var height 		= parseFloatForInput('bmic-height');
		var mass 		= parseFloatForInput('bmic-mass');
		var answer;

		if (unit == "metric"){
		 	answer = ( mass / ( height * height) ) * 703

		} else if (unit == "imperial"){
			answer = ( mass / ( height * height ) )
		}
		
		//console.log('unit', unit, 'height', height, 'mass', mass, 'answer', answer);

		displayAnswer('bmic-answer', answer);

		return false;
	};

	// When the mortgage calculator form submits, calculate, and display the answer in the appropriate div
	document.getElementById('mc-form').onsubmit = function(){
		
		// Fetch values from input fields
		var loan 	= parseFloatForInput('mc-loan');
		var apr 	= parseFloatForInput('mc-apr');
		var term 	= parseFloatForInput('mc-term');
		var answer 	= loan * apr * ( Math.pow(1 + apr, term) / ( Math.pow(1 + apr, term) - 1 ) );

		//console.log('loan', loan, 'apr', apr, 'term', term, 'answer', answer);

		displayAnswer('mc-answer', answer);

		return false;
	};

	// Utility functions

	// Displays answer in div with id, hides all other answer boxes, styles according to if answer is correct
	function displayAnswer(id, answer){

		var answerDivs = document.getElementsByClassName('answer');

		// Iterate through each of the answer divs, hiding them, reseting their class names
		for (var i = 0; i < answerDivs.length; i++) {
			answerDivs[i].style.display 	= "none";
			answerDivs[i].className 		= "answer";
		}

		// Show the answer div with id, show it, set it's inner text, and display an error message if the answer is not a number
		var answerDiv 				= document.getElementById(id);
		answerDiv.style.display 	= "block";

		if (isNaN(answer)){
			answerDiv.innerText 	= "Please enter a valid input"
			answerDiv.className		= "answer error";
		} else{
			answerDiv.innerText		= "The answer is " + answer;			
			answerDiv.className		= "answer success";
		}
	}

	// Convert input with id to a float value
	function parseFloatForInput(id){
		return parseFloat(document.getElementById(id).value, 10);
	}
}
