# APP
`Movie` is a NodeJS application that will serve as a middleware between the front end and NoSQL database.
The goal of the app is to add, delete, edit and list movies from a NoSQL database.

## INSTALLATION
```
1. git clone https://github.com/rames-bud/movie.git
2. cd movie
3. npm install
4. npm start
```
### DEPENDENCIES:

- MONGODB
  - MONGODB should be running locally with the URI mongodb://127.0.0.1:27017/movieApp
- Angular UI
  - Angular app should be running locally

## REQUEST & RESPONSE EXAMPLES

### API RESOURCES:

- [POST /addMovie](#post-addMovie)
- [GET /getMovie/all](#get-getMovie/all)
- [PUT /editMovie/{movieId}](#put-editMovie/{movieId})
- [POST /deleteMovie/{movieId}](#delete-/{movieId})
- [GET /getMovie/{movieId}](#get-status)

AVAILABLE ENDPOINTS:
- **local:** http://localhost:3000/addMovie

### POST /addMovie

Query to add a new movie in the database

Request body:
```
{
  "movieName": "Aqua Man",
  "rating": "6.8",
  "releaseDate": "2018-11-21",
  "directors": [
      "Travis Knight"
  ]
}
```
Response body:
```
{
  "error": false,
  "message": "Movie added successfully",
  "status": 200,
  "data": {
      "movieId": "2BYzzgDiX",
      "movieName": "Aqua Man",
      "rating": "6.8",
      "releaseDate": "2018-11-21T00:00:00.000Z",
      "directors": [
          "Travis Knight"
      ],
      "createdOn": "2019-04-13T17:17:26.597Z",
      "_id": "5cb219a7c24d067e867211d9",
      "__v": 0
  }
}
```

### POST /deleteMovie/{movieId}

Example: Browser call to show version information

Request body:
```
'movieId' passed in url is used for deletion
```
Response body:
```
{
  "error": false,
  "message": "Movie deleted successfully",
  "status": 200,
  "data": {
      "n": 1,
      "ok": 1,
      "deletedCount": 1
  }
}
```

### PUT /editMovie/{movieId}

Query to edit content of an existing movie

Request body:
```
{
  "movieName": "Aqua Man updated",
  "rating": "1.0",
  "releaseDate": "2018-11-21",
  "directors": [ "director updated"]
}
```
Response body:
```
{
  "error": false,
  "message": "Movie successfully updated",
  "status": 200,
  "data": {
      "n": 1,
      "nModified": 1,
      "ok": 1
  }
}
```

### GET /getMovie/{movieId}

Query to get a particular movie's details

Request body:
```
'movieId' passed in the url
```
Response body:
```
{
  "error": false,
  "message": "Movie details Found",
  "status": 200,
  "data": [
      {
          "movieName": "Aqua Man",
          "rating": "6.8",
          "releaseDate": "2018-11-21T00:00:00.000Z",
          "directors": [
              "Travis Knight"
          ],
          "createdOn": "2019-04-13T17:17:26.597Z"
      }
  ]
}
```

### GET /getMovie/all

Query to list all the movies that exist in the databse

Request body:
```
GET REQUEST
```
Response body:
```
{
  "error": false,
  "message": "Movies found",
  "status": 200,
  "data": [
    {
      "movieId": "PfwkjF6tz",
      "movieName": "Aqua Man",
      "rating": "6.8",
      "releaseDate": "2018-11-21T00:00:00.000Z",
      "directors": [
          "Travis Knight"
      ],
      "createdOn": "2019-04-12T19:49:57.518Z"
    },
    {
      "movieId": "XmFf79_v3",
      "movieName": "Destroyer",
      "rating": "6",
      "releaseDate": "2018-11-25T00:00:00.000Z",
      "directors": [
          "Karyn Kusama"
      ],
      "createdOn": "2019-04-12T19:58:23.615Z"
    },
    {
      "movieId": "QgXmjl7qG",
      "movieName": "Shazam!",
      "rating": "7.4",
      "releaseDate": "2019-03-23T00:00:00.000Z",
      "directors": [
          "David Sandberg"
      ],
      "createdOn": "2019-04-12T20:03:36.890Z"
    }
  ]
}
```

### Contributing developers
* Ramesh Upadhyaya (ramesupadhyaya@gmail.com)

## License
2019 MIT License
