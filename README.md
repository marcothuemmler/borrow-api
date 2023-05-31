<p><a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a></p>

## Introduction

API for "borrow.app", an application developed for the mobile applications lecture at Constance University Of Applied Sciences.
Borrow app, as the name suggests, is an app that allows users to borrow things.
People can create groups within their community to be able to see what other people are sharing, and share their own.

## Installation

* Clone this repository [here](https://github.com/marcothuemmler/borrow-api.git)
* Run npm install -g @nestjs/cli to install the [Nest CLI](https://docs.nestjs.com/cli/overview)

```bash
$ npm install -g @nestjs/cli
```

* Run npm install to install the dependencies.

```bash
$ npm install
```

* By default, this project is configured to be used with a [PostgreSQL Dababase](https://www.postgresql.org). You can configure it in the project's env file
* Create a .env file in your project root folder. See .env.template for assistance

## Usage

* Run npm start:dev to start the application

```bash
# development
$ npm run start:dev

# production mode
$ npm run start:prod
```

* Connect to the API on the port configured in the .env-file (default is port 3000)

## AP Endpoints

Note: API endpoints can also be accessed using [OpenAPI](https://docs.nestjs.com/openapi/introduction). 
By default, it is accessible via your browser on http://localhost:3000/api

| HTTP Verbs    | Endpoints                | Action                                 |
|---------------|--------------------------|----------------------------------------|
| POST          | /auth/signup             | sign up a new user                     |
| POST          | /auth/login              | log-in an existing user                |
| POST          | /auth/logout/            | log-out current user                   |
| POST          | /auth/refresh            | refresh JWT tokens                     |
| GET           | /category/:id            | retrieve a single category             |
| POST          | /category                | Create a single category               |
| PUT           | /category/:id            | replace a single category              |
| DELETE        | /category/:id            | delete a single category               |
| GET           | /group/:id               | retrieve a single group                |
| POST          | /group                   | Create a single group                  |
| PUT           | /group/:id               | replace a single group                 |
| DELETE        | /group/:id               | delete a single group                  |
| GET           | /item/:id                | retrieve a single item                 |
| POST          | /item                    | Create a single item                   |
| PUT           | /item/:id                | replace a single item                  |
| DELETE        | /item/:id                | delete a single item                   |
| GET           | /user/:id                | retrieve a single user                 |
| GET           | /user/auth/current-user  | retrieve a single user using JWT token |
| PUT           | /user/:id                | replace a single user                  |
| DELETE        | /user/:id                | delete a single user                   |

## Technologies used

* [TypeScript](https://www.typescriptlang.org) TypeScript is a free and open-source high-level programming language developed by Microsoft that adds static typing with optional type annotations to JavaScript.
  It is designed for the development of large applications and transpiles to JavaScript.

* [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. 
It allows for installation and managing of dependencies and communication with databases.

* [NestJS](https://nestjs.com/) Nest is a framework for building efficient, scalable Node.js server-side applications.
It uses modern JavaScript, is built with TypeScript (preserves compatibility with pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

* [PostgreSQL](https://www.postgresql.org) PostgreSQL is a free and open-source relational database management system (RDBMS) emphasizing extensibility and SQL compliance.
PostgreSQL features transactions with atomicity, consistency, isolation, durability (ACID) properties, automatically updatable views, materialized views, triggers, foreign keys, and stored procedures.

* [TypeORM](https://typeorm.io) TypeORM is an ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8).
Its goal is to always support the latest JavaScript features and provide additional features that help you to develop any kind of application that uses databases - from small applications with a few tables to large scale enterprise applications with multiple databases.

* [Swagger](https://swagger.io) Swagger is a suite of tools for API developers from SmartBear Software and a former specification upon which the OpenAPI Specification is based.

## Author
* [Marco Thümmler](https://github.com/marcothuemmler)

## License
This project is available for user under the [MIT license](LICENSE)
