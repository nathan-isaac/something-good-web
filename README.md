[![CircleCI](https://circleci.com/gh/nathanjisaac/something-good-web.svg?style=svg)](https://circleci.com/gh/nathanjisaac/something-good-web)

## TODO
- [ ] Prompt for getting a new thing
    - tap “I can’t do that thing today.”
        - Alert Can’t do today’s thing? You can get a new thing if you need it. Never mind / Get a new one
            a. Never mind: cancels
            b. Animates, gets you a new thing
- [ ] Persisting completed status for the day
- [ ] Notifications
- [ ] Loading animation
- [ ] Shake events

## Architecture

- UI
- Use Cases
- Gateways

### UI

The UI layer is only pulling data from use cases. In short the UI layer is mainly mapping use case data to reactjs state. No business logic in this layer. 

### Use Cases

Use cases include the core logic of the app. 

### Gateways

TODO...

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
