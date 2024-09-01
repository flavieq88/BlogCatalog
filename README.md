# BlogCatalog

Visit the site at https://blogcatalog.onrender.com/!

## Description

BlogCatalog is a full-stack application where users can share, like and comment on blog posts! <br>

The frontend was built with React, Redux, React Router and HTML/CSS. <br>
I used NodeJS and Express for the backend and REST API. <br>
MongoDB was used for the database and the app was deployed on Render.

## Local installation

To run the application locally, clone this repo: <br>
`git clone https://github.com/flavieq88/BlogCatalog.git`

Then, navigate to the backend and install dependencies: <br>

```
cd blogcatalog/backend
npm install
```

Create a `.env` file in the `backend` directory. You will need a valid MongoDB URI to connect to (I used MongoDB Atlas). Here are the contents of the `.env` file:

```
MONGODB_URI="your mongoDB uri"
PORT=3003
SECRET="some string" //secret key required for the jwt token
```

Finally, you can run the application: <br>
`npm start`

Now you can access the application at `http://localhost:3003/`!
