
###
<h1 align="center">e-Fill</h1>

<b>e-Fill</b> is a web app to find & locate the nearest EV Charging stations for registered users and also they can view the slots availability. It also helps the charging station owners to manage the status (like slots vacancy) of their bunk through online.

<br>

## Project Architecture

<br>
<div align="center">
    <img src="https://drive.google.com/uc?export=view&id=15mVJgcjVe35UAr01OC_Zo-gp59NJOAG1" alt="flow chart represents project architecture">
</div>
<br>

### Built With

* Firebase
* JavaScript
* HTML
* CSS
* JQuery
<br>

## Getting Started

<p>These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.</p>

### Prerequisites(Optional)

To host your own copy of project using Firebase, you must need
* npm
  ```sh
  npm install -g firebase-tools
  ```

### Installation

1. Fork [this](https://github.com/Kumara2mahe/e-Fill) repositary.
2. Clone your forked copy of the project to your local machine
   ```sh
   git clone https://github.com/<your-username>/e-Fill.git
   ```
3. Navigate to the project directory
   ```sh
   cd e-Fill
   ```
5. Replace the 'firebaseConfig' in the "./Assets/JavaScript/fireBase/app.js" with your own Firebase configs
   ```js
   const firebaseConfig = {
        apiKey: "<api-key>",
        authDomain: "<app-name>.firebaseapp.com",
        databaseURL: "https://<app-name>-default-rtdb.firebaseio.com",
        projectId: "<your-project-id>",
        storageBucket: "<app-name>.appspot.com",
        messagingSenderId: "<your-own>",
        appId: "<your-own>"
    }
   ```

## Features

- Authenticated Users can find & locate the nearest EV Charging stations and for authenticated users they can only view the bunks details such as contact, location, slots vacancy and also total slots.

- Admins(Bunk Managers) can do the same as normal users, and as additional benefits they can ADD/UPDATE/DELETE their own bunk details.

- For admins there is a special page named as "manage-bunks.html", there they can the CRUD operations.

- Admins can do the CRUD operations in the nice Admin-Interface, which makes it easy to add/modify/delete courses.

- There are two links to locate the charging stations nearby using the name of place or location

    - First one "Locate Charger", which filters the bunks only according to the location entered even there are no freeslots available.
    - Second one "Slots Availability", which additionally filters all the nearby bunks which have minimum of 2 freeslots on page loading. When user starts to search for any location, the bunks results are in location are showing with the freeslots filter. 

- Additionally there is a profile page for authenticated users to view their login details.

<br>

### Structure of Firebase - Realtime Database

<p align="right"><b>"https://&lt;app-name&gt;-default-rtdb.firebaseio.com/users"</b><p>

    users = {
        ..
        "fsdsd34344jkae3433m": {
            "email": "steve@example.com",
            "isAdmin": true,
            "name": "Steve"
        },
        "fsdsd34s44jkae6392a": {
            "email": "matt@example.com",
            "isAdmin": false,
            "name": "Matt"
        },
        ..
    }

<p align="right"><b>"https://&lt;app-name&gt;-default-rtdb.firebaseio.com/bunks"</b><p>
  
    
    bunks = {
        ..
        "-bkn3ksGkkaNa": {
            address: "",
            city: "Somewhere",
            country: "Nowhere",
            createdOn: "2023-01-26T08:16:39.402Z",
            email: "themars@bunks.com",
            freeslots: 14,
            imageUrl: "images/01",
            modifiedOn: "2023-01-26T08:16:39.402Z",
            name: "The Mars",
            number: "9876543210",
            ownerId: "fsdsd34344jkae3433m",
            slots: 20
        },
        ..
    }
    
## Screenshots

<div align="center">
    <img src="https://drive.google.com/uc?export=view&id=1hTVbUMyp6gazOQHfmU3Xbsg2Mk_LUy0T" alt="viewing bunk details from locate charger page" width=300 height=500>
    <span>&emsp;&emsp;</span>
    <img src="https://drive.google.com/uc?export=view&id=1DbA1qDdYxhTV87BwbEGro6YN1G3a2PK3" alt="preview of building services page" width=300 height=500>
    <br><br>
    <img src="https://drive.google.com/uc?export=view&id=1hSDNY-p-XyouxhX17x15GZEyk8HMLy8u" alt="preview of add bunk page" width=300 height=400>
</div>
<br>

> Check Live Project at [here!](https://e-fill-by-kumara.web.app/)

### License
[MIT](https://choosealicense.com/licenses/mit/)
