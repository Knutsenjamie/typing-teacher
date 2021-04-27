import Game from '../src/js/game.js'

describe('Game', () => {
  test('It should increment numberCorrect if the user enters the correct letter', () => {
    let game = new Game();
    game.setTextArray("console");
    game.evalChar(99); //99=c
    expect(game.numberCorrect).toEqual(1);
  });
  test('If an incorrect number is entered, set waitingForBackspace to true', () => {
    let game = new Game();
    game.setTextArray("console");
    game.evalChar(88); //88=x
    expect(game.waitingForBackspace).toEqual(true);
  });
  test('If waitingForBackspace, reset waitingForBackspace to false if backspace is entered', () => {
    let game = new Game();
    game.waitingForBackspace = true;
    game.evalChar(8);
    expect(game.waitingForBackspace).toEqual(false);
  });
  test('If waitingForBackspace, reset waitingForBackspace to false if backspace is entered', () => {
    let game = new Game();
    game.waitingForBackspace = true;
    game.evalChar(67); //67=c
    expect(game.waitingForBackspace).toEqual(true);
  });
});