export default class ProgrammingQuotesApi{
  static getRandomQuotePromise(){
    const url = "http://quotes.stormconsultancy.co.uk/random.json";
    return fetch(url)
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
    const flaggingWords = ['sex', 'slaves', 'violence']
    flaggingWords.forEach(word => {
      if (content.includes(word)){
        return false;
      }
    });
    return true;
  }

  static getSafeRandomQuote(){
    while (true){
      let randomQuotePromise = this.getRandomQuotePromise();
      randomQuotePromise
        .then(function(randomQuoteResponse){
          if (randomQuoteResponse instanceof Error){
            throw Error(`Programming Quotes API Request Error: ${randomQuoteResponse.message}`);
          }
          const isSafe = this.isContentSafe(randomQuoteResponse.quote);
          if (isSafe){
            return randomQuoteResponse;
          }
        })
        .catch(function (error){
          console.log(error);
          return error;
        });
    }
  }
}