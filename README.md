# Hopcar

A rental car search app using the freely available public [API from Hotwire.com](http://developer.hotwire.com/docs/Rental_Car_Shopping_API). The user searches for rental car using pickup location and rental duration.

 [![Build Status](https://travis-ci.org/abhishekdev/hopcar.svg?branch=master)](https://travis-ci.org/abhishekdev/hopcar) [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/abhishekdev/hopcar)

## Setup

### Production

```shell
npm install
npm run build
npm start
```

### Development

> Pre-requisites: Install [`yarn`](https://yarnpkg.com/en/docs/install)

```shell
yarn
yarn run build:dev
```

## Todo

- [x] Implement development workflow (**Webpack/ExpressJs**)
- [x] Add validators for Hotwire API (**JS**)
- [x] Get car images from Hotwire CDN (**JS**)
- [x] How to communicate with xDomain backend? (**JSONP**)

  - [x] Error Messages (**React states**)
  - [x] Prefetch validation (**JS**)

    - [x] Stop Empty Location from submission (**JS**)
    - [x] Show required-ness indicator for location

- [x] Add landing and Routing page for Search (**react-router**)

- [x] Add 404 page (**react-router**)

- [x] Design search form (**less**)

- [x] Implement rental duration picker

  - [x] Implement/Use datepicker control (**React**)
  - [x] Implement/Use timepicker control (**HTML**)
  - [x] Implement autocomplete for location picker (**react-geosuggest, google maps API**)

- [x] Responsive screens (**less**)

- [x] Search results Design: as a list/grid (**less, react**)

- [x] Check for accessibility

  - [ ] Set aria roles on modal layers and loaders

- [ ] Translations

- [ ] Use SVG for icons

- [ ] Add tests

- [x] Remove source maps from production
