<p><a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a></p>

## Introduction

API for "borrow.app", an application developed for the mobile applications lecture at Constance University Of Applied
Sciences.
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

* By default, this project is configured to be used with a [PostgreSQL Dababase](https://www.postgresql.org). You can
  configure it in the project's env file
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

| HTTP Verbs | Endpoints                       | Action                                                      |
|------------|---------------------------------|-------------------------------------------------------------|
| POST       | /auth/signup                    | Sign up a new user                                          |
| POST       | /auth/login                     | Log-in an existing user                                     |
| POST       | /auth/logout/                   | Log-out current user                                        |
| POST       | /auth/refresh                   | Refresh JWT tokens                                          |
| GET        | /users/:id                      | Retrieve a single user                                      |
| PATCH      | /users/:id                      | Update a single user                                        |
| DELETE     | /users/:id                      | Delete a single user                                        |
| GET        | /users/with-groups/:id          | Retrieve a single user and include groups with group images |
| GET        | /users/                         | retrieve multiple users                                     |
| PUT        | /users/cover/:id                | Upload a profile image                                      |
| DELETE     | /users/cover/:id                | Delete a profile image                                      |
| GET        | /users/:id/invitations          | Get group invitations for a single user                     |
| GET        | /groups/:id                     | Retrieve a single group                                     |
| PATCH      | /groups/:id                     | Update a single group                                       |
| DELETE     | /groups/:id                     | delete a single group                                       |
| GET        | /groups                         | Get multiple groups                                         |
| POST       | /groups                         | Create a single group                                       |
| PUT        | /groups/cover/:id               | Upload a group image                                        |
| PUT        | /groups/:id/members/:userId     | Add a single group member                                   |
| DELETE     | /groups/:id/members/:userId     | Remove a single group member                                |
| PUT        | /groups/:id/invitations/        | Add a group invitation                                      |
| DELETE     | /groups/:id/invitations/:userId | Remove a single group invitation                            |
| POST       | /items                          | Create a single item                                        |
| GET        | /items                          | Retrieve multiple items                                     |
| GET        | /items/:id                      | Retrieve a single item                                      |
| PATCH      | /items/:id                      | Update a single item                                        |
| DELETE     | /items/:id                      | Delete a single item                                        |
| POST       | /categories                     | Create a single category                                    |
| GET        | /categories                     | Retrieve multiple category                                  |
| PATCH      | /categories/:id                 | Update a single category                                    |
| GET        | /categories/:id                 | Retrieve a single category                                  |
| DELETE     | /categories/:id                 | Delete a single category                                    |
| GET        | /chats                          | Retrieve chatrooms for the currently logged in user         |

## Technologies used

* [TypeScript](https://www.typescriptlang.org) is a free and open-source high-level programming language developed by
  Microsoft that adds static typing with optional type annotations to JavaScript.
  It is designed for the development of large applications and transpiles to JavaScript.

* [NodeJS](https://nodejs.org/) is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used
  in running JavaScript codes on the server.
  It allows for installation and managing of dependencies and communication with databases.

* [NestJS](https://nestjs.com/) is a framework for building efficient, scalable Node.js server-side applications.
  It uses modern JavaScript, is built with TypeScript (preserves compatibility with pure JavaScript) and combines
  elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

* [PostgreSQL](https://www.postgresql.org) is a free and open-source relational database management system (
  RDBMS) emphasizing extensibility and SQL compliance.
  PostgreSQL features transactions with atomicity, consistency, isolation, durability (ACID) properties, automatically
  updatable views, materialized views, triggers, foreign keys, and stored procedures.

* [TypeORM](https://typeorm.io) is an ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React
  Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7,
  ES8).
  Its goal is to always support the latest JavaScript features and provide additional features that help you to develop
  any kind of application that uses databases - from small applications with a few tables to large scale enterprise
  applications with multiple databases.

* [Swagger](https://swagger.io) is a suite of tools for API developers from SmartBear Software and a former
  specification upon which the OpenAPI Specification is based.

* [MinIO](https://min.io) is a high-performance, S3 compatible object store. It is built for
  large scale AI/ML, data lake and database workloads. It runs on-prem and
  on any cloud (public or private) and from the data center to the edge. MinIO
  is software-defined and open source under GNU AGPL v3.

* [Socket.IO](https://socket.io) is an event-driven library for real-time web applications.
  It enables real-time, bidirectional communication between web clients and servers

## Author

* [Marco Thümmler](https://github.com/marcothuemmler)

## License

This project is available for user under the [MIT license](LICENSE)
