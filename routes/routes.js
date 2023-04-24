const router = require('express').Router()

router.get('/client', (req, res) =>{
    
    res.send({
        "ok" : 123
    })
})

module.exports = router