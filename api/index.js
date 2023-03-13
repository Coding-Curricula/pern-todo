const express = require('express');
const router = express.Router();
const client = require('../db/client');

// GET /api/health
router.get('/health', async (req, res, next) => {
  try {
    const uptime = process.uptime();
    const {rows: [dbConnection]} = await client.query('SELECT NOW();');
    const currentTime = new Date();
    const lastRestart = new Intl.DateTimeFormat('en', {timeStyle: 'long', dateStyle: 'long', timeZone: "America/Chicago"}).format(currentTime - (uptime * 1000));
    res.send({message: 'healthy', uptime, dbConnection, currentTime, lastRestart});
  } catch (err) {
    next(err);
  }
});

// import todos
router.use('/todos', require('./todos'));

module.exports = router;