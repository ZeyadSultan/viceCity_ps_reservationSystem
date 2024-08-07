# viceCity_ps_reservationSystem

## Switch between development and production

### To switch between development and production

1. Change the value of the `NODE_ENV` variable in the `.env` file located at the root to either `development` or `production`.

1. Change the value of the `spring.profiles.active` variable in the `application.properties` located at `/backend/src/main/resources` file to either `dev` for development or `docker` for production.

## Deployment

- Make sure that you followed steps to switch between development and production mentioned above.
- Navigate to the backend directory
- Run the following command to build the backend:

  ```bash
  ./mvnw clean
  ./mvnw package
  ```

- Run the dev server:

  ```bash
  ./mvnw spring-boot:run
  ```

- Navigate to the frontend directory and run the following command to build the frontend:

  ```bash
  npm run orval
  ```

- Exit fromt he dev server
- Make sure [docker desktop](https://docs.docker.com/desktop/install/windows-install/) is installed on your machine and runs correctly.
- Open a terminal and navigate to the root of the project.
- Run the following command to build the docker image:
  ```bash
  docker-compose build
  ```
- Run the following command to start the docker container:
  ```bash
  docker-compose up
  ```
  **IMPORTANT**: If you are running the containers for the first time, wait for the database to be initialized before accessing the application. Then exit using `CTRL+C` and run the command again.
- Open a browser and navigate to `http://localhost:3000` to access the application.
