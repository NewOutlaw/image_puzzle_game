## Image Puzzle Game
This project is based on some little keyring game I had as a kid.
I was only able to move one tile at a time to produce certain patters with colors.
So I had the idea to take it as some CSS-practice a view years ago. 
Now I opened it one more time and decided to prepare it for being public.
Be patient with my codestyle. Back then I tried a few things... 

### starting container
docker compose --env-file ./envs/.env.local up

### ENV File
The env file is used for all the starting variables and other vars for behaviour.
I use it as some kind of .conf file for the project with all the global variables my project would use.
Advantage is I can create different containers with different variables by only adding a new .env file to /envs and start the container with its path in --env-file param.

This weird way of giving the .env.file to the container works as follows:
#### --env-file in docker compose command to start container
It has to be specified in this command, that the docker-compose.yml file can read its env vars for building the container.
#### docker-compose.yml env_file
Here the path to the file must be specified that certain variables could be read from within the project
#### .env.file ENV_FILE_PATH-Variable
For better use, docker-compose.yml takes the path from the .env.file out of the .env.file.
This way docker-compose.yml stays untouched (git) for different container purposes as local, test and prod which are specified as own .env.local .env.test .env.prod files


## Test it
https://shiftpuzzle.brophet.de

Click of shuffle to, you know, shuffle...
(It shuffles like this, because I found out complete random tileplacements for shuffling would often not be solvable, but I cant proof this)
Play with ArrowKeys or by swipe on smartphone.
There is no "win detection".