export default class ProgrammingQuotesApi{
  static getRandomQuote(){
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
}