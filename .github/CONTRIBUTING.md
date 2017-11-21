# Contributing Guidelines

Welcome to the project, hope you enjoy your stay. The guidelines below will detail what you need to know in order to be a productive contributor as well as a few standards for keeping everyone's contributions consistent.

## Table of Contents

[**What should I know before I get started?**](#what-should-i-know-before-i-get-started)

* [ES6](#ecmascript-6)
* [React](#react-fe)
* [Redux](#redux-fe)
* [Express](#express-be)
* [Socket.io](#socketio-be)
* [Cypress.io](#cypressio-testing)

[**Where to Start**](#where-to-start)

* [This Document](#this-document)
* [Existing Issues](#existing-issues)
* [Your Ideas](#your-ideas)

[**Style Guides**](#style-guides)

* [Wireframes](#wireframes)
* [Case Standards and Naming Conventions](#case-standards-and-naming-conventions)
* [JavaScript Style Guide](#javascript-style-guide)
* [Documentation and Comments](#documentation-and-comments)
* [Issues and Pull Requests](#issues-and-pull-requests)
* [Git Branches and Commits](#git-branches-and-commits)

[**Design Decisions**](#design-decisions)

* [Why React and Redux](#why-react-and-redux)
* [Handling Side Effects](#handling-side-effects)
* [Emitting Updates to Clients](#emitting-updates-to-clients)
* [Choosing Component Types](#choosing-component-types)
* [API Naming Convention](#api-naming-convention)

[**Priorities**](#priorities)

* [Size Matters](#size-matters)
* [Minimal Renders](#minimal-renders)

-----

## What should I know before I get started?

The following section gives a brief explanation of how each library fits into the project as well as links to starting resources. You don't need to be familiar with all the libraries in order to contribute but it is recommended you familiarise yourself with those relevant to whichever part of the project you want to get involved with. [These issues](https://github.com/X-Fix/ts-poker-planning/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) marked with ``good first issue`` are also a good place to start as they offer a practical look at how these libraries are used

The libraries can be split into 3 sections: front-end (FE), back-end (BE), and testing

### ECMAScript 6

So this isn't a library, it's a specification for JavaScript that hasn't been implemented by Node or modern browsers just yet but adds very appealing features and syntactic sugar which React and Redux make frivolous use of. While this project tries to avoid being too clever over writing readable code, it does make use of a lot of these features so you should at least have a vague understanding of some of the syntax. For this I suggest [this tutorial](http://ccoenraets.github.io/es6-tutorial/)'s topics on "let Variables", "Destructuring", "Arrow Functions", and "Classes"

For a full in depth course from top to bottom I always suggest [Tutorials Point](https://www.tutorialspoint.com/es6/)

### React (FE)

React.js is a library used (primarily) as the View part of MVC for single page applications, but traditionally "controller" responsibilities can also be found in React components. In fact it can be used to build an entire responsive webapp (depending on the size/complexity).

It's a project run by Facebook and where better to learn but from [their tutorials](https://reactjs.org/tutorial/tutorial.html)

### Redux (FE)

Redux is a library created by the brilliant Dan Abramov and was inspired by Facebook's initial solution to managing a web app's state, Flux. Flux and Redux effectively work as the model and controller in MVC except in Redux the "controller"s are called reducers. In actuality if you try to compare traditional MVC to React and Redux you'll probably struggle to relate so best to go in with an empty cup.

[A tutorial by the creator](https://egghead.io/courses/getting-started-with-redux) is the best place to get the right mindset and understanding

### Express (BE)

The Express.js library is used to run the back-end server. It exposes http endpoints for serving the static resources (html, css, js) and handling authentication. A quick read through the [Getting Started](https://expressjs.com/en/starter/hello-world.html) documentation should bring you up to speed.

### Socket.io (BE)

The Socket.io library handles socket connections. Socket connections are used to allow the server to push information down to the client without the client making a request for updates. This [Getting Started](https://socket.io/get-started/chat/) guide actually gives a slightly better example of a basic Express server and shows how to integrate sockets

### Cypress.io (Testing)

The Cypress.io library is used as a regression and unit test runner. Cypress wraps the Mocha and Chai libraries so it's worth checking them out as well. The [Cypress landing page](https://www.cypress.io/features/) gives a good idea of what it's capable of and the [documentation](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Write-a-Simple-Test) gives some basic examples of some tests you can write

We don't enforce unit testing for each feature just yet but it's good to understand how Cypress.io works

-----

## Where to Start

Assuming you have a basic understanding of the relevant libraries and frameworks, the next question is where to get started contributing

### This Document

While digging in I suggest keeping this document close by so you have a reference for following the style guides and understanding the design decisions.

### Existing Issues

Once you're comfortable with what's contained in this document you can start looking into the [existing issues](https://github.com/X-Fix/ts-poker-planning/issues) for anything you feel like tackling, especially those with a ``help wanted`` tag, or a ``good first issue`` tag if you're a newcomer to contributing to this repository

### Your Ideas

As explained more thoroughly below, this project is in part meant to be a playground so once you're familiar with the project you can start adding your own ideas to the ``Issues`` list and then working on them. If you are unsure of whether your idea aligns with the project's purpose feel free to contact any of the authors and ask.

-----

## Style Guides

In an effort to maintain consistency throughout this project for the sake of code readability and developer confidence we've outlined a few style guides below

### Wireframes

For FE code there is a folder of wireframe files which you can copy/paste from when creating one of the components or classes listed in the folder. You can also see an example of the case standard used when naming the relevant type of file

### Naming Conventions

- JavaScript files are named in ``camelCase`` with the exception of React components which are named in ``PascalCase``

-- Action creators are named after the thing the action is primarily affecting 
-- Top level components are named after the page they represent 
-- Child components are grouped on folders either by function (eg. modals) or by the top level component they appear in (eg. "pokerRoom") 
-- Reducers are named after the thing they represent data for 

- CSS files are named in ``kebab-case`` and, like the component folders, are named either after the shared function of the components they apply to or the page the styles are specific to

Ambiguity increases mental fatigue, especially when working on shared code. For that reason the following guidelines exist

- The word 'user' is banned! People who engage with the webapp are either a 'participant' and/or 'roomOwner' or something that describes their role in the system
- Object properties should not be repetitive, eg. room.roomId is unnecessary. Rather use something like room.id
- When translating object properties to variables, however, always be specific, eg.
```javascript
var roomId = room.id;
```
- Do not abreviate/shorten variable names. The code gets obfuscated during the build process so you are not saving any space, just being lazy. Abuse your autocomplete or copy/paste if necessary.

### JavaScript Style Guide

- Tabs, not spaces
- Single quotes for strings
- Semicolons always
- Space after keywords eg. ``if (condition) { ... }``
- Space inside curly braces (especially for spread operators) eg ``function({ arg1, arg2 })``
- No space after function name eg. ``function name(arg) {}``
- Always use === instead of ==

### Documentation and Comments

Comments are life! Please use them!

- Always appear on top, not next to code
- React components should have a description above the render() method and list the direct child component dependencies
- All helperMethods should have a thorough description of what the method does and how
- If you have an intricate process (eg. routeHandlers) add comments to describe the train of thought or process
- Same goes for complicated if conditions

### Issues and Pull Requests

#### Issues

- Should contain a description giving context and requirements in the form of a user story
- If you are technically inclined and have an idea of how to fulfill the issue requirement please leave more details like exact file locations and proposed solutions (always assume no-one has context for an issue)
- Should contain a 'checklist' of acceptance criteria that serve to describe the scope of the issue. Once all the acceptance criteria are filled, an issue can be considered solved

#### Pull Requests

- Title should match title of the relevant issue
- Should reference the relevant issue by id in description
- Should contain a listed summary of implementation details
- Should have a completed checklist of all house-keeping tasks (tests run, etc)

### Git Branches and Commits

- Branch names should be the issue number and title in snake_case eg. "#12_Ron_Swanson_quotes"
- Do something, commit, describe the thing you just did in commit message, repeat.

-----

## Design Decisions

"There are a thousand ways to make code do one thing, and a handful of ways to do it right" ~ Me

This project started as an experiment with socket connections (get an idea of how they worked, what kind of challenges do you face when using them, etc) along the way I decided to try keep it in the best code shape possible and so it became a training ground for good coding practices (I know there's still lots of improvements to make). It is still both of those things and now it's also becoming a testing ground for any fun ideas or libraries we'd like to play with. As part of the process I'd like us to report back on what we learn in this section so others may benefit from it as well as uphold the standards we create.

Some of these fall under consistency for the sake of readability and reducing mental fatigue. There's always more than one way of getting the job done but in these specific cases you need to stick to this way to avoid accumulating tech debt in the form of creating a need for refactoring, and to set a good example for future newcomers.

Some of these are just explanations for why I thought a particular tool was best for the job. Some of these might also be something like "I thought it would be fun to try".

### Why React and Redux

When thinking about multiple clients keeping in sync with a shared server this made me think of both React's and Redux's approach to updates. Previously if you had "2" and wanted "5" you would say "+3". With these libraries it feels more like saying "from 2 to 5" and React figures out how to "+3" for you.

The point is that if something changes we just figure out what the new 'now' is and go from there rather than trying to mirror the change correctly everywhere. This seemed like a much more reliable approach to keeping everyone in sync.

### Handling Side Effects

[Front-end specific]
Side effects are a no-no in redux reducers but often it would seem to make sense to (for example) carry out any sessionStorage or localStorage updates within a reducer's event handler.

I realised that side-efects only tend to happen when communication with the API is involved. The api/requests.js and api/responses.js files may seem like they simply pass the method call along but this pattern is to allow any side effects to be handled inside these
files.

### Emitting Updates to Clients

An argument could be made that when updating each client for a change in a poker room, a diff or replay action could be used to bring that client up to speed with the one that performed the action.

The problem with this approach is that if an event is missed there is no way of catching it up again. So, instead, the server keeps track of actions performed by each client and, after each change, sends an updated version of the entire room state to each client so everyone remains in sync, even if they missed a previous update.

### Choosing Component Types

React has two component types, 10 different names to differentiate between the two (I will use "Class" and "Functional", cos one's a class, the other is a function), and 100 patterns for when to use each.

My biggest issue with functional components is you cannot optimise component updates without access to the shouldComponentUpdate method so if the component is anything more complicated than a collection of commonly grouped html elements, it should be a Class component.

### API Naming Convention

Naming request and response handlers in a predictable standard allows us to reduce the amount of callback-handler-setup code immensely. The standard looks something like this:
```
request name = "login"
response handler = "loginResponse"
error handler = "loginError"
```
By using this standard we can take something repetitive like setting up callbacks for the super-agent AJAX libraries response handlers and dictate a single method which calls the relevant handler based on the request name and response type, ie:

*client/js/api/apiInterface.js*
```javascript
let handler = apiResponses[requestName+"Response"];
```

... where ``apiResponses`` is an object with response handlers for its properties.

-----

## Priorities

While there is always space for more optimisation in some form or another, at some point we need to draw a line in the sand past which debate takes up more energy than its worth. Optimisation is still fun and interesting, though, so I've outlined two main priorities for this project which I've found present some interesting challenges

### Size Matters

This applies to both JavaScript and CSS, primarily for FE code. Short of just removing established libraries in this project, if you can find ways to reduce the final build.min.js by even 1kb we consider that a victory. Some examples

- Libraries like React have a production build the simplifies error tracking and logging, reducing the build size
- Don't import an entire utility library just to use one or two methods from it. Lodash is a good exmaple of a library that let's you only import the code you need
- Minify, obfuscate, uglify, compress! All these things are a step closer to a smaller build

### Minimal Renders

One of the easiest ways to optimise FE performance with React is minimising the number of times each component's render method is called. Each time a reducer is updated, relevant components update which triggers their render method after which React performs a diff on the old render and new render and updates the DOM to reflect any changes. Sometimes, however, the changes in the reducer will not result in any changes in a certain component. If we can identify this early in the shouldComponentUpdate method we can avoid unnecessary update cycles and therefore unnecessary renders and diffs.

The easiest way to do this is to compare the state and props of the component to see if the updated reducer affected anything directly relating to the component or not. Another way on top of this is to ensure that the amount of info passed into a component's props from the reducer is kept to an absolute minimum.

-----

## Conclusion

That concludes this document! Thanks for sticking through it, hope you enjoy contributing to this project.

