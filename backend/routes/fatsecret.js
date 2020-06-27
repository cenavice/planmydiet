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

            res.json(response.data);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ access_token: '' });
        });

});

router.route('/get-food').get((req, res) => {

    let sessionData = {
        token: token,
        expires_in: expiresIn
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
        token: token,
        expires_in: expiresIn
    }

    const url = 'https://platform.fatsecret.com/rest/server.api';

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionData.token 
    };

    let formData = {
        'method': 'recipes.search',
        'search_expression': req.body.searchExpression,
        'page_number': req.body.pageNumber,
        'max_results': req.body.maxResults,
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
        token: token,
        expires_in: expiresIn
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