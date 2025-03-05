const express = require('express');
const path = require('path')
// For file upload
const multer = require('multer')

const Blog = require('../models/blog')
const router = express.Router();

// To store coverImages
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`
      cb(null, fileName)
    }
  })
  
const upload = multer({ storage: storage })

//add blog page
router.get('/addBlog', async(req,res) => {
    return res.render('addBlog');
})

//add blog
router.post('/', upload.single('coverImage'), async(req,res) => {
    const {title, body} = req.body
    const blog = await Blog.create({
        title: title,
        body: body,
        createdBy: req.user._id,
        coverImageURL: `uploads/${req.file.filename}`
    })
    res.redirect(`/blog/${blog._id}`)
})

module.exports = router;