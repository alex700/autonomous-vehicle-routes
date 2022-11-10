## Task Description

For machine learning purposes, the analytics department gathers information about vehicles' visit areas to improve vehicle autopilot functions.

To improve the autopilot quality, vehicles should visit some zip codes a minimum of N times. The number of times depends on road difficulties (traffic, summer/winter time). Vehicle route tracking by zipcodes.

Data analytics receive information from vehicles in CSV format. The format can be replaced with any other source (e.g., database dump, streams, or anything else).

As a Data Analytic engineer, I can run a script that shows the number of visited zipcodes of vehicles. So that having that data, I can decide whether to keep the vehicle on the same route or switch vehicle visits to another one.


### Acceptance Criteria
* The report rows are grouped by vehicle ID and zip code. Each line represents how many times a vehicle has visited an area.
* A vehicle can visit a zipcode with a regular mode (DRIVE) or a maintenance mode (SERVICE). Service mode visits should be separate from the report.
* The report might have upcoming events when a vehicle scheduled for a route. Such events should be represented in the report with zero qty of visits even if some number of visits are scheduled.
* All the vehicles have IDs and titles.

## Application Description

The command line is a [Nest-based](https://github.com/nestjs/nest) solution which reads in a file of driving events and outputs a events records to stdout.
The application stream file to memory for the future routines. Please see more information in the **Usage** section and tests.

## Installation

Set up `npm` (see details [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)). 
Set up node ([nvm](https://npm.github.io/) is recommended). Use node version from `engines` section in `package.json` file (e.g. `nvm use 16`).

Then run following command in application directory to install dependencies from package manager:
```bash
$ npm install
```

## Usage

```bash
$ npx nestjs-command route:events example1.csv 2020-04-01
$ ts-node ./src/cli.ts route:events /Users/alex/public_html/aurora/example1.csv 2020-04-01
```
OR
```bash
$ npx nestjs-command route:events example2.csv 2021-01-01
```

Please run following command to review parameters description:
```bash
$ npx nestjs-command route:events --help
```
To test the application and review use cases please run `jest`:
```bash
$ jest
```
