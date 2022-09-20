const express = require("express");
const router = express.Router();
const db = require("../db")




router.get("/", async (req,res,next)=>{
    try {
        const results = await db.query('SELECT * FROM users');
    
        return res.json({users:results.rows})
        
    } catch (error) {
        return next(error);
    }

});

router.get('/:id', async (req,res,next)=>{
    const {id} = req.params;
    
    try {
        const userResults = await db.query('SELECT name, type FROM users WHERE id = $1', [id]);
        const messageResults = await db.query('SELECT id, msg FROM messages WHERE user_id = $1', [id]);
        
        const user = userResults.rows[0];
        user.messages = messageResults.rows;
        return res.send(user)

    } catch (e) {
        // return next(e)
        
    }


})

module.exports = router;
