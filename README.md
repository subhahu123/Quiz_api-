# express4.17.1-in-docker
EXPRESS 4.17 SPA

IMPORTANT NOTES:

    1. Make sure you follow the steps mentioned under "PROJECT START STEPS" and ensure that the steps execute successfully. 
    2. Make sure you follow the steps mentioned under "DOCKER START STEPS" and ensure that the steps execute successfully. 

PROJECT START STEPS:

    Pre-requisites:
    1. Install node, npm
    2. Install express (npm install express --save)

    Steps:
    1. To run this application, do the following:
        1.a. Go to the project root directory.
        1.b. Run the following commands respectively in the terminal/command line to build and run the app:
            - npm install
            - npm start
    
    2. Go to http://localhost:8080 in your browser to view it.


DOCKER START STEPS:

    Pre-requisites:
    1. Docker is installed (http://console.codejudge.io/setup)

    Steps:
    1. Build the docker image:
        1.a. Go to the project root directory.
        1.b. Run the following command(s) in the terminal/command line:
            - docker build -t express4.17-in-docker .

    2. Run the image in a container (Make sure port 8080 is available):        
        2.a. Run the following command(s) in the terminal/command line:
            - docker run -i -p 8080:8080 express4.17-in-docker
        2.b. Check the logs for any errors. 

    3. Go to http://localhost:8080 in your browser to view it.

DOCKER STOP STEPS:

    Steps:
    1. Run the following commands:
        - docker ps
    2. Copy the container id and run the below command:
        - docker stop <container_id> 
        - docker system prune

DOCKER LOGS:

    Steps:
    1. Run the following commans(s):
        - docker ps
    2. Copy the container id and run the below command:
        - docker logs <container_id>

DOCKER REMOVE CONTAINER:

    Steps:
    1. Run the following command(s):
        - docker ps
    2. Copy the container id and run the below command:
        - docker rm <container_id>
        - docker system prune

DOCKER REMOVE IMAGE:

    Steps:
    1. Run the following command(s):
        - docker ps
    2. Copy the image id and run the below command:
        - docker rmi <image_id>
        - docker system prune
