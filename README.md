**School-wise Student Login Limit System**
**Overview**

This project implements a backend system to enforce daily login limits per school for students. Each school can configure how many unique student logins are allowed per day (in IST timezone).

The backend is built with Node.js, Express.js, and MySQL (using Sequelize ORM). It uses bcrypt for password hashing and returns a mock JWT token on successful login.
Environment Variables

**Create a .env file in the root of your project and add the following variables:**

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=       # Your MySQL password, leave empty if none
DB_NAME=school_login
DB_PORT=3306
PORT=3000          # Port your Express server will listen on

**Prerequisites**

    Node.js v18+

    MySQL v8+

    npm or yarn

**Setup Instructions**

    Clone the repository

git clone https://github.com/MohdSajid12/student_login_with_mysql.git
cd school-login-limit

Install dependencies

npm install

Create the database

**Login to MySQL and run:

CREATE DATABASE school_login;**

Run migrations / create tables

You can use Sequelize CLI or manually run the SQL scripts:

CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  daily_login_limit INT NOT NULL
);

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  school_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  FOREIGN KEY (school_id) REFERENCES schools(id)
);

CREATE TABLE student_logins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  login_time DATETIME NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id),
  INDEX(login_time)
);

**Configure .env file**

Make sure the .env file has correct MySQL connection info (see above).

Start the server

    npm start

    Server will start at http://localhost:3000 (or the port you configured).

API Usage
**POST /api/auth/student-login**

**Authenticate a student login and enforce the school daily login limit.**

Request Body:

{
  "email": "student@example.com",
  "password": "123456"
}

Responses:

    200 OK

{
  "message": "Login successful",
  "token": "OK"
}

403 Forbidden

{
  "message": "Daily login limit reached for your school. Try again tomorrow."
}

401 Unauthorized

{
  "message": "Invalid credentials"
}

404 Not Found

{
  "message": "Student not found"
}

500 Internal Server Error

    {
      "message": "Internal server error",
      "error": "Error message here"
    }

Notes

    Timezone for all date calculations is set to Asia/Kolkata (IST).

    Passwords are hashed using bcrypt.

    Login limit is enforced per school based on unique student logins per day.

    Transaction and row locking are used to prevent race conditions.
