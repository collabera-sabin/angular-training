import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  result: number = 0;
  currentNumber: string = '0';
  operator: string = '';
  previous: number = 0;
  waitingForSecondNumber: boolean = false;
  alteredFromPrevious: boolean = false;

  appendNumber(number: number) {
    if (this.waitingForSecondNumber) {
      if (this.currentNumber === '0.') {
        this.currentNumber += number.toString();
      } else {
        this.currentNumber = number.toString();
      }
      this.waitingForSecondNumber = false;
      this.alteredFromPrevious = true;
    } else {
      this.currentNumber = this.currentNumber === '0' ? number.toString() : this.currentNumber + number;
    }
    this.previous = parseFloat(this.currentNumber)
  }

  appendDecimal() {
    if (!this.waitingForSecondNumber && this.currentNumber.indexOf('.') === -1) {
      this.currentNumber += '.';
    } else if (this.waitingForSecondNumber) {
      this.currentNumber = '0.';
    }
  }

  clear() {
    this.result = 0;
    this.currentNumber = '0';
    this.operator = '';
    this.waitingForSecondNumber = false;
    this.alteredFromPrevious = false;
    this.previous = 0;
  }

  previousRegister(newOP: string) {
    this.alteredFromPrevious = true;
    if (this.operator !== '' && newOP !== this.operator) {
      this.previous = 0;
    } else {
      this.previous = parseFloat(this.currentNumber);
    }
  }

  add() {
    this.previousRegister('+');
    if (!this.waitingForSecondNumber)
      this.calculate();
    this.operator = '+';
    this.waitingForSecondNumber = true;
  }

  subtract() {
    this.previousRegister('-');
    if (!this.waitingForSecondNumber)
      this.calculate();
    this.operator = '-';
    this.waitingForSecondNumber = true;
  }

  multiply() {
    this.previousRegister('*');
    if (!this.waitingForSecondNumber)
      this.calculate();
    this.operator = '*';
    this.waitingForSecondNumber = true;
  }

  divide() {
    this.previousRegister('/');
    if (!this.waitingForSecondNumber)
      this.calculate();
    this.operator = '/';
    this.waitingForSecondNumber = true;
  }

  sign() {
    this.alteredFromPrevious = true;
    this.operator = '|';
    this.calculate();
    this.waitingForSecondNumber = false;
  }

  percent() {
    this.previousRegister('%');
    if (!this.waitingForSecondNumber)
      this.calculate();
    this.operator = '%';
    this.waitingForSecondNumber = true;
  }

  calculate(userInput:boolean = false) {
    let operand = (this.alteredFromPrevious)?parseFloat(this.currentNumber):this.previous
    console.log({operand, alt: this.alteredFromPrevious, prev: this.previous, current: this.currentNumber, wait: this.waitingForSecondNumber})
    if (this.operator === '+') {
      this.result += operand;
    } else if (this.operator === '-') {
      this.result -= operand;
    } else if (this.operator === '*') {
      this.result *= operand;
    } else if (this.operator === '/') {
      this.result /= operand;
    } else if (this.operator === '%') {
      this.result = (this.result / 100) * operand;
    } else if (this.operator === '|') {
      this.result = -operand;
      this.operator = '';
      this.currentNumber = this.result.toString();
      this.alteredFromPrevious = true;
      this.previous = this.result;
      return
    } else {
      this.result = operand;
    }
    if (userInput) {
      this.waitingForSecondNumber = true;
    }
    this.currentNumber = this.result.toString();
    if (this.currentNumber.indexOf('.') !== -1) {
      this.currentNumber = this.result.toFixed(2).toString();
    }
    this.alteredFromPrevious = false;
  }
}
