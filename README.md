# Branch List
This app was made so that a customer can view all their stores and information.

## Use-Case Diagram

![image](https://i.hizliresim.com/eq1088t.png)

## Database Diagram

![image](https://i.hizliresim.com/3r30yet.png)

## Install
 You will need docker for this project
- Clone the project to your device
- Go to the folder you cloned, run ```npm install``` inside the client and server folders
- Open terminal in the directory where the docker-compose.yml file is located in the folder you cloned
- Go to the ```app/server/api/gecode.js``` file to be able to automatically fetch the latitude and longitude data from the address. Then add the API KEY you got from Yandex Geo to the ```API_KEY_you_get_from_Yandex_Geo``` field.
- Run the ```docker-compose up``` command in the terminal you opened
- It works on Server port 3333, Client on port 3000
