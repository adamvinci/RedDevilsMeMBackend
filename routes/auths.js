const express = require('express');
const { login, register } = require('../models/users')

const router = express.Router();


router.post('/login', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;
  if (!username || !password) return res.sendStatus(400)

  const user = await login(username, password);
  if (!user) return res.sendStatus(401);


  return res.json({ username: user.username, token: user.token });
});

router.post('/register', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;
  if (!username || !password) return res.sendStatus(400)
  const newUser = await register(username, password);
  if (!newUser) return res.sendStatus(401);
  return res.json({ username: newUser.username, token: newUser.token });
});



router.get('/logout', (req, res) => {
  req.session = null;
  return res.sendStatus(200);
});


module.exports = router;