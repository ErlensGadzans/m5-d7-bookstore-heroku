const express = require("express");
const path = require("path");
const uniqid = require("uniqid");
const { readDB, writeDB } = require("../../fsUtilities");

const router = express.Router();

const commentsFilePath = path.join(__dirname, "comments.json");
const booksFilePath = path.join(__dirname, "../books/books.json");

router.post("/", async (req, res, next) => {
  try {
    const commentsArray = await readDB(commentsFilePath);
    const newComment = { ...req.body, id: uniqid(), createdAt: new Date() };
    commentsArray.push(newComment);
    await writeDB(commentsFilePath, commentsArray);
    res.status(201).send(newComment);
  } catch (error) {
    error.httpStatusCode = 500;
    next(error);
  }
});

router.get("/:asin", async (req, res, next) => {
  //read comments/json
  //filter where elemtId===asin
  //send as res
});

router.delete("/books/comments/:commentID", async (req, res, next) => {});

module.exports = router;
