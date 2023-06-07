import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      // Insert form input state here
      chances: 8,
      guess: "",
      gameWon: false,
    };
  }

  generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  // Insert form callback functions handleChange and handleSubmit here
  handleChange = (e) => {
    this.setState({
      guess: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[a-z]+$/i.test(this.state.guess)) {
      alert("Please Submit only Lowercase alphabets!");
      this.setState({
        guess: "",
      });
      return null;
    }
    let guess = this.state.guess.toLowerCase();
    let minus = true;
    let tempArray = [...this.state.guessedLetters];
    let mutatedWord = [...this.state.currWord];
    // const isFullyGuessed = this.checkWholeWord();
    for (let i = 0; i < mutatedWord.length; i++) {
      for (let j = i + 1; j < mutatedWord.length; j++) {
        if (mutatedWord[i] === mutatedWord[j]) {
          mutatedWord.splice(j, 1);
        }
      }
    }
    tempArray.push(guess);
    for (let letter of mutatedWord) {
      if (guess.includes(letter)) {
        minus = false;
      }
    }
    this.setState(
      {
        guess: "",
        guessedLetters: tempArray,
        chances: minus ? this.state.chances - 1 : this.state.chances,
      },
      () => {
        const isFullyGuessed = this.checkWholeWord();
        this.setState({
          gameWon: isFullyGuessed,
        });
      }
    );
  };
  checkWholeWord = () => {
    const wordDisplay = this.generateWordDisplay();
    const isFullyGuessed = !wordDisplay.includes("_");
    return isFullyGuessed;
  };
  handleReset = () => {
    this.setState({
      gameWon: false,
      currWord: getRandomWord(),
      chances: 8,
      guess: "",
      guessedLetters: [],
    });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.chances === 7 ? (
            <img src="./pictures/chance7.jpg" alt="" width={500} height={250} />
          ) : null}
          {this.state.chances === 6 ? (
            <img src="./pictures/chance6.jpg" alt="" width={500} height={250} />
          ) : null}
          {this.state.chances === 5 ? (
            <img src="./pictures/chance5.jpg" alt="" width={500} height={250} />
          ) : null}
          {this.state.chances === 4 ? (
            <img src="./pictures/chance4.jpg" alt="" width={500} height={250} />
          ) : null}
          {this.state.chances === 3 ? (
            <img src="./pictures/chance3.jpg" alt="" width={500} height={250} />
          ) : null}
          {this.state.chances === 2 ? (
            <img src="./pictures/chance2.jpg" alt="" width={500} height={250} />
          ) : null}
          {this.state.chances === 1 ? (
            <img src="./pictures/chance1.jpg" alt="" width={500} height={250} />
          ) : null}
          {this.state.chances === 0 ? (
            <img src="./pictures/chance0.jpg" alt="" width={500} height={250} />
          ) : null}
          <h3>Word Display</h3>
          {this.generateWordDisplay()}
          <h3>Guessed Letters</h3>
          {this.state.guessedLetters.length > 0
            ? this.state.guessedLetters.toString()
            : "No Guesses Yet! Start by inputting an alphabet below!"}
          {this.state.chances !== 0 && this.state.gameWon !== true ? (
            <div>
              <h4>Chances Left: {this.state.chances}</h4>
              <h4>Input</h4>
            </div>
          ) : null}
          {/* Insert form element here */}
          {this.state.gameWon === true || this.state.chances === 0 ? (
            <div>
              <div>The Game is Over!</div>
              <div>The Word is {this.state.currWord.toUpperCase()}!</div>
            </div>
          ) : (
            <form>
              <input
                placeholder="input ANY alphabet"
                maxLength={1}
                name="guess"
                value={this.state.guess}
                type="text"
                onChange={(e) => this.handleChange(e)}
              />
              <button onClick={this.handleSubmit}>Guess!</button>
            </form>
          )}
          {this.state.gameWon === true ? (
            <div>
              <h3>You Win! Play again?</h3>
              <button onClick={this.handleReset}>ONE MORE</button>
            </div>
          ) : null}
          {this.state.chances === 0 ? (
            <div>
              <h3>He Died! May he be saved next time!</h3>
              <button onClick={this.handleReset}>ONE MORE</button>
            </div>
          ) : null}
        </header>
      </div>
    );
  }
}

export default App;
