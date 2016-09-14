## HubApp

> Prototype for a community app for the Impact Hub Zurich built with React Native, Redux and ImmutableJS.
>
> Built with ♥️ by [@livioso](https://github.com/livioso/) and [@raphioriginal](https://github.com/RaphiOriginal).

### Overview
![Overview](./docs/Overview.png)

### Architecture
![Architecture](./docs/Architecture.png)

### Getting Started

In order to get the simulator running do the following:
- `brew install node && brew install watchman && npm install -g react-native-cli`
- `npm install`
- `react-native run-ios`

🚀 The simulator should be up and running.

##### Linting & Guidelines:
The code must comply to the airbnb style guide:
- `npm run lint:fix` can fix some errors for you (spacing etc.)
- `npm run lint`

##### Unittest:
In order to run the unit tests do the following:
- `npm test:watch` run all unit tests whenever files get modified.
- `npm test`

🙅 There must be no errors before pushing code.

##### Common Problems:
There are multiple packagers running (error `address in use`):
- run `npm run packager:kill` to kill all running packager.

Run Build on device:
- XCode: Change `Product -> Scheme -> Edit Scheme` from `debug` to `production`
- Bundle code and assets: `npm run bundle`
- Change `jsCodeLocation` in _AppDelegate.m_ to `jsbundle`.
