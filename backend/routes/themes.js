const express = require("express")
const fs = require("fs")
const router = express.Router()

const ROOT = { root: "../" }

router.get("/:theme", (req, res) => {
    const path = `/frontend/src/styles/themes/${req.params.theme}.css`
    if (!fs.existsSync(`${ROOT.root}${path}`)) return

    res.sendFile(path, ROOT)
})

module.exports = router