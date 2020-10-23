# Bookmark API

This is a bookmark api used for the Thinkful Software Engineering Immersion Program Bookmarks App Project!

## Documentation

This api can handle GET, POST, and DELETE requests.

It stores data into an array of bookmarks that refreshes with the server.

To access all bookmarks stored in data, or to POST a new bookmark, use the following endpoint:

http://localhost:8000/bookmarks

The API will require a Bearer Token which you can set on your personal machine. 

POST requests should be formatted in json with the expected data formatted as follows:

{  
    "title" : "required string of at least 1 character",   
    "url" : "required string of at least 5 characters which includes an http protocol",   
    "desc" : "optional, but if included, must be a string of at least 1 character",  
    "rating" : "optional, but if included, must be a number between 1 and 5"   
}   

It will then return a json object with the above properties as well as a uniquely generated id for the bookmark which can be used to access the individual bookmark in GET and DELETE requests as follows:

endpoint -> http://localhost:8000/bookmarks/{id-goes-here}


## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.
