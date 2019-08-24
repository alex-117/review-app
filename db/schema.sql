-- Schema --

-- Drop the db if it exists
DROP DATABASE IF EXISTS review_db;
-- Create db
CREATE DATABASE review_db;
-- Tell app/db which exact db to use
USE review_db;

-- Tables --

-- User Table
CREATE TABLE user (
  id int AUTO_INCREMENT NOT NULL,
  first_name varchar (100) NOT NULL,
  last_name varchar (100) NOT NULL,
  email varchar (100) NOT NULL UNIQUE,
  password varchar (255) NOT NULL,
  PRIMARY KEY (id)
);

-- Todos Table
CREATE TABLE todos (
  id int AUTO_INCREMENT NOT NULL,
  todo varchar (255) NOT NULL,
  completed BOOLEAN DEFAULT false,
  user_id int,
  PRIMARY KEY (id)
);

-- JWT Blacklist Table
CREATE TABLE jwt_blacklist (
  id int AUTO_INCREMENT NOT NULL,
  token varchar (255) NOT NULL,
  PRIMARY KEY (id)
);

