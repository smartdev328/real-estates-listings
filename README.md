# Frontend


### How to run project
Install packages

```
cd client
npm install
```

To run project in development mode. The frontend app will run at http://127.0.0.1:5173 

```
npm run dev

```

To run project in production mode

```
npm run build & npm run serve

```



### Pages
This frontend app has 3 pages
#### Homepage
- The homepage has Header, listings table, filters component, SortBy component, and Pagination.
- Header component will show "Login" button if user is not logged in. If user is logged in, it will show user's email and role. 
```
* There are two roles in this app. One is USER and the another is ADMIN. Only ADMIN user can edit/delete listings. USER/ADMIN users can add/remove listings to/from their favorites list.  
```
- Filters can filter listings by keyword, min/max price, min/max beds count, and min/max baths count.
- SortBy can sort listings by ID, Price, Beds, and Baths fields.
- Every page has 10 listings. 

#### LOGIN page

#### SIGNUP page
On this page, new user with "USER" role will be created




# Backend

### How to run project

1) Open .env file and confirm if all DB variables and JWT secret key are correct.

2) Install packages

```
cd server
npm install
```

3) Database migration 

- Run migration command to create tables
```
npm run migrate
```

4) Import CSV data

- Check if `data.csv` file is in the server folder.
- Import CSV data
```
npm run import-csv
```

5) Run backend server

To run project in development mode. The backend app will run at http://localhost:4000 

```
npm run dev

```

### Project Description

This app uses 
 - `winston` for logging errors
 - `JWT` and `Passport.js` for authentication
 - `TypeORM` and `Postgres` for database management

### Project Struture

- "log/" folder has `access.log` and `error.log` files. It will log all API request history and errors list. 

- "src/middleware/validation" folder has validators for auth API, listings API, and favorites API.

- "src/scripts/importData.ts" has a code to import CSV data from `data.csv` file to PostgreSQL table.

- "src/migrations" folder has migrations to create `users`, `listings`, and `favoriteListings` tables.

- "src/entities" folder has database models.

- "src/controllers" folder has controllers for models.

- "src/database" folder has database configuration.

