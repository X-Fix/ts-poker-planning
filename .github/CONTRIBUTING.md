# Contributing Guidelines

Welcome to the project, hope you enjoy your stay. The guidelines below will detail what you need to know in order to be a productive contributor as well as a few standards for keeping everyone's contributions consistent

## Table of Contents

[**What should I know before I get started?**](#what-should-i-know-before-i-get-started)

* [ES6](#ecmascript-6)
* [React](#react)
* [Redux](#redux)
* [Express](#express)
* [Socket.io](#socket.io)
* [Cypress.io](#cypress.io)

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
* [Minimal Renders](3minimal-renders)

## What should I know before I get started?

The following section gives a brief explanation of how each library fits into the project as well as links to starting resources. You don't need to be familiar with all the libraries in order to contribute but it is recommended you familiarise yourself with those relevant to whichever part of the project you want to get involved with.

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

## Where to Start

Assuming you have a good understanding of the relevant libraries and frameworks, the next question is where to go to start contributing

### This Document

Before really digging you in should at least skim over the rest of this document so you know how to follow the style guides, understand and follow the design decisions, and align yourself with the general priorities

### Existing Issues

Once you're comfortable with everything contained in this document you can start looking into the [existing issues](https://github.com/X-Fix/ts-poker-planning/issues) for anything you feel like tackling, especially those with a "help wanted" tag, or a "good first issue" tag if you're a newcomer to contributing to this repository

### Your Ideas

As explained more thoroughly below, this project is in part meant to be a playground so once you're familiar with the project you can start adding your own ideas to the Issues list and then working on them. If you are unsure of whether your idea aligns with the project's purpose feel free to contact any of the authors and ask.

## Style Guides

In an effort to maintain consistency throughout this project for the sake of code readability and developer confidence we've outlined a few style guides below

### Wireframes

For FE code there is a folder of wireframe files which you can copy/paste when creating on of the components or classes listed in the folder. You can also see an example of the case standard used when naming the relevant type of file

### Case Standards and Naming Conventions
