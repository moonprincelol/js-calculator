import { useState } from "react";
import "./App.scss";

function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const et = expression.trim();

  const isOperator = (symbol) => {
    return /[*/+-]/.test(symbol);
  };

  const buttonPress = (symbol) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if (symbol === "negative") {
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if (symbol === "percent") {
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
    } else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      // split by operators and get last number
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      console.log("lastNumber :>> ", lastNumber);
      // if last number already has a decimal, don't add another
      if (lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  const calculate = () => {
    // if last char is an operator, do nothing
    if (isOperator(et.charAt(et.length - 1))) return;
    // clean the expression so that two operators in a row uses the last operator
    // 5 * - + 5 = 10
    const parts = et.split(" ");
    const newParts = [];

    // go through parts backwards
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression));
    } else {
      setAnswer(eval(newExpression));
    }
    setExpression("");
  };

  return (
      <div className="container">
        <div id="calculator">
          <div className="display" id="display">
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
          </div>
          <div className="col">
          <button
            id="clear"
            onClick={() => buttonPress("clear")}
            className="clearbutton"
          >
            C
          </button>
          <button
            id="negative"
            onClick={() => buttonPress("negative")}
            className="operator"
          >
            +/-
          </button>
          
          <button
            id="percentage"
            onClick={() => buttonPress("percentage")}
            className="operator"
          >
            %
          </button>
          </div>
          <div className="col">
          <button
            id="seven"
            onClick={() => buttonPress("7")}
            className="number"
          >
            7
          </button>
          <button
            id="eight"
            onClick={() => buttonPress("8")}
            className="number"
          >
            8
          </button>
          <button
            id="nine"
            onClick={() => buttonPress("9")}
            className="number"
          >
            9
          </button>
          <button
            id="divide"
            onClick={() => buttonPress("/")}
            className="operator"
          >
            /
          </button>
          </div>

          <div className="col">
          <button
            id="four"
            onClick={() => buttonPress("4")}
            className="number"
          >
            4
          </button>
          <button
            id="five"
            onClick={() => buttonPress("5")}
            className="number"
          >
            5
          </button>
          <button
            id="six"
            onClick={() => buttonPress("6")}
            className="number"
          >
            6
          </button>
          <button
            id="multiply"
            onClick={() => buttonPress("*")}
            className="operator"
          >
            *
          </button>
          </div>
          <div className="col">
          <button
            id="one"
            onClick={() => buttonPress("1")}
            className="number"
          >
            1
          </button>
          <button
            id="two"
            onClick={() => buttonPress("2")}
            className="number"
          >
            2
          </button>
          <button
            id="three"
            onClick={() => buttonPress("3")}
            className="number"
          >
            3
          </button>
          <button
            id="subtract"
            onClick={() => buttonPress("-")}
            className="operator"
          >
            -
          </button>
          </div>
          <div className="col">
          <button
            id="zero"
            onClick={() => buttonPress("0")}
            className="number zerobutton"
          >
            0
          </button>
          <button
            id="decimal"
            onClick={() => buttonPress(".")}
            className="operator"
          >
            .
          </button>
          <button id="add" onClick={() => buttonPress("+")} className="operator">
            +
          </button>
          <button
            id="equals"
            onClick={() => buttonPress("=")}
            className="equalsbutton"
          >
            =
          </button>
          </div>
        </div>
      </div>
  );
}

export default App;