# Search Shindig

This is a small fullstack appliction that allows you to search for pictures. This project utilizes the Flickr API and returns 25 results. Clicking on the Title or Thumbnail of the results will pull up a modal of the full size image. Clicking on the dimmer or pressing the ESC key will take you back to the results. Enjoy!

### Prerequisites

Node.js needs to be downloaded onto your computer for this project to run locally. You will also need NPM.

### Installing

To install all needed dependencies, open the terminal in the projects root folder and run 
```
npm install
```

To get this project running, you need to open another tab in your terminal (still in the root folder of the project). In one tab run
```
npm start
```
to get the frontend going. In the other tab, run
```
node server/index.js
```
or ```nodemon``` if you have that installed, to get the backend running.

## Built With

* [React](https://reactjs.org/docs/getting-started.html) - The web framework used
* [Node.js](https://nodejs.org/en/docs/) - The backend framework used
* [Babel](https://babeljs.io/docs/en/) - JavaScript compiler
* [Webpack](https://webpack.js.org/) - Module bundler

## Authors

* **Kekoa Wilson**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hats off to Radiant for allowing me to create this project!
