# public-supports [![Build Status](https://travis-ci.org/codeforboston/public-supports.svg?branch=master)](https://travis-ci.org/codeforboston/public-supports)

>

## Usage

```js
const publicSupports = require('public-supports');

```

## General set-up for elegibility/valuation functions

inputs:
	- Relevant Entities (Applicant, Child)
	- External variables (i.e Median Income of the local region)

output:
	value is a monetary value of the benefit per year (this maybe should change).
```js
	{
		eligible: <Boolean>,
		value: <Number>
	}
```

Eligibility data should be stored as easy to edit JS objects at the top of the module.


## API


## License

MIT © [Code for Boston](https://github.com/codeforboston)
