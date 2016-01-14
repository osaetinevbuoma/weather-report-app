var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:template', function (req, res, next) {
    res.render('partials/' + req.params.template);
});

module.exports = router;
