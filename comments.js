// create web server 
var express = require('express');
var router = express.Router();

// call model
var Comment = require('../models/Comment');

// create comment
router.post('/', function(req, res){
    Comment.create(req.body, function(err, comment){
        if(err) return res.json(err);
        res.redirect('/comments');
    });
});

// show comment
router.get('/', function(req, res){
    Comment.find({}, function(err, comments){
        if(err) return res.json(err);
        res.render('comments/index', {data: comments});
    });
});

// edit comment
router.get('/:id/edit', function(req, res){
    Comment.findOne({_id:req.params.id}, function(err, comment){
        if(err) return res.json(err);
        res.render('comments/edit', {data: comment});
    });
});

// update comment
router.put('/:id', function(req, res){
    Comment.findOneAndUpdate({_id:req.params.id}, req.body, function(err, comment){
        if(err) return res.json(err);
        res.redirect('/comments');
    });
});

// delete comment
router.delete('/:id', function(req, res){
    Comment.remove({_id:req.params.id}, function(err, comment){
        if(err) return res.json(err);
        res.redirect('/comments');
    });
});

// export router
module.exports = router;
