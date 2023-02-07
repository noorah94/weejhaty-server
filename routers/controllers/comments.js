const commentsModel = require("./../../db/models/comments");

const addComment = (req, res) => {
  const { userId, articleId, text } = req.body;

  const newComment = new commentsModel({
    userId,
    articleId,
    text,
  });

  newComment
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const delComment = async (req, res) => {
  const { commentId } = req.body;

  try {
    let doc = await commentsModel.updateOne(
      { _id: commentId },
      { isDel: true }
    );
    if (doc) res.status(200).json(doc);
    else res.status(400).json("Comment not found");
  } catch (err) {
    res.status(400).json("Comment not found");
  }
};

const getCommentsForArticle = (req, res) => {
  const { id } = req.params;
  commentsModel
    .find({ articleId: id, isDel: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getCommentsForUser = (req, res) => {
  const { id } = req.params;
  commentsModel
    .findOne({ userId: id, isDel: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  addComment,
  delComment,
  getCommentsForArticle,
  getCommentsForUser,
};
