Store Rating Application
About the Project

The application allows users to view stores and submit ratings, while store owners can view ratings for their stores and administrators can manage users and stores.

The project is built using ReactJS for the frontend, Node.js and ExpressJS for the backend, and MySQL as the database.

###Features
Admin
-Login using secure authentication
-Add new users
-Add new stores
-View all users
-View all stores
-Search users and stores
-View user details
-See total users, stores, and ratings on the dashboard

Store Owner
-Login to owner dashboard
-View store information
-View average rating of the store
-View users who rated the store
-Change password

User
-Register and login
-View all available stores
-Search stores by name or address
-Submit ratings
-Update previously submitted ratings
-Change password


###Technologies Used
Frontend
-ReactJS
-React Router DOM
-Axios

Backend
-Node.js
-ExpressJS
-JWT Authentication
-bcrypt

Database
-MySQL


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

cd backend
npm install
npm start

Backend runs on: http://localhost:5000


###Frontend Setup

Open another terminal and go to frontend folder:

cd frontend
npm install
npm run dev

Frontend runs on: http://localhost:5173


###Test Accounts
Admin

Email: admin@test.com
Password: admin123

Store Owner

Email: owner@test.com
Password: owner123

User

Email: sam@example.com
Password: user123

###Notes
-Passwords are stored in encrypted format using bcrypt.
-Authentication is implemented using JWT tokens.
-Users can update their ratings after submission.
-Store owners can view ratings given by users.
-Admin can manage users and stores from the dashboard.


###Author
Saurav Kumar

