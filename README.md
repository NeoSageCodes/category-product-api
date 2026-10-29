# Category and Product API

A simple backend application built with Node.js, Express.js, and Sequelize ORM, using MySQL. It manages two related models, `Category` and `Product`, with full CRUD operations and a one-to-many relationship: one category has many products, and each product belongs to one category. Related data is retrieved with Sequelize eager loading (`include`).

## Tech Stack

- Node.js
- Express.js
- Sequelize ORM and Sequelize CLI
- MySQL (`mysql2` driver)
- Nodemon (development)

## Prerequisites

- Node.js installed
- MySQL server running locally
- Postman (or any API client) for testing

## Installation

1. Clone the repository:

   ```
   git clone <your-repo-url>
   cd <your-project-folder>
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Configure the database connection in `config/config.json` (the `development` block):

   ```json
   "development": {
     "username": "root",
     "password": "your_mysql_password",
     "database": "primestoredb",
     "host": "127.0.0.1",
     "dialect": "mysql"
   }
   ```

   Also make sure the credentials in `database/database.js` match.

4. Create the database:

   ```
   npx sequelize-cli db:create
   ```

5. Run the migrations to build the tables:

   ```
   npx sequelize-cli db:migrate
   ```

## Running the Application

Development (auto-restarts on file changes):

```
npx nodemon server.js
```

Normal start:

```
node server.js
```

The server runs on `http://localhost:1000`. On startup, the terminal should show that the database connection was established successfully.

## Project Structure

```
├── config/          Database configuration (config.json)
├── controllers/     Request-handling logic (category.js, product.js)
├── database/        Sequelize connection used by server.js
├── migrations/      Table definitions (Categories, Products)
├── models/          Sequelize models and associations
├── routes/          Route definitions (category.js, product.js)
└── server.js        App entry point
```

## Database Design

| Table | Columns |
|---|---|
| Categories | id (UUID), name (unique), createdAt, updatedAt |
| Products | id (UUID), name (unique), price, categoryId (foreign key to Categories.id), createdAt, updatedAt |

Relationship: `Category.hasMany(Product)` and `Product.belongsTo(Category)`. Deleting a category also deletes its products (`CASCADE`).

## API Endpoints

Send JSON bodies with the `Content-Type: application/json` header.

### Categories

| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/addCategory` | `{ "name": "Electronics" }` | Create a category |
| GET | `/allCategories` | none | Get all categories |
| GET | `/oneCategory/:id` | none | Get one category with its products |
| PUT | `/updateCategory/:filterName` | `{ "name": "New name" }` | Update a category found by its current name |
| DELETE | `/deleteCategory/:id` | none | Delete a category |

### Products

| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/addProduct` | `{ "name": "Laptop", "price": 1200, "categoryName": "Electronics" }` | Create a product in an existing category |
| GET | `/allProducts` | none | Get all products |
| GET | `/oneProduct/:id` | none | Get one product with its category |
| PUT | `/updateProduct/:filterName` | `{ "name": "Gaming Laptop", "price": 1500 }` | Update a product found by its current name |
| DELETE | `/deleteProduct/:id` | none | Delete a product |

## Useful Commands

| Command | Purpose |
|---|---|
| `npx sequelize-cli db:migrate` | Build the tables |
| `npx sequelize-cli db:migrate:undo:all` | Remove all tables (reset) |

### Author
**Chigoziem Ogbonnaya** - **NeoSageCodes**