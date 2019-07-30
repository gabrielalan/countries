[![Build Status](https://travis-ci.org/gabrielalan/countries.svg?branch=master)](https://travis-ci.org/gabrielalan/countries)

## Features

### Redux + Saga + Router + GraphQl

The architecture is based on Redux + Redux Saga. Most of the data pass through the reducers and sagas.
Since the API endpoint is using GraphQL, Apollo was added to handle the queries and fetch.

### Grid scrolling

The grid will scroll vertically and/or horizontally if needed. The design decision was to keep the column's width fixed so then the scrolling can happen and the space is better used.

### Column width resize

It's possible to resize the header. Doing so all the other cells in the same column will follow the new size.
This goes well together with the grid scrolling, puting the user in control of the grid size/scrolling.

The width don't have a limit per se, but the content will be scoped to the column. This means that big text will be "wrapped" and will to multi-line when needed.

### Pagination

The pagination is pretty simple, having a range depending on the quantity of pages. 
If the user is using a small device, the numbers are hidden and the only visible navigation items are "previous" and "next".

### Data sorting

Some of the columns are sortable. The user can click in the columns and that will trigger the new ordering.
The new column that is leading the order will be indicated via a "sort icon" in the header.

### Removable columns

The columns can also be removed in case the user doesn't want to see any kind of data.
There is a button in each header that when activated will remove the column.

### Remove reverter

The grid also have a "reverter" for when the user removes one or more columns.
The button will appear as soon as the user removes the first column, and it opens a modal, with a list of columns that the user removed of which it's possible to add back.

### Search filter

The only filter added at the moment is the search. It has the base to add more filters.
It basically searchs by name and phone prefix. Continent is a possible new filter in the future, as a select filter.

### Different types of cells

The grid accepts different types of data. At the moment there are 3 different types of "Cells".
- `TextCell` - will try to render anything as text
- `CurrencyRateCell` - will treat the content as a currency KEY and try to get the current rate to show alogn with the key. To use it standalone you will need to pass the `rates` list, but that is covered by using the "container" `CurrencyRate`.
- `PrimitiveListCell` - a Cell used more for compositions. It will treat the content as a list of any primitive values and render each one with a another given type of Cell (TextCell, CurrencyRateCell... etc)

### Login 

The Login is a simple feature that is working for now with the not-secure local storage method. 
The user can register and login, all based on local storage only for the purpose of this exercise.

Possible solutions for a more secure and production ready login:
- [Auth0](https://auth0.com/opensource)
- [Gluu](https://www.gluu.org/)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Keycloak](https://www.keycloak.org/)

## Available Scripts

This project was created with [Create React App](https://github.com/facebook/create-react-app) therefore using `npm` and `webpack`.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.<br>
The build is minified and the filenames include the hashes.


### `npm run deploy`

This builds the application and deploys it to netlify.<br>
In order to be able to deploy you need to have a account at netlify.<br>
In the first deploy it will authenticate through a browser window and afterwards you can configure the site name and other variables via CLI.