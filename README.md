# Microservice Assignment

Simple microservice assignment.

## Description

NodeJS microservice API using Typescript, MySql, Restify, Axios.

Goal is to be able to do simple CRUD operations on MonitoredEndpoint entities.

Only Authenticated users are allowed to do these operations.
Additionally, only authorized users are allowed to interact with existing items.

Backend service should automatically be able to monitor stored endpoints,
fetching urls every 'interval' seconds and storing retrieved payload into DB.

Each authenticated user should have possibility to check last 10 monitoring results for endpoints owned by him/her.

### Implementation thought-process

Trying to keep simple 'Controllers - Services - Data Access Layer (DAL) - DB' architecture.

Interfacing everything that makes sense, keeping possibility of unit testing as high as possible.

Dependency injection has been greatest factor while implementing.

### Possible improvements ahead

* Finalize unit tests for each level AND lead further development with TDD
* Implement TypeORM on DAL to manage with DB and map DB entities to code classes
* Include Swagger-UI for endpoint-testing
* Build simple web application and connect it with this service. Quite possibly in React.
* Dockerize the service

## Getting Started

### Dependencies

* Windows 10
* Git
* NodeJS LTS 14+
* MySQL DB installed
* Postman (for seamless endpoint testing)
* VS Code / Webstorm / any preferred IDE
  * If using VS Code, for nice testing experience using [Mocha Test Explorer](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter) and [Test Explorer UI](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-test-explorer) extensions is recommended...

### Installing

* Clone repository to location of your choice
* Open root folder in any cmd and run
```
npm i
```
* All dependencies should have been installed by now
* Under ROOT_FOLDER/src/db create file config.ts and fill it with code as follows (swap ********* for your specific values):
```
import { ConnectionConfig } from "mysql";

export const dbOptions: ConnectionConfig = {
    host: "localhost",
    user: "*********",
    password: "*********",
    database: "*********"
}
```

### Executing program

* Under ROOT_FOLDER/package.json, there are some useful scripts defined:
* To assemble TypeScript code (transpile into JS) and run the application
```
npm run assemble-and-start
```
* To only compile TS code without starting application
```
npm run assemble
```
* To run already transpiled code (no compilation needed)
```
npm run start
```
* To clear output folder
```
npm run clear
```

### Executing tests

* Unit tests can be ran using this command in command line
```
npm run test
```
* Or run desired tests using VS Code Test Explorer extension directly (links mentioned in [Dependencies](#dependencies) section)
* You can import Postman definition, which can be found in ROOT_FOLDER/tests/postman
  * Highly recommended to play around with the service

### Provided Endpoints

* All endpoints use 'Authorization' header for authentication with given user access tokens
* GET http://localhost:3000/endpoints (Retrieving MonitoringEndpoint)
* POST http://localhost:3000/endpoints (Inserting/Creating MonitoringEndpoint)
  * JSON body fulfilling this form:
  ```
  {
	  "name": string,
	  "url": string,
	  "monitoredInterval": number
  }
  ```
* PUT http://localhost:3000/endpoints/:id (Updating MonitoringEndpoint)
  * JSON body fulfilling this form:
  ```
  {
	  "name": string,
	  "url": string,
	  "monitoredInterval": number
  }
  ```
* DELETE http://localhost:3000/endpoints/:id (Deleting MonitoringEndpoint)
* GET http://localhost:3000/monitoring/:id (Retrieving MonitoringResults)
* Endpoints either return 200 (OK), 401 (Unauthorized - when user was not authenticated)
or 404 (Not found) in case something else went wrong (requested resource not found or user is not allowed to interact with object(s) etc - inspired by CloudFront implementation of response codes in AWS, where they return one and same response code for all unsuccessful requests)

## Authors

Martin Kuchar

[Kuchto47@GitHub](https://github.com/Kuchto47)
