# Medium

A sample project for basic REST API for medium.com like website

## Application Modules
* User
  * Registration/Signup
  * Login
  * Profile
  * Upload profile picture
  * Delete
  * Follow/Unfollow user
  * Following list
* Publication
  * Create publication
  * Update publication
  * Delete publication
  * Get publication by publication id
  * Get publication by user
  * Add/Remove Writer
  * Add/Remove Categoty 
* Story
  * Create stroy
  * Upload story
  * Get single story by storyid
  * Get user specific stories
  * Get stories using publicationid

## Project structure

* /config - Project configuration files
* /routes - Route files for project
* /middlewares - Middlewares used in project
* /models - Model files in project
* /Controllers - Controller files for project
* README.md - This file
* server.js - Starting point of project
* package.json - Package/dependency's information




## Quickstart

Clone the repo in your local machine

```bash
git clone https://github.com/surajkochale20/medium.git
cd medium
```

Install all dependencies

```bash
npm install
```
Start the server using following command

```bash
npm start
```

## Test

After succesfully running code on your local machine, you can test API using swagger

http://localhost:3000/api-docs/






## Author

Suraj kochale