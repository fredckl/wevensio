const express = require('express')
const router = express.Router()

router.post('/:channel', (req, res) => {
  const msg = req.body?.msg
  const channel = req.params.channel
  return res.status(200).send({ msg, channel })
})

module.exports = router
