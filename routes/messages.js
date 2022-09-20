const express = require("express");
const router = express.Router();
const db = require("../db");
const ExpressError = require('../expressError')


router.get("/:id", async (req,res,next)=>{

    try {
        console.log("Hello")

        const results = await db.query(`
            SELECT m.id, m.msg, t.tag
            FROM messages AS m 
            LEFT JOIN messages_tags AS mt 
            ON m.id = mt.message_id
            LEFT JOIN tags AS t 
            ON mt.tag_code = t.code
            WHERE m.id = $1`, [req.params.id])
            console.log(results.rows.length)
        if (results.rows.length === 0){

            throw new ExpressError("Something is wrong", 404)
        }

        const { id, msg } = results.rows[0]
        const tags = results.rows.map(r => r.tag)
        return res.send({id,msg,tags})
    } catch (e) {
        return next(e)
        
    }

})


module.exports = router;
