# 🚄 TAKE.ME.HOME. 🏠

I'm tired of the web interface from my local transportation service (looking at
you [RMV](https://www.rmv.de/) 👀). It's slow and looks like it was build in the
90s 👴🏻.

Most of my requests on that page revolve around me looking for the next
connection home from work. So why bother typing the same thing over and over
again?

In the course of learning [VueJS](https://vuejs.org/) and getting myself
familiar with the modern JavaScript stack I've build this small app. It consumes
the [RMV API](https://opendata.rmv.de/) and provides the next available
connections to the user.

## Tech stack

* [VueJS](https://vuejs.org/)
* [vue-router](https://router.vuejs.org/en/)
* [vuex](https://vuex.vuejs.org/en/)
* [Vuetify](https://vuetifyjs.com/)
* [Pug](https://pugjs.org/)
* [Stylus](http://stylus-lang.com/)
* [webpack](https://webpack.js.org/)
* [nodemon](https://nodemon.io/)

## Missing features

* Store a favorite connection in the users IndexedDB and automatically hit the
  API with that on initial page load (actually, that is the main feature 😬)

## Installation

Install all dependencies using `yarn` (or `npm`):

```bash
yarn install
```

### Setup API proxy

We do not want to hard code the `API_KEY` into the app, so we're using a
[self-written proxy API](https://github.com/mimischi/proxify) to hit the API and
deliver the results back to us. Make sure to set it up first and change the
`API_URL` in `./config/dev.env.js`.

## Usage

### Locally

To start the app simply run:

```bash
yarn serve
```

The app is now available on `http://localhost:3000`. You can override the port
by using the `PORT` environment variable.

#### Usage with `hotel`

To use this package with [`hotel`](https://github.com/typicode/hotel/), run the
following command in the project root:

```bash
hotel add 'node index.js --port $PORT' --name takemehome --change-origin
```

After starting the server, the page should be available via `http://takemehome.dev`

### Production deployment

While usage of this project in a deployment environment is probably not
recommended it's possible to deploy it to a server running
[Dokku](http://dokku.viewdocs.io/dokku/).

```bash
git remote add dokku dokku@my-dokku-host.example.com:proxify
git push dokku master
```
