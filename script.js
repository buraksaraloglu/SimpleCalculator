class Calculator {
	constructor(previousOperandText, currentOperandText) {
		this.previousOperandText = previousOperandText;
		this.currentOperandText = currentOperandText;
		this.clear();
	}

	clear() {
		this.currentOperand = '';
		this.previousOperand = '';
		this.operation = undefined;
		this.updateDisplay();
	}
	delete() {
		if (this.currentOperand !== '') {
			this.currentOperand = this.currentOperand.toString().slice(0, -1);
		} else if (this.currentOperand === '' && this.previousOperand.length > 0) {
			this.currentOperand = this.previousOperand;
			this.currentOperand = this.currentOperand.toString().slice(0, -1);
			this.previousOperand = '';
			this.operation = undefined;
		} else return;
	}
	appendNumber(number) {
		if (number === '.' && this.currentOperand.includes('.')) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}
	chooseOperation(operation) {
		if (this.currentOperand === '' && this.previousOperand === '') {
			return;
		} else if (this.currentOperand === '' && this.operation != null) {
			this.operation = operation;
		} else if (this.previousOperand === '' && this.operation == null) {
			this.previousOperand = this.currentOperand;
			this.operation = operation;
			this.currentOperand = '';
		} else if (this.previousOperand !== '' && this.currentOperand !== '') {
			this.compute();
		}
	}
	compute() {
		let computation;
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);
		if (isNaN(prev) || isNaN(current)) return;
		switch (this.operation) {
			case '+':
				computation = prev + current;
				break;
			case '-':
				computation = prev - current;
				break;
			case '*':
				computation = prev * current;
				break;
			case '÷':
				computation = prev / current;
				break;
			default:
				return;
		}
		this.currentOperand = computation;
		this.previousOperand = '';
		this.operation = undefined;
	}
	getDisplayNumber(number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split('.')[0]);
		const decimalDigits = stringNumber.split('.')[1];
		let integerDisplay;
		if (isNaN(integerDigits)) {
			integerDisplay = '';
		} else {
			integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}
	updateDisplay() {
		this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);
		if (this.operation != null) {
			this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
		} else {
			this.previousOperandText.innerText = '';
		}
		if (this.operation != null && this.currentOperand === '') {
			this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
		}
	}
}
//Load Data Classes
const numberButtons = document.querySelectorAll('[data-class="number"]');
const operatorButtons = document.querySelectorAll('[data-class="operator"]');
const previousOperandText = document.querySelector('[data-class="previous-operand"]');
const currentOperandText = document.querySelector('[data-class="current-operand"]');
const allClearButton = document.querySelector('[data-class="all-clear"]');
const deleteButton = document.querySelector('[data-class="delete"]');
const equalsButton = document.querySelector('[data-class="equals"]');

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach((button) => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

operatorButtons.forEach((button) => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});

equalsButton.addEventListener('click', (button) => {
	calculator.compute();
	calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
	calculator.clear();
});

deleteButton.addEventListener('click', (button) => {
	calculator.delete();
	calculator.updateDisplay();
});
