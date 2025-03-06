const express = require('express');
const path = require('path')
// For file upload
const multer = require('multer')

const Blog = require('../models/blog');
const Comment = require('../models/comment');
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
    return res.render('addBlog',{
        user:req.user
    });
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

//view blogs
router.get('/:id', async(req,res) => {
    // Gets blog by id and and adds user details by populate
    const blog = await Blog.findById(req.params.id).populate('createdBy')
    const comments = await Comment.find({blogId:req.params.id}).populate('createdBy')
    return res.render('blog',{
        user: req.user,
        blog,
        comments
    })
})

router.post('/comment/:blogId',async(req, res)=>{
    const comment = await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id
    })

    return res.redirect(`/blog/${req.params.blogId}`)
})


module.exports = router;