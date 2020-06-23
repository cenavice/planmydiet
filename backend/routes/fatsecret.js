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

router.route('/search-recipe').get((req, res) => {
    
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
        'method': 'food.search',
        'search_expression': 'chicken',
        'page_number': 1,
        'max_results': 20,
        'format': 'json'
    }
    
    axios.get(url, { params: formData, headers: headers})
        .then(response => {
            res.send(flatted.parse(flatted.stringify(response.data)));
        })
        .catch(err => {
            res.send(flatted.parse(flatted.stringify(err)));
        });

    res.json('asd');
});

router.route('/get-recipe').get((req, res) => {

    let sessionData = {
        // token: req.session.fatSecretToken,
        token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjZBMkFCNkQ0MkQ5REIwMjBEMThBRDMxRTE5MTdCMUUzMjg2RTUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJSU2FpcTIxQzJkc0NEUml0TWVHUmV4NHlodVUifQ.eyJuYmYiOjE1OTI5MjA3NjIsImV4cCI6MTU5MzAwNzE2MiwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI1Y2E0YWM4MzU5YzI0YTc4OTk0M2JkNzk0ODE4NDI4YSIsInNjb3BlIjpbImJhc2ljIl19.lYSX6SvTAK_aqKl0tloTvxtqnKWh1SWuCJfe9Lk71ngxpm3-bFJ41I-iiqRwBL5aQ5b2c0f3XA0rhUao-GzV6PRKKaVfvleiL-QWgzs1QOyaVcR6Gn3FcCJA0SY0BR5JQdzNNKdUH40cT0WvE9pWiOK-x5CO6pxzK-sEGGzNc8-taeT2MM2tlAb-i7Ka6hFC5jM8OvqJtK1ChJKllVl4KISrl40Lljp0np2T1N9ZFUFK_4x91-8NsshA5FxgjP5iRzGQbF44zOi6qY19Nmrgl-7lmyHgTdCa3tbmPvb9SqNM9OC8MFyjD2wOigm78yVJJZs4cHvJX5g9BnVrDilu5g',
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