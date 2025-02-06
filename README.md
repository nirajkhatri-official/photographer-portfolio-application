# Photographer Portfolio Appplication

## Overview
This project consist of a **React Frontend** and **Nodejs Backend**.This README provides instructions on setting up the repository, installing dependencies, and running the project locally.

## Prerequisites
Ensure you have the following installed:
- **Node.js** (Latest LTS version) & **npm** or **yarn**
- **Postgres Database** 

## Setup Instructions

### 1. Clone the Repository
```sh
git clone <repo-url>
cd <repo-folder>
```
## Setting Up the Backend (Node.js)

Navigate to the server directory:

- Run yarn (to install required dependencies)

## For testing mail
 - Create a account for testing purpose on https://mailtrap.io/
 - Once you logged in inside you will find smpt server credentials for testing purpose which should be placed in env file MAIL_ placeholders.

### Create a .env file in the backend/ directory and configure environment variables:
```sh
PORT=9001 (or use any port you want to run your server on)
DB_USER= database username
DB_PASSWORD= database user password
DB_HOST= database host
DATABASE= database name (create database before running the project)
DB_PORT= database port
ACCESS_TOKEN_SECRET="access-token" (access token secret)
REFRESH_TOKEN_SECRET="refresh-token" (refresh token secret)
FRONT_END_URL="http://localhost:5173" (you can modify this if your frontend is running on different address)
MAIL_HOST="sandbox.smtp.xxxxx.io" (your mail smtp host)
MAIL_PORT=587 (your mail smtp port)
MAIL_USERNAME="xxxx" (your mail smtp username)
MAIL_PASSWORD="xxxxx" (your mail smtp password)
MAIL_FROM_EMAIL="xxxxxxx@gmail.com" (your from mail)
```
## Finally to run the backend
  ```sh
  yarn dev
  ```

### Setting Up the Frontend (React)

Navigate to client folder

### Create a .env file in the server/ directory and configure environment variables:

```sh
VITE_API_BASE_URL="http://localhost:9001/api/" (this should be your server domain/port)

VITE_BACKEND_URL="http://localhost:9001/" (this should be your server domain/port)

NOTE : we need both urls to run the project
```

- type the following command on terminal
```sh
yarn
```
- after all dependencies are installed run to start the project 
```sh 
yarn dev
```

With this the project should be up and running.Please react out to me on nirajkhatri.official@gmail.com . if you have any making the project up and running