

## Environment setup

you need 2 modes for this project : development mode, production mode.<br />
Development mode is the environment that you will only use while you are developing.<br />
Production mode is the environment that you will use after you deploy you project.<br />

For example, you only use `localhost` when you develop in you local machine but you will not use localhost anymore after you deploy.<br />

This document is about how you run your project in 2 different modes

### `npm install json-server --save-dev`
You will use 'json-server' to run your server, but you dont need that json-server for production mode (because we will use 
https://my-json-server.typicode.com/ this server for production mode).
So you need to download json-server only for development mode. 

run this in your terminal
```
npm install json-server --save-dev
```

After that, you will get `"devDependencies` in you package.json file
```
"devDependencies": {
    "dotenv": "^8.2.0",
    "json-server": "^0.16.1"
  }
```

### `npm run dev`
You can make your own scripts in package.json. Inside of script, add this line
```
 "dev": "json-server --watch db.json -p 3001 && start react-scripts start",
```
It means, when you use `npm run dev`, it will run the json-server first and then it will run the app. 

### `.env`

You need .env file, and inside of .env file you will have `REACT_APP_BACKEND_SERVER_URL` which has the value of your server URL so if you run in you local machine, the value will be `http://localhost:3001`. But if you run in production mode, you should change the value to `https://my-json-server.typicode.com/user/repo`

When you push your source code. Don't push your .env file. (add .env into .gitignore)

### Set environment value at your Netlify

**This is after you push your source code to github and deploy to Netlify**
1. Get into the Build & deploy menu
![](https://imgur.com/CTMw2d8.png)

2. Add Environment value here. the variable name mush be same with the one you use in you local machine. 
   But the value will be different. put the my-json server url as a value
![](https://imgur.com/liosOM9.png)
