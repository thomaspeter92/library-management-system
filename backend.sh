#!/bin/bash

# Navigate to the backend folder
cd backend || exit

# Start TypeScript in watch mode and Nodemon
npx tsc --watch & npx nodemon dist/main.js


