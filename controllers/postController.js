const Post = require("../models/Post");

const addpost = async (req, res) => {
  try {
    const newPost = new Post({
      content: req.body.content,
      uid: req.user.uid,
      platform: req.user.platform
    });
    await newPost.save();
    req.io.emit("new_post", newPost); // Real-time update
    res.send("post added");
  } catch (err) {
    res.send("error in adding post");
  }
};

const getposts = async (req, res) => {
  try {
    const posts = await Post.find({ platform: req.params.platform }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.send("error in getting posts");
  }
};

const like = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } });
    res.send("liked");
  } catch (err) {
    res.send("error in like");
  }
};

const share = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, { $inc: { shared: 1 } });
    res.send("shared");
  } catch (err) {
    res.send("error in share");
  }
};

const comment = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: req.body.comment } }
    );
    res.send("comment added");
  } catch (err) {
    res.send("error in comment");
  }
};
module.exports = { addpost, getposts, like, share, comment };
