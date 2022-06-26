const express = require("express")
const pathJs = require("path")
const fs = require("fs")
const router = express.Router()

const ROOT = { root: "../" }

router.get("/:component", (req, res) => {
    const path = pathJs.resolve(process.cwd(), `frontend/components/${req.params.component}.html`)
    if (!fs.existsSync(`${ROOT.root}${path}`)) {
        return res.sendFile(pathJs.resolve(process.cwd(), "frontend/src/pages/notfound.html"))
    }

    res.sendFile(path)
})

module.exports = router