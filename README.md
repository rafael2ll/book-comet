# Book Comet API
## Description
REST API for Book Commet Application, a book store.

## Project Development Stack
- [__`Typescript`__](https://www.typescriptlang.org/): the development language used.
- [__`NodeJS`__](https://nodejs.org/dist/latest-v16.x/docs/api/synopsis.html): Javacript Execution Environment
- [__`Express`__](https://expressjs.com/): NodeJS framework for working with REST APIs
- [__`MongoDB`__](https://www.mongodb.com/): Document Non-Relational Database
- [__`Mongoose`__](https://mongoosejs.com/): High Level Javacript Adapter for MongoDB
- [__`Jest`__](https://jestjs.io): Testing tool
## Folder Organization
```bash
├── src
│   ├── api
│   │   └── *.ts
│   ├── core
│   |   └── errors
│   ├── db
│   |   ├── schema
│   |   │   └── *.ts
│   |   └── db.ts
│   └── usecase
│       └── **/*.ts
├── tests
│   ├── core
│   │    ├── usecase
│   │        └── */**.ts
│   └── testcase
│       └── */**.ts
└── README.md
```
### Source Organization
The project root source foler were organized in main domains: `api`, `core`, `db` and `usecase`.
- __`api`__: folder that contains the express api routers for each entity of project. Each file from this folder holds the HTTP verbs for each entity and maps them to their `usecase`.
- __`core`__: folder that contains project shared resources like pagination, errors and middlewares
- __`db`__: folder that contains data persistence code. This folder holds the data `schemas`, `representations`, and `repositories` (models).
- __`usecase`__: folder that holder the business logic of the project. Each use case performs a meaninful and only a unique action.


### Test Folder Organization
The tests folder was organized in three main structures:
- __`core`__: folder the holds shared functions like `usecases` and _database setup_
- __`core/usecase`: reusable `usecases` which can be used to construct `test cases`
- __`testcase`__: tests instances


## Running the Project
To install project dependencies, run:
```bash
npm i
```
To start server run:
```bash
npm run start
```
To run tests:
```bash
npm test
```