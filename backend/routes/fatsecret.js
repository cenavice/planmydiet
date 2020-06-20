const router = require('express').Router();
const axios = require('axios');
const querystring = require('querystring');
const flatted = require('flatted');

let token = '';
let expiresIn;

router.route('/get-token').get(async (req, res) => {
    const clientID = process.env.FATSECRET_CLIENT_ID;
    const clientSecret = process.env.FATSECRET_CLIENT_SECRET;
    
    let formData = {
        'grant_type': 'client_credentials',
        'scope': 'basic'
    }
    formData = querystring.stringify(formData);

    const putToken = (result) => { 
        token = result.data.access_token;
        expiresIn = result.data.expires_in;
    };

    axios.post('https://oauth.fatsecret.com/connect/token', formData, {
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            auth: {
                username: clientID,
                password: clientSecret
            },
        })
        .then(response => {
            putToken(response);
            req.session.fatSecretToken = token;
            req.session.fatSecretTokenExpiresIn = expiresIn;

            res.json(response.data);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ access_token: '' });
        });

});

router.route('/get-food').get((req, res) => {

    let sessionData = {
        token: req.session.fatSecretToken,
        expires_in: req.session.fatSecretTokenExpiresIn
    }

    const url = 'https://platform.fatsecret.com/rest/server.api';

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionData.token 
    };

    let formData = {
        'method': 'food.get.v2',
        'food_id': '1642',
        'format': 'json'
    }
    
    axios.get(url, { params: formData, headers: headers})
        .then(response => {
            res.send(flatted.parse(flatted.stringify(response.data)));
        })
        .catch(err => {
            res.send(flatted.parse(flatted.stringify(err)));
        });

});

router.route('/get-recipe').get((req, res) => {

    let sessionData = {
        // token: req.session.fatSecretToken,
        token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjZBMkFCNkQ0MkQ5REIwMjBEMThBRDMxRTE5MTdCMUUzMjg2RTUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJSU2FpcTIxQzJkc0NEUml0TWVHUmV4NHlodVUifQ.eyJuYmYiOjE1OTI2NjI3MzUsImV4cCI6MTU5Mjc0OTEzNSwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI1Y2E0YWM4MzU5YzI0YTc4OTk0M2JkNzk0ODE4NDI4YSIsInNjb3BlIjpbImJhc2ljIl19.Kj0UPnK62PGoVoXt1q7eGwMhw8nWWCAOv2bOsySVLFp9iJ-W4tXyNf0Hty2lzgOoojXqjeQZ06sW8fwX9fEGFHpsOAMmNjUvJGe6nymUHWq-miSYq6xxhiM-C__Rqbo9Grn3jzRHfyKWKE-QG7PVp0PyVZsM4_iCFI4uRtDDHWFoLYOZU4acPUcDMkIFswj9eDxtxweAaodeygMlu1LUkkh7hJzFzBYY-NmWBiJpn3y3MhaooqtpDW1yVW7eF4zPHeV6A9RRAtr7oQNhbyl-QFvAMBF6s5NUq9zqHei66rq962Jq557-OR-rNVHPMIdZAAsUv_Da28_psknG4iuLXA',
        expires_in: req.session.fatSecretTokenExpiresIn
    }

    const url = 'https://platform.fatsecret.com/rest/server.api';

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionData.token 
    };

    let formData = {
        'method': 'recipe.get',
        'recipe_id': '48064',
        'format': 'json'
    }
    
    axios.get(url, { params: formData, headers: headers})
        .then(response => {
            res.send(flatted.parse(flatted.stringify(response.data)));
        })
        .catch(err => {
            res.send(flatted.parse(flatted.stringify(err)));
        });

});

module.exports = router;