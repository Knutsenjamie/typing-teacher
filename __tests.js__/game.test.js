import Game from '../src/js/game.js'

describe('Game', () => {
  test('It should increment numberCorrect if the user enters the correct letter', () => {
    let game = new Game();
    game.setTextArray("console");
    game.evalChar('c'); 
    expect(game.numberCorrect).toEqual(1);
  });
  test('If an incorrect character is entered, set waitingForBackspace to true', () => {
    let game = new Game();
    game.setTextArray("console");
    game.evalChar('x'); 
    expect(game.waitingForBackspace).toEqual(true);
  });
  test('If waitingForBackspace, reset waitingForBackspace to false if backspace is entered', () => {
    let game = new Game();
    game.waitingForBackspace = true;
    game.evalChar('Backspace');
    expect(game.waitingForBackspace).toEqual(false);
  });
  test('If waitingForBackspace, waitingForBackspace stays equal to true if char other than backspace is entered', () => {
    let game = new Game();
    game.waitingForBackspace = true;
    game.evalChar('c'); 
    expect(game.waitingForBackspace).toEqual(true);
  });
  test('It should set textArray equal to input text')
  // test('If numberCorrect and textArray length are equal then trigger gameOver = true', () => {
  //   let game = new Game();
  //   game.numberCorrect = ;
    
  // })
});