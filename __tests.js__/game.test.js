import Game from '../src/js/game.js'

describe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game();
    game.setTextArray("console.log()");
  });
  test('It should increment numberCorrect if the user enters the correct letter', () => {
    game.evalChar('c'); 
    expect(game.numberCorrect).toEqual(1);
  });
  test('If an incorrect character is entered, set waitingForBackspace to true', () => {
    game.evalChar('x'); 
    expect(game.waitingForBackspace).toEqual(true);
  });
  test('If waitingForBackspace, reset waitingForBackspace to false if backspace is entered', () => {
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
  test('It should set textArray equal to input text', () => {
    expect(game.textArray).toEqual(['c', 'o', 'n', 's','o','l','e','.','l','o','g','(',')']);
  });

  test('If numberCorrect and textArray length are equal then trigger gameOver = true', () => {
    game.setTextArray("abc");
    game.evalChar("a");
    game.evalChar("b");
    game.evalChar("c");
    expect(game.gameOver).toEqual(true);
  });

  test('Returns number of correct keystrokes divided by total number of keystrokes', () => {
    game.numberCorrect = 5;
    game.keystrokeCounter = 10;
    const accuracy = game.getAccuracy();
    expect(accuracy).toEqual(0.5);
  });
});