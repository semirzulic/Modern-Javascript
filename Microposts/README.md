# Babel Webpack Starter

A starter pack to build JavaScript applications using standards from ES2015, ES2016 & ES2017. It uses webpack, Babel and webpack-dev-server to compile and serve. It is fully compatible with Async/Await as it uses the Babel polyfill.

### Version
1.1.0

## Usage

### Installation

Install the dependencies

```sh
$ npm install
```

### Serve
To serve in the browser  - Runs webpack-dev-server

```sh
$ npm start
```

### Build
Compile and build

```sh
$ npm run build
```

### Install JSON Server

npm install -g json-server

Create a db.json file with some data

{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}

Start JSON Server

json-server --watch db.json

Now if you go to http://localhost:3000/posts/1, you'll get

{ "id": 1, "title": "json-server", "author": "typicode" }