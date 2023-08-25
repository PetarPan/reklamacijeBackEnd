const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const {validateToken} = require('..//middlewares/AuthMiddleware');


// LIST OF COMPLIANT //
router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({include: [Likes]});
  const likedPosts = await Likes.findAll({where: {UserId: req.user.id }});
  res.json({listOfPosts: listOfPosts, likedPosts: likedPosts});
});

router.get('/byId/:id', async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.get('/byuserId/:id', async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({where: { UserId: id }, include: [Likes],});
  res.json(listOfPosts);
})

// CREATE COMPLIANT //
router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  await Posts.create(post);
  res.json(post);
});

// UPDATE COMPLIANT // 
//update buyerAccount
router.put("/buyerAccount", async (req, res) => {
  const {newBuyerAccount, id} = req.body;
  //column in database table, thet new input
  await Posts.update({buyerAccount: newBuyerAccount}, {where: {id: id}});
  res.json(newBuyerAccount);
});
//update buyerName
router.put("/buyerName", async (req, res) => {
  const {newBuyerName, id} = req.body;
  await Posts.update({buyerName: newBuyerName}, {where: {id: id}});
  res.json(newBuyerName);
});
//update address
router.put("/address", async (req, res) => {
  const {newAddress, id} = req.body;
  await Posts.update({address: newAddress}, {where: {id: id}});
  res.json(newAddress);
});
//update city
router.put("/city", async (req, res) => {
  const {newCity, id} = req.body;
  await Posts.update({city: newCity}, {where: {id: id}});
  res.json(newCity);
});
//update typeOfCompliantSend
router.put("/typeOfCompliantSend", async (req, res) => {
  const {newTypeOfCompliantSend, id} = req.body;
  await Posts.update({typeOfCompliantSend: newTypeOfCompliantSend}, {where: {id: id}});
  res.json(newTypeOfCompliantSend);
});
//update compliantNature
router.put("/compliantNature", async (req, res) => {
  const {newCompliantNature, id} = req.body;
  await Posts.update({compliantNature: newCompliantNature}, {where: {id: id}});
  res.json(newCompliantNature);
});
//update recieveCompliantDate
router.put("/recieveCompliantDate", async (req, res) => {
  const {newRecieveCompliantDate, id} = req.body;
  await Posts.update({recieveCompliantDate: newRecieveCompliantDate}, {where: {id: id}});
  res.json(newRecieveCompliantDate);
});
//update endCompliantDate
router.put("/endCompliantDate", async (req, res) => {
  const {newEndCompliantDate, id} = req.body;
  await Posts.update({endCompliantDate: newEndCompliantDate}, {where: {id: id}});
  res.json(newEndCompliantDate);
});
//update note
router.put("/note", async (req, res) => {
  const {newNote, id} = req.body;
  await Posts.update({note: Newnote}, {where: {id: id}});
  res.json(newNote);
});
//update justifiedCompliant
router.put("/justifiedCompliant", async (req, res) => {
  const {newJustifiedCompliant, id} = req.body;
  await Posts.update({justifiedCompliant: newJustifiedCompliant}, {where: {id: id}});
  res.json(newJustifiedCompliant);
});
//update compliantEnd
router.put("/compliantEnd", async (req, res) => {
  const {newCompliantEnd, id} = req.body;
  await Posts.update({compliantEnd: newCompliantEnd}, {where: {id: id}});
  res.json(newCompliantEnd);
});

//DELETE COMPLIANT //
router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });
  res.json("DELETED SUCCESSFULLY");
});



module.exports = router;
