# Backend Challange - Venturus

# Description

Create the CRUD endpoints to the bellow entity:

**Equipment**

```javascript
{
    model: string,
    category: enum ("cartucho" | "toner"),
    ppm: integer (0 to 999999),
    wifi: boolean,
    consumption: number (0 to 999999)
}
```

**Required**: model, category


The test should be done using:

- Database: sqlite3
- Back-end: Node.js
- Source code in english

</br>


## Infrastructure

- NestJs backend using Typescript
- Jest as the testing framework

Test files:

- files `.spec.ts` - unit tests
- files `.e2e-spec.ts` - end to end tests

### Setup

1. clone the git repository
1. run `npm install`
1. run `npm start` to start the aplication


### To run the tests

1. open the terminal and run the command of the chosen test type

- `npm run test` - to run all tests
- `npm run test:unit` - unit tests
- `npm run test:e2e`  - end to end tests

## Functionalities

1. [Create Equipment](docs/equipment-create.md)
1. [List Equipments](docs/equipment-update.md)
1. [Uptade Equipment](docs/equipment-list.md)
1. [Delete Equipment](docs/equipment-update.md)

## Architecture

Ive used clean architecture with concepts of "Domain Driven Design", separating the aplication by components (modules), following NestJS standards.

- The services (usecases) contains the business rules of the application.
- The dependency inversion principle is aplied and depencency happens from the outer layers to the inner layers.
