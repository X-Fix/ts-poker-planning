# TS Poker Planning

On 30th August 2017 CodeFirst's planitpoker.com went down so we lost our go-to poker planning tool.
TS Poker Planning (pending better name suggestions) has arrived to fill this minute hole in our toolbelt. So create a room and get back to work!

It's quite bit rough around the edges regarding UX and design and if your socket drops you're screwed but we're working on it

If you have anything negative/unconstructive to say about using React: SSShhhhhhgobuildyourownpokerplanningtoolthen

## Getting Started

Fork and clone, pretty straightforward

### Prerequisites

Node and a MacBook. Haven't had a chance to test if the run/build scripts work on other OS's, any testing/contribution would be appreciated.

Installing Node with HomeBrew

```
brew install node
```

### Installing

Install project dependencies

```
npm install
```

Run locally

```
npm run watch
```

Should see a bunch of start up text ending with nodemon starting up and 'Listening on 3000'
Open your (Chrome) browser and go to "http://localhost:3000", voilà! Anyone on the same network as you can also connect using "[your network IP address]:3000"

There are 4 watcher processes running at this point (client html, client css, client js, and server js) and `concurrently` fires them all up simultaneously. This might shock your system so if you get any errors when starting up just try running it again OR add some timing space between the 4 watcher processes firing up (eg. package.json > scripts > watch > "sleep 5s && ...")

In develop environment the express server doesn't cache static files so no need to restart the server if you update the client files but you will need to refresh the page. No hot-reloading yet (Sssshhhhh)

## Running the tests

[![Cypress.io tests](https://img.shields.io/badge/cypress.io-tests-green.svg?style=flat-square)](https://cypress.io) coming soon...

## Deployment

run the following

```
npm run build-production
```
before publishing to production server

## Roadmap/Todos

- Add Tests and Linter
- [Feature] "Leave Room" button
- [Feature] "Remember me" option
- Add leaveRoom to onWindowClose event handler
- Formulate and implement a design scheme (desktop and mobile)
- Encrypt socket connections
- Handle dropped/prematurely closed connections
- Handle server reboot by Heroku
- Streamline lodash imports

## Authors

* **Cameron Stroebel** - *Initial work* - [X-Fix](https://github.com/X-Fix)

## License

ALL YOUR IP ARE BELONG TO TRAVELSTART

## Acknowledgments

* Thanks to that X-Fix guy for letting me copy code from his past projects
* Bosses for the enthusiasm
* Ash and Henré for initial feedback and suggestions
