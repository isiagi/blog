const router = require("express").Router();
const Article = require("./../models/article");

router.get("/new", (req, res) => {
  res.render("articles/new", {article: new Article()});
});

router.get('/:slug', async(req, res)=> {
    const wen = req.params.slug;
    try {
      const article = await Article.findOne({slug: wen})
      res.render('articles/show', {article: article})
      
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
})

router.post("/", async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    article = await article.save();
    res.redirect(`articles/${article.slug}`);
  } catch (error) {
    console.log(error);
      res.render("articles/new", {article: article})
  }
});

router.delete('/:id', async(req, res)=>{
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

module.exports = router;
