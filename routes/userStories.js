const express = require("express");
const router = express.Router();
const userStoryDao = require("../dao/userStoryDaoDb");


router.get("/", async (req, res) => {
    const result = await userStoryDao.getAllUserStories().then(value => {
        return value;
    });

    res.render("home", {
       userStories: result
    });
})

router.get("/story", (req, res) => {
    res.render("addForm");
});

router.post("/story", (req, res) => {
    const newUserStory = {
        title: req.body.title,
        content: req.body.content,
        criteria: req.body.criteria,
        bValue: req.body.bvalue + " point",
        estimation: req.body.estm + "h",
        status: "planning"
    }

    userStoryDao.addUserStory(newUserStory.title, newUserStory.content, newUserStory.criteria, newUserStory.bValue, newUserStory.estimation, newUserStory.status);
});

router.get("/story/:id", async (req, res) => {
   const result = await userStoryDao.getUserStoryById(req.params.id).then(value => {
       return value;
   });

   res.render("updateForm", {
        id: result[0].id,
        title: result[0].story_title,
        content: result[0].user_story,
        criteria: result[0].acceptance_criteria,
        bvalue: result[0].business_value.replace(/\D/g,''),
        estm: result[0].estimation.replace(/\D/g,''),
        status: result[0].status
   })
});

router.post("/story/:id", (req, res) => {
    const updatedUserStory = {
        title: req.body.title,
        content: req.body.content,
        criteria: req.body.criteria,
        bValue: req.body.bvalue + " point",
        estimation: req.body.estm + "h",
        status: req.body.status
    }


    userStoryDao.updateUserStory(req.params.id, updatedUserStory.title, updatedUserStory.content, updatedUserStory.criteria, updatedUserStory.bValue, updatedUserStory.estimation, updatedUserStory.status);
});

module.exports = router;
