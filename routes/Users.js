const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require('bcrypt');
const {validateToken} = require('../middlewares/AuthMiddleware')
const {sign} = require('jsonwebtoken');

//registration
router.post("/", async (req, res) => {
  const {username, password, role, name, lastName } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
        username: username,
        password: hash,
        role: role,
        name: name,
        lastName: lastName
    })
    res.json('Success')
  });
});
//login logika
router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    const user = await Users.findOne({ where: {username: username}});
    if (!user) res.json({error: "User doesnt exist"});

    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({error: 'Wrong Username and Password Combination'});

        const accessToken = sign({username: user.username, id: user.id, role: user.role}, "importantsecret")
        
        
        res.json({token: accessToken, username: username, id: user.id, role: user.role});
    });
});
//provereva da li smo ulogovani, da li je ispravan token
router.get('/auth', validateToken, (req, res) => {
  res.json(req.user);
});

router.get('/basicinfo/:id', async (req, res) => {
  //ne koristimo validateToken jer svi treba da imaju uvid u to ko je sve koje postove kreirao

  const id = req.params.id;
  //iskljucujemo mogucnost da se dobije password esclude...
  const basicInfo = await Users.findByPk(id, {atributes: {exclude: ['password']}});

  res.json(basicInfo);
})


//change password

router.put('/changepassword', validateToken, async (req, res) => {
  const { oldPassword, newPassword} = req.body;
  const user = await Users.findOne({ where: {username: req.user.username /* uzimamo username preko tokena */}});
  
  bcrypt.compare(oldPassword, user.password).then( (match) => {
    if (!match) res.json({error: 'Wrong Password Entered!'});

    bcrypt.hash(newPassword, 10).then( (hash) => {
       Users.update({password: hash}, 
        {where: {username: req.user.username }}
        );
      res.json('Success')
    }); 
  } );

})
module.exports = router;
