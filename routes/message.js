

const express = require('express');

const router = express.Router();

const Message = require('../models/messages');
const { authorize } = require('../utils/authorize');

router.get('/', authorize, (req, res) => res.json({ message: Message.list(req.user.id) }));


router.post('/addMessageUser', authorize, (req, res) => {
    const { id } = req.user;
    const content = req?.body?.content?.length !== 0 ? req.body.content : undefined;
    const type = req?.body?.type?.length !== 0 ? req.body.type : undefined;
    if (!content || !type) return res.sendStatus(400);
    const data = { id, type, content }
    const message = Message.saveUserMessage(data)
    if (!message) return res.sendStatus(401);
    return res.json(message);

});

router.post('/addMessageVisitor', (req, res) => {
    const content = req?.body?.content?.length !== 0 ? req.body.content : undefined;
    const type = req?.body?.type?.length !== 0 ? req.body.type : undefined;
    if (!content || !type) return res.sendStatus(400);
    const data = { type, content }
    const message = Message.saveVisitorMessage(data)
    if (!message) return res.sendStatus(401);
    return res.json(message);

});

router.delete('/:id', authorize, (req, res) => {
    const idMessage = req?.params?.id
    const message = Message.deleteOnemessage(idMessage, req.user.id);
    if (!message) return res.sendStatus(401);
    return res.json(message);
});

router.patch('/:id', authorize, (req, res) => {
    const content = req?.body?.content?.length !== 0 ? req.body.content : undefined;
    const type = req?.body?.type?.length !== 0 ? req.body.type : undefined;
    const idMessage = req?.params?.id
    if (!content && !type) return res.sendStatus(400);
    const message = Message.updateOneMessage(idMessage, req.user.id, req.body);
    if (!message) return res.sendStatus(401);
    return res.json(message);
});
module.exports = router;