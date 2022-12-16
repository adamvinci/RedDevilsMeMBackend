const express = require('express');

const router = express.Router();

const { getPoint, addPoint, getMorePoints } = require('../models/users');
const { authorize } = require('../utils/authorize');

// get user stats 
router.get('/', authorize, (req, res) => res.json(getPoint(req.user.id)));

// add point to user bug si nbePoint ou nbeErreur = 0 return 400 code
router.post('/', authorize, (req, res) => {
    const { id } = req.user
    const nbePoint = req?.body?.nbePoint?.length !== 0 ? req.body.nbePoint : undefined;
    const nbeErreu = req?.body?.nbeErreu?.length !== 0 ? req.body.nbeErreu : undefined;
    if (!nbePoint || !nbeErreu) return res.sendStatus(400);
    return res.json(addPoint(nbePoint, nbeErreu, id))
});

// get top 10 points
router.get('/getRanking', (req, res) => {
    const points = getMorePoints();
    return res.json(points)

});



module.exports = router;