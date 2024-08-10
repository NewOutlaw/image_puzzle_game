## Image Puzzle Game
This project is based on some little keyring game I had as a kid.
I was only able to move one tile at a time to produce certain patters with colors.
So I had the idea to take it as some CSS-practice a view years ago. 
Now I opened it one more time and decided to prepare it for being public.
Be patient with my codestyle. Back then I tried a few things... 

### starting container
docker compose --env-file ./envs/.env.local up

### ENV File
The env file is used for  all the starting variables and other vars for behaviour.
I use it as some kind of .conf file for the project With all the global variables my project would use.

This weird way of giving the .env.file to the container works as follows:
#### docker compose command:
    It has to be specified in this command, that the docker-compose.yaml file can read the env vars for building the container
#### docker-compose.yaml env_file
    Here the path to the file must be specified that certain variables could be read from within the project
#### .env.file ENV_FILE_PATH-Variable
    For better use, docker-compose.yaml takes the path from the .env.file out of the .env.file.
    This way docker-compose.yaml stays untouched (git) for different container purposes as local, test and prod which are specified as own .env.local .env.test .env.prod files

### /app Volume
    The app folder will be volumed out for debugging purposes
