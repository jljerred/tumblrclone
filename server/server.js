const express = require("express");
const { auth } = require("express-openid-connect");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;

const {
  DEV_PORT,
  AUTH0_ISSUER_BASE_URL,
  AUTHO0_CLIENT_ID,
  BASE_URL,
  SESSION_SECRET,
  MONGO_URI,
} = process.env;
const { MongoClient, ObjectId } = require("mongodb");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

express()
  .use(express.json())

  .get("/hello", (req, res) =>
    res.status(200).json({ status: 200, message: "hi" })
  )
  //LOGIN
  .post("/api/login", async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("db-name");
    const result = await db
      .collection("users")
      .findOne({ email: req.body.email });
    let newUser;
    console.log(result, "result");
    if (!result) {
      await db.collection("users").insertOne(req.body);
      newUser = req.body;
    } else {
      newUser = result;
    }
    res.status(200).json({ newUser });
    client.close();
  })

  //REGISTER
  .patch("/api/register", async (req, res) => {
    console.log(req.body);
    const id = uuidv4();
    const { _id, handle, displayName, bio } = req.body;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("db-name");
    const result = await db
      .collection("users")
      .updateOne(
        { _id: ObjectId(_id) },
        { $set: { id, handle, displayName, bio } }
      );
    if (result.modifiedCount) {
      res.status(200).json({
        status: 200,
        message: "registered",
        data: result,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "user cannot be made",
        result,
      });
    }
    client.close();
  })

  //NEWPOST
  .post("/api/post", async (req, res) => {
    const { post, authorHandle, media, comments } = req.body;
    const id = uuidv4();
    const newPost = {
      id,
      authorHandle,
      repostOf: "",
      likedBy: [],
      repostedBy: [],
      post,
      media,
      comments: [],
    };
    const client = new MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db("db-name");
    const result = await db.collection("posts").insertOne(newPost);
    res.status(200).json({
      status: 200,
      message: "new post",
      data: newPost,
    });
  })

  //PROFILE
  .get("/api/profile/:handle", async (req, res) => {
    const { handle } = req.params;
    const client = new MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db("db-name");
    const profile = await db.collection("users").findOne({ handle });
    const posts = await db
      .collection("posts")
      .find({ authorHandle: handle })
      .toArray();

    res.status(200).json({
      status: 200,
      message: "user found",
      profile: profile,
      posts: posts,
    });
  })

  //USERS
  .get("/api/users", async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
      await client.connect();
      const db = client.db("db-name");
      const users = await db.collection("users").find().toArray();
      const handles = users.map((user) => {
        return user.handle;
      });

      res.status(200).json({
        status: 200,
        message: "users",
        users: handles,
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: "user not found",
      });
    }
  })

  //LIKE
  .patch("/api/likepost", async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const { handle, postId } = req.body;
    try {
      await client.connect();
      const db = client.db("db-name");
      const result = await db
        .collection("posts")
        .updateOne({ id: postId }, { $push: { likedBy: handle } });
      res.status(200).json({
        status: 200,
        message: "like post",
        result: result,
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: "could not like post",
      });
    } finally {
      client.close();
    }
  })

  //COMMENT
  .post("/api/comment", async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const { handle, id, comment } = req.body;
    try {
      await client.connect();
      const db = client.db("db-name");
      const result = await db
        .collection("posts")
        .updateOne({ id }, { $push: { comments: { comment, handle } } });
      res.status(200).json({
        status: 200,
        message: "commented",
        result: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  })

  //HOMEFEED
  .get("/api/homefeed", async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
      await client.connect();

      const db = client.db("db-name");
      //COMMENT BACK IN ONCE FOLLOWING FUNCTIONALITY EXISTS
      // const profile = await db.collection("users").findOne({ handle });
      const posts = await db.collection("posts").find().toArray();
      res.status(200).json({
        status: 200,
        message: "homefeed",
        posts: posts,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    } finally {
      client.close();
    }
  })

  .listen(8000, () => {
    console.log("listening on port 8000");
  });
