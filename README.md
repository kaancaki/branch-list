# Branch List
This app was made so that a customer can view all their stores and information.

## Use-Case Diagram

![image](https://i.hizliresim.com/eq1088t.png)

## Database Diagram

![image](https://i.hizliresim.com/3r30yet.png)


## Planned to be added
- Branch editing
- Ability to add new branches
- Database migrations
- Show on maps by latitude and longitude
- Filtering operations

## Install
 You will need docker for this project.
- Clone the project to your device
- Open terminal in the directory where the docker-compose.yml file is located in the folder you cloned.
- Run the ```docker-compose up``` command in the terminal you opened
- It works on API port 3333, Interface on port 3000\

## Notes
- Currently connecting to a remote db and fetching current data. If you want, you can also use the MySQL database that will be installed with docker. You can make the settings of the MySQL database system to be installed by using the contents of the .env file in the main directory. Please update the ```config.js``` file in the ```server``` folder by sticking to the information you entered.

## Screenshots
![image](https://i.hizliresim.com/i7lyky7.jpg)
![image](https://i.hizliresim.com/hgczenf.jpg)
