# TS Poker Planning

On 30th August 2017 CodeFirst's planitpoker.com went down so we lost our go-to poker planning tool.
TS Poker Planning (pending better name suggestions) has arrived to fill this minute hole in our toolbelt. So create a room and get back to work!

It's quite a bit rough around the edges regarding UI design (or lack thereof) and if your socket drops you're screwed but we're working on it

## Getting Started

Fork and clone, pretty straightforward

### Prerequisites

Node and npm@5.2.0+. We've only been able to test the build scripts on Mac OS X so they should run on Linux just fine and hopefully on Windows as well

Installing Node with HomeBrew (MacOS)

```
brew install node
```

### Installing

Install project dependencies

```
npm install
```

Run locally

```Shell
npm run watch

[1]
[1] > poker-planning-server@2.5.0 css-watch /pokerplanning
[1] > onchange "client/css/*.css" -i -- cleancss --skip-rebase -o public/style.css client/css/*.css
[1]
[2]
[2] > poker-planning-server@2.5.0 html-watch /pokerplanning
[2] > onchange "client/html/index.html" -i -- node ./scripts/replace-html 'watch'
[2]
[0]
[0] > poker-planning-server@2.5.0 js-watch /pokerplanning
[0] > watchify client/js/app.js --poll -v -t babelify -o public/build.js
[0]
[0] 1730695 bytes written to public/build.js (3.00 seconds) at 9:53:02 PM
[3]
[3] > poker-planning-server@2.5.0 nodemon /pokerplanning
[3] > nodemon index.js --watch server
[3]
[3] [nodemon] 1.12.0
[3] [nodemon] to restart at any time, enter `rs`
[3] [nodemon] watching: /pokerplanning/server/**/*
[3] [nodemon] starting `node index.js`
[3] Listening on 3000
```

Your console printout should look something like the above example. Open your (Chrome) browser and go to ``http://localhost:3000``, voilà!
Anyone on the same network as you can also connect using ``http://[your network IP address]:3000``

There are 4 watcher processes running at this point:
 - [0] client js 	([watchify](https://www.npmjs.com/package/watchify))
 - [1] client css 	([onchange](https://www.npmjs.com/package/onchange))
 - [2] client html 	([onchange](https://www.npmjs.com/package/onchange))
 - [3] server js 	([nodemon](https://www.npmjs.com/package/nodemon))

 [Concurrently](https://www.npmjs.com/package/concurrently) is used to fire them all up simultaneously (The printout for each process can be linked by the index dictated at the start of each line). This might shock your console so if you get any errors when starting up just try running it again OR add some timing space between the 4 watcher processes firing up (eg. package.json > scripts > watch > "sleep 5s && ...")

In develop environment the express server doesn't cache static files so no need to restart the server if you update the client files but you will need to refresh the page. No hot-reloading yet (Sssshhhhh)

## Running the tests

We've recently started adding [![Cypress.io tests](https://img.shields.io/badge/cypress.io-tests-green.svg?style=flat-square)](https://cypress.io)
We're still adding more but for now you can run the regression test by starting up [Cypress](https://www.cypress.io/) with `npx cypress open` and then selecting the ``front-end-regression-spec`` test from the GUI menu.

## Deployment

run the following

```
npm run build-production
```
before publishing to production server

## Roadmap/Todos

- Add more tests and a linter
- [Feature] "Remember me" option
- Formulate and implement a design scheme (desktop and mobile)
- Encrypt socket connections
- Handle dropped/prematurely closed connections
- Handle server reboot by Heroku
- Streamline lodash imports

## Authors

* **Cameron Stroebel** - *Initial work* - [X-Fix](https://github.com/X-Fix)

## License

MIT

## Acknowledgments

* Thanks to that X-Fix guy for letting me copy code from his past projects
* Bosses for the enthusiasm
* Ash and Henré for initial feedback and suggestions
