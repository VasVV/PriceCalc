const express = require("express");
const cors = require("cors");
const bp = require('body-parser');

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3001;

const prices = {
    mins: {
        '0': 100, 
        '1': 200, 
        '2': 300, 
        '3': 600
    }, 
    sms: {
        '0': 0, 
        '1': 50,
        '2': 100,
        '3': 150
    },
    gb: {
        '0': 5, 
        '1': 10, 
        '2': 15, 
        '3': 25
    },
    additionalServices: {
        'facebook': 10,
        'twitter': 15,
        'vk': 20,
        'instagram': 25
    }
}

app.post('/recievedata', (req, res) => {
    let data = req.body;
    let finalPrice = 0;
    for (property in data) {
       if (property !== 'additionalServices') {
           finalPrice+=prices[property][data[property]];
        } else {
               Object
               .keys(prices['additionalServices'])
               .forEach(e => data[property].includes(e) ? finalPrice+=prices['additionalServices'][e] : "");
        }
    }
    res.send(finalPrice.toString());
});



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});