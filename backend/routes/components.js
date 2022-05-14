const express = require("express")
const router = express.Router()

const ROOT = { root: "../" }

router.get("/Head", (req, res) => {
    res.sendFile("/frontend/components/Head.html", ROOT)
})

router.get("/TopBar", (req, res) => {
    res.sendFile("/frontend/components/TopBar.html", ROOT)
})

module.exports = router