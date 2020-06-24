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

router.route('/search-recipe').post((req, res) => {
    
    let sessionData = {
        // token: req.session.fatSecretToken,
        token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjZBMkFCNkQ0MkQ5REIwMjBEMThBRDMxRTE5MTdCMUUzMjg2RTUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJSU2FpcTIxQzJkc0NEUml0TWVHUmV4NHlodVUifQ.eyJuYmYiOjE1OTMwMDgyMDUsImV4cCI6MTU5MzA5NDYwNSwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI1Y2E0YWM4MzU5YzI0YTc4OTk0M2JkNzk0ODE4NDI4YSIsInNjb3BlIjpbImJhc2ljIl19.R1Tzp1meovu6tdhsMA5Mr_wnmeYK6niIUw9A5qBV7KThZnDe70eyUJgL5svq14DIN9WOfU-6-36DV0uXc24azO9O6FlM6aec2f_TVTMmG1uI421jkdyzAIhtpd2wKv-RvGs9G-lb-i3MI5sHlNRPT8Bov3BatCwIEKzZ6Mjgf_ICv8kU0nHWSDtgfHKm3Z_aVF23yWNDXz8Ve7xDiOCbRauoASLhGvuoJyQq3Bb4VaOYdrOdFHTb3Tg_vjxVVUSLCTSWEyBELlLewAI60L9TMQ_Sk6M6xue8K4L4etXFR-S7yZ7eWhLQxLgrFD5WoXMFSRv0bWfr8e4x-wBWvr-lZQ',
        expires_in: req.session.fatSecretTokenExpiresIn
    }

    const url = 'https://platform.fatsecret.com/rest/server.api';

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionData.token 
    };

    let formData = {
        'method': 'recipes.search',
        'search_expression': '',
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
});

router.route('/get-recipe/:id').get((req, res) => {

    let sessionData = {
        // token: req.session.fatSecretToken,
        token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjZBMkFCNkQ0MkQ5REIwMjBEMThBRDMxRTE5MTdCMUUzMjg2RTUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJSU2FpcTIxQzJkc0NEUml0TWVHUmV4NHlodVUifQ.eyJuYmYiOjE1OTMwMDgyMDUsImV4cCI6MTU5MzA5NDYwNSwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI1Y2E0YWM4MzU5YzI0YTc4OTk0M2JkNzk0ODE4NDI4YSIsInNjb3BlIjpbImJhc2ljIl19.R1Tzp1meovu6tdhsMA5Mr_wnmeYK6niIUw9A5qBV7KThZnDe70eyUJgL5svq14DIN9WOfU-6-36DV0uXc24azO9O6FlM6aec2f_TVTMmG1uI421jkdyzAIhtpd2wKv-RvGs9G-lb-i3MI5sHlNRPT8Bov3BatCwIEKzZ6Mjgf_ICv8kU0nHWSDtgfHKm3Z_aVF23yWNDXz8Ve7xDiOCbRauoASLhGvuoJyQq3Bb4VaOYdrOdFHTb3Tg_vjxVVUSLCTSWEyBELlLewAI60L9TMQ_Sk6M6xue8K4L4etXFR-S7yZ7eWhLQxLgrFD5WoXMFSRv0bWfr8e4x-wBWvr-lZQ',
        expires_in: req.session.fatSecretTokenExpiresIn
    }

    const url = 'https://platform.fatsecret.com/rest/server.api';

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionData.token 
    };

    let formData = {
        'method': 'recipe.get',
        'recipe_id': req.params.id,
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