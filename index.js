const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');

const app = express();

app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello Player1337!');
});

app.get('/token', (req, res) => {
    const token = jwt.sign({
        role: "user",
        id: 200
    },"uw32h4eft09gh3w249eo0ftufhw39204ehrf")

    res.json({
        token
    })
})

app.get('/protected', (req, res) => {
    try{
        const token = req.query.token;
        let payload = token.split('.')[1];
        payload = Buffer.from(payload, 'base64').toString('ascii');
        payload = JSON.parse(payload)
        if(payload.role == "user") {
            res.json({
                message: "Protected"
            })
        }
        else if(payload.role == "admin") {
            res.json({
                message: "CTFslu{467575ff264bd9247088b1bb3234e61e}"
            })
        }
        else {
            res.status(401).json({
                message: "Unauthorized"
            })
        }
    }
    catch(e) {
        res.status(401).json({
            message: "Unauthorized"
        })
    }
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
