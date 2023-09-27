// create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// create a router
const router = express.Router();
// create a port
const port = 3000;

// create a middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// create a route
router.get('/comments', (req, res) => {
    res.json({
        message: 'Welcome to our API!'
    });
});

router.post('/comments', (req, res) => {
    res.json({
        message: 'Your comment has been saved!',
        comment: req.body.comment
    });
});

// register our route
app.use('/api', router);

// start our server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});