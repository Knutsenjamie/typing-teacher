import Game from '../src/js/game.js'

describe('Game', () => {
  test('It should increment numberCorrect if the user enters the correct letter', () => {
    let game = new Game();
    game.evalChar('c', 'c');
    expect(game.numberCorrect).toEqual(1);
  });
  test('If an incorrect number is entered, set waitingForBackspace to true', () => {
    let game = new Game();
    game.evalChar('c', 'x');
    expect(game.waitingForBackspace).toEqual(true);
  });
});