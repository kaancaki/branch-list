const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');
const Role = db.role;
const Branch = db.branch;
const User = db.user;
const bcrypt = require('bcryptjs');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (err, req, res, next) {
    res.status(500);
    res.send("Oops, something went wrong.")
});
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);


db.sequelize.sync({force: true}).then(() => {
    console.log("The database has been activated.");
    console.log(db.sequelize.models);
    initial();
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "admin"
    });

    
    Branch.create(
        {
        latitude: "40.92296",
        longlitude: "29.15835",
        name: "Ritim İstanbul",
        full_adress: "Cevizli, Zuhal Cd., 34846 Maltepe/İstanbul",
        phone: "02162254100",
        branch_code: "AVM001"
    });
    Branch.create({
        latitude: "40.9194316",
        longlitude: "29.1626945",
        name: "Maltepe Piazza",
        full_adress: "Cevizli, Tugay Yolu Cd. 69-C, 34846 Maltepe/İstanbul",
        phone: "08502075767",
        branch_code: "AVM002"
    });
    Branch.create({
        latitude: "40.9182268",
        longlitude: "29.1718911",
        name: "Anatolium Marmara Alışveriş Merkezi",
        full_adress: "Soğanlık Yeni, Soğanlik D-100 Kuzey Yanyol No:72, 34880 Kartal/İstanbul",
        phone: "02165043480",
        branch_code: "AVM003"
    });
    Branch.create({
        latitude: "40.8963723",
        longlitude: "29.1752927",
        name: "İSTMarina AVM",
        full_adress: "Kordonboyu, Ankara Cd. No:147/6, 34860 Kartal/İstanbul",
        phone: "02165865151",
        branch_code: "AVM004"
    });
    Branch.create({
        latitude: "40.9194316",
        longlitude: "29.1626945",
        name: "Maltepe Park",
        full_adress: "Cevizli, Tugay Yolu Cd. No:67, 34846 Maltepe/İstanbul",
        phone: "08502075767",
        branch_code: "AVM005"
    });
    
    User.create({
        username: "admin",
        email: "admin@avmguard.com",
        password: bcrypt.hashSync("12345678", 8)
      }).then(user => {
            user.setRoles([2]).then(() => {
            }).then(console.log("Admin account created successfully."));
        })
        .catch(err => {
          console.log("Failed to create admin account: " + err);
        });

}
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server is running on port 3333");
})