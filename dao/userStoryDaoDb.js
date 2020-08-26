const pool = require("../controllers/poolDb");



const userStoryDao = {
    getAllUserStories: async() => {
        const client = await pool.connect();
        const queryResult = await client.query("SELECT * FROM user_stories");
        client.release();
        console.log(queryResult.rows);
        return queryResult.rows;
    },
    addUserStory: (title, content, criteria, bValue, estimation, status) => {
        pool.query("INSERT INTO user_stories(story_title, user_story, acceptance_criteria, business_value, estimation, status) VALUES ($1, $2, $3, $4, $5, $6)",
            [title, content, criteria, bValue, estimation, status]);

        console.log("User story added!")
    },
    getUserStoryById: async (id) => {
        const client = await pool.connect();
        const queryResult = await client.query("SELECT * FROM user_stories WHERE id = " + id);
        client.release();
        console.log(queryResult.rows);
        return queryResult.rows;
    },
    updateUserStory: (id_, title, content, criteria, bValue, estimation, status) => {
        pool.query("UPDATE user_stories SET story_title=$1, user_story=$2, acceptance_criteria=$3, business_value=$4, estimation=$5, status=$6 WHERE id = $7",
            [title, content, criteria, bValue, estimation, status, id_]);

        console.log("User Story updated!")
    }

}

module.exports = userStoryDao;


