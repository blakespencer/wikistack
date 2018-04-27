const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('got to GET /wiki/')
})
router.post('/wiki/', (req, res, next) =>{
  res.send('got to POST /wiki/')
})
router.get('/wiki/add', (req, res, next) =>{
  res.send('got to GET /wiki/add')
})

module.exports = router;
