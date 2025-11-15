require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();

const HOSTNAME = process.env.HOSTNAME;

const doc = {
  info: {
    title: 'Tasklist API project for CSE 341',
    description: 'Project 02 for CSE 341. This is a tasklist in API form.'
  }
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc).then(() => {
  require('./server.js'); // Your project's root file
});