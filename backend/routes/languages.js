const express = require("express")
const fs = require("fs")
const router = express.Router()

const ROOT = { root: "../" }

router.get("/:language", (req, res) => {
    const path = `/static/languages/${req.params.language}.json`
    if (!fs.existsSync(`${ROOT.root}${path}`)) return

    res.sendFile(path, ROOT)
})

module.exports = router