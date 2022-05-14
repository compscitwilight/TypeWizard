const express = require("express")
const fs = require("fs")
const router = express.Router()

const ROOT = { root: "../" }

router.get("/:script", (req, res) => {
    const path = `frontend/src/scripts/${req.params.script}.js`
    if (!fs.existsSync(`${ROOT.root}${path}`)) {
        res.sendFile("/frontend/src/pages/notfound.html", ROOT)
        return
    }

    res.sendFile(path, ROOT)
})

module.exports = router