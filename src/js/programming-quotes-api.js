export default class ProgrammingQuotesApi{
  static getRandomQuotePromise(){
    const url = "http://quotes.stormconsultancy.co.uk/random.json";
    return fetch(url, { mode: 'cors'})
      .then(function(response) {
        if(!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error){
        return Error(error);
      });
  }

  static isContentSafe(content){
    const flaggingWords = ['sex', 'slaves', 'violence', 'bikinis', 'bitch', 'fuck', 'shit', 'private members', 'Black Plague'];
    let isSafe = true;
    flaggingWords.forEach((word) => {
      if (content.includes(word)){
        isSafe = false;
      }
    });
    return isSafe;
  }
}