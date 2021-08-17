# FinlexEmsApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli)

# Functionality overview

The EMS application is a front-end CRUD project. It uses APIs for all the requests. It can viewed at http://familiar-arithmetic.surge.sh/

## General functionality:

- View list of employees.
- Create a new employee.
- View details of an employee.
- Delete a record of an employee.
- Update a record of an employee.

# Running Project

The project can be run as:

- NodeJS application
- Docker container.

## Running the Application with docker

Run the below command to built the docker image.

`docker build -t tabish/angular-app .`

The -t flag tags our image, the . at the end of the docker build command tells that Docker should look for the Dockerfile in the current directory.

Docker file can be found at the root of the project.

Run the below command to run the image created from the above command as a docker container.

`docker run -d --name frontend -p 8080:80 tabish/angular-app`

The -d and -p flags? running the new container in “detached” mode (in the background) and creating a mapping between the host’s port 8080 to the container’s port 80. Without the port mapping, the application wouldn’t be accessible. Application can be accessed at http://localhost:4200.

## Running the Application with Node.js

1- Install the latest LTS version of Node.js from https://nodejs.org.

2- Run `npm install` to install app dependencies.

3- Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

4- Run `npm start` in a separate terminal window to launch the web and RESTful API server.

5- Go to http://localhost:4200 in your browser.

# Run Tests

Unit tests are present along with the component files with the extesion spec.ts.

E2E testing can be performed by running the below command

`cypress run ` or `npx cypress run`

# Automatic deployement of app to Surge using CircleCI

 Do some changes and push it to the github repository, CircleCi will be notified and start build process starting from checkout, test and build. If every thing success it will deploy the app to Surge.

 Configuration file is present inside the .cicleci folder.

# Project Structure

Tree Structure
--------------

This tree represents the directories this repository proposes to be added.

```
  .
  ├── cypress
  └── src
      ├── app
      │   ├── employee-list
      │   ├── employee-form
      │   ├── models
      │   ├── services
      └── mocks
```

- MDBootstrap library is used for UI components.
- Services are used for http communcation with the server.
- Components are used to build the required functionalities.
- Modular structure has been used as per the style guide of angular.

