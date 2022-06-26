const express = require("express")
const pathJs = require("path")
const fs = require("fs")
const router = express.Router()

const ROOT = { root: "../" }

router.get("/:script", (req, res) => {
    const path = pathJs.resolve(process.cwd(), `frontend/src/scripts/${req.params.script}.js`)
    if (!fs.existsSync(`${ROOT.root}${path}`)) {
        return res.status(404)
    }

    res.sendFile(path)
})

module.exports = router