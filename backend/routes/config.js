const express = require("express")
const pathJs = require("path")
const fs = require("fs")
const router = express.Router()

const ROOT = { root: "../" }

router.get("/:file", (req, res) => {
    const path = pathJs.resolve(process.cwd(), `static/config/${req.params.file}.json`)
    if (!fs.existsSync(`${ROOT.root}${path}`)) {
        res.sendFile(pathJs.resolve(process.cwd(), "frontend/src/pages/notfound.html"))
        return
    }

    res.sendFile(path)
})

module.exports = router