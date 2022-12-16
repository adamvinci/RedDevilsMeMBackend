

const express = require('express');

const router = express.Router();

const { getPoint, addPoint, getMorePoints } = require('../models/users');

// get user stats 
router.get('/', (req, res) => res.json(getPoint(req.session.user_id)));

// add point to user bug si nbePoint ou nbeErreur =0 envoie statut 400 donc supprimer res.sendStatut
router.post('/', (req, res) => {
    const id =req.session.user_id
    const {nbePoint} = req.body.nbePoint  ;
    const {nbeErreu} = req.body.nbeErreu ;
    if(nbePoint === undefined || nbeErreu === undefined) res.sendStatus(400)
    return res.json(addPoint(nbePoint, nbeErreu, id))
});

// get top 10 points
router.get('/getRanking', (req, res) => {
    const points = getMorePoints();
    return res.json(points)

});



module.exports = router;