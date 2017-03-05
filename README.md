# Hopcar

A rental car search app using the freely available public [API from Hotwire.com](http://developer.hotwire.com/docs/Rental_Car_Shopping_API). The user searches for rental car using pickup location and rental duration.

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
  - [ ] Prefetch validation (**JS**)

    - [ ] Stop Empty Location from being submitted

- [x] Add landing and Routing page for Search (**react-router**)
- [x] Add 404 page (**react-router**)
- [x] Design search form (**lesscs**)
- [x] Implement rental duration picker

  - [x] Implement/Use datepicker control (**React**)
  - [x] Implement/Use timepicker control (**HTML**)

- [x] Implement autocomplete for location picker (**Geosuggest**)
- [x] Responsive screens (**lesscs**)
- [x] Search results Design: as a list/grid (**lesscs, react**)
- [ ] Add tests
