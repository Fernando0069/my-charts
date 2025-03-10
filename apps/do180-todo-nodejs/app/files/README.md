# DO276 JavaScript/Node.js To Do List App

Based on Restify 11.1 and Sequelize 6.32. Tested on Node.js 20 in OpenShift using the UBI 9 base image with MySQL 3.6.

Run npm install to install dependencies (if not using OpenShift automatic dependency installation).

The application is automatically started in OpenShift. If running locally, use npm start.
Run as `node app.js`.

* Don't do pagination yet.

* Database connection parameters hardcoded (as a novice developer would usually do).

* There is a lot of boiler plate code in the controller and the model. There should be a way to have more centralized error handling.

* Access app as http://localhost:30080/todo
