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
- [x] Get car images from Hotwire CDN
- [ ] How to communicate with xDomain backend?
  - [ ] Error Messages
  - [ ] Prefetch validation
- [x] Add landing and Routing page for Search (**react-router**)
- [x] Add 404 page
- [ ] Design search form
- [ ] Implement rental duration picker
  - [ ] Implement/Use datepicker control
  - [ ] Implement/Use timepicker control
- [ ] Implement autocomplete for location picker
- [ ] Responsive screens
- [ ] Search results Design: as a list/grid
- [ ] Add tests
