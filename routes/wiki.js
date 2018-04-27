const express = require('express');
const router = express.Router();
const { addPage } = require("../views");
const { Page } = require("../models");
const wikipage = require("../views/wikipage");
const main = require("../views/main");

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (error) {next(error)};
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.post('/', async (req, res, next) => {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  const page = new Page({
    title: req.body.title,
    content: req.body.content,
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }
});

// Async since it is querying database
router.get('/:slug', async (req, res, next) => {
  try {
  // we are retrieving a single instance and converting it into json
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });

    res.send(wikipage(page));
  } catch (error) { next(error)}
});

module.exports = router;
