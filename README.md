# Bookmark API

This is a bookmark api used for the Thinkful Software Engineering Immersion Program Bookmarks App Project!

## Set up

Complete the following steps to start the api:

1. Clone this repository to your local machine `git clone https://github.com/alannabouloy/bookmark-api NEW-FILE-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-FILE-NAME instead of `"name": "bookmark-server",`
7. Make sure to add an API_TOKEN to your .env file

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.