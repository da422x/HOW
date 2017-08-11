# Heroes On the Water 2.0

[![CircleCI](https://circleci.com/gh/madthad91/HOW/tree/master.svg?style=shield)](https://circleci.com/gh/madthad91/HOW/tree/master)

[Production link](http://howprod.surge.sh) (for now)

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Install dependencies

Run `npm install` and `bower install` to install all required packages defined in `package.json` and `bower.json`
npm install --only=dev if you are missing necessary dev dependencies

## Build & development

Run `grunt` for building and `grunt serve` for preview.
## Testing

Running `grunt test` will run the unit tests with karma.

# Surge hosting for sharing with others

Go here for info: https://surge.sh/
## Setup
Steps:

1. cd to project root
2. npm install -g surge
3. grunt build
4. surge -p docs
5. Go to [URL], e.g. http://legal-afternoon.surge.sh/#/home