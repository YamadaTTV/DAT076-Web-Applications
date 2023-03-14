# DAT076 Web Applications
 Repo for the course DAT076 Web Applications

# How to run/install the application
To run this application:

1. User has to clone this github-repo.

2. Enter the folder: ./client and then execute the comman "npm run build" in a terminal. 

3. Enter the folder: ./server and then execute the command “npm run dev” in a terminal.
This will start a server on “localhost:8080”. 

4. To access the web application the user then needs to open their browser and open the web-page “localhost:8080”.

# How the map structure works
The application is structured using two main folders, the client and the server.

/Client - Contains all the frontend code and respective tests.

/Client/src/ - Contains the app.tsx and index.tsx. Also contains the .css files.

/Client/src/components - Contains all components used in the application.

/Client/src/components/componentTests - Contains all test suites for the components.

/Client/src/pages - Contains all pages used in the application.

/Client/src/pages/pagesTests - Contains all test suites for the pages.


/Server - Contains all the backend code and respective tests.

/Server/src/ - Contains model, router and service folder. Also contains the requestTypes interface.

/Server/test/ - Contains the backend tests.

/Server/src/model - Contains all entities for the models.

/Server/src/router - Contains all entities for the routers.

/Server/src/service - Contains all entities for the services.



