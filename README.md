# 🚄 TAKE.ME.HOME. 🏠

Tired of using old, rusty and slow web interfaces from your public transport network? Do you lookup the same connection over and over again? Do you iterate over several connections to find the best one? **_TAKE.ME.HOME. is here for you!_**

## Features

* Save your favorite connection(s) for a quick lookup.
* Let us load your primary connection instantly without any interaction!
* Lookup connections for all of Germany!

## Tech stack

Built with [Vue.js](https://vuejs.org/), [vue-router](https://router.vuejs.org/en/), [vuex](https://vuex.vuejs.org/en/), [Vuetify](https://vuetifyjs.com/) and [Pug](https://pugjs.org/). Data provided by [RMV API](https://opendata.rmv.de/).

## Installation

Install all dependencies using `yarn` (or `npm`):

```bash
yarn install
```

### Setup API proxy

We do not want to hard code the `API_KEY` into the app, so we're using a
[self-written proxy API](https://github.com/mimischi/proxify) to hit the API and
deliver the results back to us. Make sure to set it up first and change the
`API_URL` in `./.env.development`.

## Usage

### Local development

To start the app simply run:

```bash
yarn serve
```

The app is now available on `http://localhost:8080`.

### Production deployment

We are hosting the production site on [zeit.co](https://zeit.co). Running `now`
in the repository just deploys the application.

# About

[mimischi](https://github.com/mimischi) build the app to get a better
understanding of [Vue.js](https://vuejs.org). The app consumes the [RMV API](https://opendata.rmv.de/) and provides available connections to the user.

