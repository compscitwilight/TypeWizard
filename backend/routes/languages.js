const express = require("express")
const pathJs = require("path")
const fs = require("fs")
const router = express.Router()

const ROOT = { root: "../" }

router.get("/:language", (req, res) => {
    const path = pathJs.resolve(process.cwd(), `static/languages/${req.params.language}.json`)
    if (!fs.existsSync(`${ROOT.root}${path}`)) {
        return res.status(404)
    }

    res.sendFile(path)
})

module.exports = router