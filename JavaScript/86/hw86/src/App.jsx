import { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    current: "0",
    total: null,
    operator: null,
    history: "",
    resetCurrent: false,
    lastKeyWasEqual: false,
  };

  handleNumber = (num) => {
    this.setState((prev) => {
      let current = prev.resetCurrent || prev.current === "0" ? num : prev.current + num;
      let history = prev.history;

      if (prev.lastKeyWasEqual) {
        history = "";
      }

      return { current, resetCurrent: false, history, lastKeyWasEqual: false };
    });
  };

  handleOperator = (op) => {
    this.setState((prev) => {
      let { current, total, operator, history, lastKeyWasEqual } = prev;
      const currentNum = parseFloat(current);

      if (lastKeyWasEqual) {
        total = currentNum;
        history = current + op;
        return { total, operator: op, history, resetCurrent: true, current: "", lastKeyWasEqual: false };
      }

      if (total === null) {
        total = currentNum;
      } else if (operator) {
        total = this.calculate(total, currentNum, operator);
      }

      history = history + current + op;
      return { total, operator: op, history, resetCurrent: true, current: "" };
    });
  };

  handleEqual = () => {
    this.setState((prev) => {
      const { current, total, operator, history } = prev;
      if (operator && total !== null) {
        const newTotal = this.calculate(total, parseFloat(current), operator);
        const newHistory = history + current;
        return {
          current: String(newTotal),
          total: null,
          operator: null,
          history: newHistory,
          resetCurrent: true,
          lastKeyWasEqual: true,
        };
      }
      return {};
    });
  };

  handleClear = () => {
    this.setState({ current: "0", total: null, operator: null, history: "", resetCurrent: false, lastKeyWasEqual: false });
  };

  handleBackspace = () => {
    this.setState((prev) => {
      const current = prev.current.slice(0, -1) || "0";
      return { current };
    });
  };

  handleDecimal = () => {
    this.setState((prev) => {
      if (prev.lastKeyWasEqual) {
        return { current: "0.", history: "", lastKeyWasEqual: false, resetCurrent: false };
      }

      if (!prev.current.includes(".")) {
        const current = prev.current + ".";
        return { current };
      }

      return {};
    });
  };

  calculate = (a, b, op) => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/": return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  render() {
    const { current, history } = this.state;

    return (
      <div>
        <h1>Calculator</h1>
        <div className="calculator">
          <div className="screen">
            <div className="history">{history}</div>
            <div className="current">{current || "0"}</div>
          </div>

          { }
          <div className="button-row">
            <button className="clear span-2" onClick={this.handleClear}>C</button>
            <button onClick={this.handleBackspace}>⌫</button>
            <button className="operator" onClick={() => this.handleOperator("/")}>/</button>
          </div>

          { }
          <div className="button-row">
            <button onClick={() => this.handleNumber("7")}>7</button>
            <button onClick={() => this.handleNumber("8")}>8</button>
            <button onClick={() => this.handleNumber("9")}>9</button>
            <button className="operator" onClick={() => this.handleOperator("*")}>×</button>
          </div>

          { }
          <div className="button-row">
            <button onClick={() => this.handleNumber("4")}>4</button>
            <button onClick={() => this.handleNumber("5")}>5</button>
            <button onClick={() => this.handleNumber("6")}>6</button>
            <button className="operator" onClick={() => this.handleOperator("-")}>-</button>
          </div>

          { }
          <div className="button-row">
            <button onClick={() => this.handleNumber("1")}>1</button>
            <button onClick={() => this.handleNumber("2")}>2</button>
            <button onClick={() => this.handleNumber("3")}>3</button>
            <button className="operator" onClick={() => this.handleOperator("+")}>+</button>
          </div>

          { }
          <div className="button-row">
            <button onClick={() => this.handleNumber("0")}>0</button>
            <button onClick={this.handleDecimal}>.</button>
            <button className="equal span-2" onClick={this.handleEqual}>=</button>
          </div>

        </div>
      </div>
    );
  }
}

export default App;