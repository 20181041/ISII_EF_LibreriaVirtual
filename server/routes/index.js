const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    res.send('Aquí irá la página principal');
});



module.exports = router;