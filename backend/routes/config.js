const express = require("express")
const fs = require("fs")
const router = express.Router()

const ROOT = { root: "../" }

router.get("/:file", (req, res) => {
    const path = `/static/config/${req.params.file}.json`
    if (!fs.existsSync(`${ROOT.root}${path}`)) {
        res.sendFile("/frontend/src/pages/notfound.html", ROOT)
        return
    }

    res.sendFile(path, ROOT)
})

module.exports = router