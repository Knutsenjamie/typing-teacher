
## Typing Teacher
#### *Epicodus Week 7 Team Project  4/26-29/2021*
***By Cassandra Copp, Jamie Knutsen, Tori West, Vanessa Su, James Wyn***
___
   

## *Description*:    
This application was designed to take an input text file/field and evaluate in real time for typing errors and accuracy.  It will allow you to load a file or use one that is called from an API, then score your typing accuracy upon completion.


## *Setup instructions:*
#### From the web:
* Go to GitHub repository, using following [URL](https://github.com/cass1618/typing-teacher.git).
* Click the "Code" and click the 'Download zip' option.
* Unzip the file, navigate to the `src` directory.
* open ***'index.html' or any interesting for you file*** to see code.
#### From the terminal: 
* Clone my repository from GitHub using `git clone https://github.com/cass1618/typing-teacher.git`
* Navigate to the downloaded folder using ***cd*** command
* Execute **code .** command in your terminal and it will open all source code in your code editor.    
*Note: to run this project locally you will need to have Node. After you cloned and open repository - execute `npm install` in command line to gain access to webpack*
#### API keys requirement: 
You don't need a special key to use this application.   

#### View website:
*GitHub page is available for this project at https://cass1618.github.io/typing-teacher/*

## *Technologies used:*
* HTML
* CSS
* Java Script
* JQuery
* Bootstrap *v.4.6.x*
* Git and GitHub
* Webpack
* npm

## *Known bugs:*
* If your file has return(`\r`)/newline(`\n`)/tab(`\t`) characters in it, the letters will be replaced with `Enter`/`Tab`
* If your text file has both return and newline characters at the end, Enter will be required twice
* Typing input box sometimes gets 'stuck' and rejects correct input
* Textarea placeholder text doesn't always show up but indent is there for where it might be
* Filepicker doesn't keep you from loading non-text files
* Can't call API from GitHub Pages because url for the API call is http and not https, throws a mixed content error

## *License and copyright:*

> ***© By Cassandra Copp, Jamie Knutsen, Tori West, Vanessa Su, James Wyn, 2021***    
> *Licensed under [MIT license](https://mit-license.org/)*