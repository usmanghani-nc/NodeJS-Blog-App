const Blog = require('../models/blog');


const blog_index = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({
            createdAt: -1
        })
        res.render('index', {
            title: 'Home',
            blogs
        })
    } catch (error) {
        res.status(404).render('404', {
            title: "Blogs nont found"
        })
    }
}


const blog_details = async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            const blog = await Blog.findById(id)
            res.render('details', {
                title: "Detail",
                blog
            });
        }
    } catch (err) {
        res.status(404).render('404', {
            title: "blog nont found"
        })
    }
}

const blog_create_get = (req, res) => {
    res.render('create', {
        title: 'Create Blogs'
    })
}

const blog_create_post = async (req, res) => {
    const blog = new Blog(req.body)
    await blog.save()
    res.redirect("/blogs")
}


const blog_delete = async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            await Blog.findOneAndDelete(id)
            res.json({
                redirect: '/blogs',
                status: 'Success'
            })
        }
    } catch (err) {
        res.json({
            redirect: '/blogs',
            status: 'Fail',
            err
        })
    }
}


module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}