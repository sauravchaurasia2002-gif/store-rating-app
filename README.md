Store Rating Application
(About the Project)

The application allows users to view stores and submit ratings, while store owners can view ratings for their stores and administrators can manage users and stores.

The project is built using ReactJS for the frontend, Node.js and ExpressJS for the backend, and MySQL as the database.

###Features
Admin
1. Login using secure authentication
2. Add new users
3. Add new stores
4. View all users
5. View all stores
6. Search users and stores
7. View user details
8. See total users, stores, and ratings on the dashboard

Store Owner
1. Login to owner dashboard
2. View store information
3. View average rating of the store
4. View users who rated the store
5. Change password

User
1. Register and login
2. View all available stores
3. Search stores by name or address
4. Submit ratings
5. Update previously submitted ratings
6. Change password


### Working Flow

#### User Flow

1. A new user can register using the registration page.
2. After successful login, the user is redirected to the dashboard.
3. The user can browse all available stores.
4. The user can search stores by name or address.
5. The user can submit a rating between 1 and 5.
6. The user can update an existing rating at any time.
7. The user can change their password.

#### Admin Flow

1. Admin logs into the system using secure authentication.
2. Admin can add new users with different roles (Admin, User, Store Owner).
3. Admin can add new stores.
4. Admin can view all users and stores.
5. Admin can search and sort users and stores.
6. Admin dashboard displays total users, stores, and ratings.

#### Store Owner Flow

1. Store owner logs into the owner dashboard.
2. Store owner can view store details.
3. Store owner can view the average rating of the assigned store.
4. Store owner can see all users who rated the store.
5. Store owner can change their password.

#### Rating Flow

1. Ratings are stored in the MySQL database.
2. Each user can submit one rating per store.
3. Existing ratings can be modified.
4. Average ratings are calculated dynamically and displayed across the application.


###Technologies Used
Frontend
1. ReactJS
2. React Router DOM
3. Axios

Backend
1. Node.js
2. ExpressJS
3. JWT Authentication
4. bcrypt

Database
1. MySQL


### Application Architecture

Frontend (ReactJS)
↓
Axios API Calls
↓
Backend (Node.js + ExpressJS)
↓
MySQL Database

Security:

* JWT Authentication
* bcrypt Password Hashing
* Role-Based Access Control


###Project Structure

store-rating-app

├── backend

├── frontend

├── database.sql

└── README.md

###Database Setup
1. Open MySQL Workbench.
2. Create a database named: store_rating_db
3. Open the database.sql file.
4. Execute the SQL script.
5. All required tables and sample data will be created automatically.


###Backend Setup

Open terminal and go to backend folder:
1. cd backend
2. npm install
3. npm start

Backend runs on: http://localhost:5000


###Frontend Setup

Open another terminal and go to frontend folder:
1. cd frontend
2. npm install
3. npm run dev

Frontend runs on: http://localhost:5173


###Test Accounts
Admin
1. Email: admin@test.com
2. Password: admin123

Store Owner
1. Email: owner@test.com
2. Password: owner123

User
1. Email: sam@example.com
2. Password: user123

###Notes
1. Passwords are stored in encrypted format using bcrypt.
2. Authentication is implemented using JWT tokens.
3. Users can update their ratings after submission.
4. Store owners can view ratings given by users.
5. Admin can manage users and stores from the dashboard.


###Author
Saurav Kumar

