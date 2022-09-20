const express = require("express");
const router = express.Router();
const db = require("../db");


router.get("/:id", async (req,res,next)=>{

    try {
        console.log("Hello")
        const {id} = req.params;
        const results = await db.query(
        `SELECT m.id, m.msg, t.tag
        FROM messages AS m
          LEFT JOIN messages_tags AS mt 
            ON m.id = mt.message_id
          LEFT JOIN tags AS t ON mt.tag_code = t.code
        WHERE m.id = $1;`, [id])
        return res.send(results.rows[0])
    } catch (e) {
        return next(e)
        
    }

})


module.exports = router;
