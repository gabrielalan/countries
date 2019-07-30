[![Build Status](https://travis-ci.org/gabrielalan/countries.svg?branch=master)](https://travis-ci.org/gabrielalan/countries)

## Features

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

### Different types of cells

The grid accepts different types of data. At the moment there are 3 different types of "Cells".
- `TextCell` - will try to render anything as text
- `CurrencyRateCell` - will treat the content as a currency KEY and try to get the current rate to show alogn with the key. To use it standalone you will need to pass the `rates` list, but that is covered by using the "container" `CurrencyRate`.
- `PrimitiveListCell` - a Cell used more for compositions. It will treat the content as a list of any primitive values and render each one with a another given type of Cell (TextCell, CurrencyRateCell... etc)

## Available Scripts

This project was created with [Create React App](https://github.com/facebook/create-react-app).

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