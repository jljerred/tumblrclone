const {users, posts}=require("./data")
const { MongoClient }= require("mongodb");

require("dotenv").config();
const {MONGO_URI}=process.env;
// console.log(users, posts)
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
const batchImport=async()=>{
    const client=new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
            const db=client.db("db-name");
            await db.collection("users").insertMany(users)
            await db.collection("posts").insertMany(posts)
    } catch (err){
        console.log(err)
    } finally {client.close()}
}
batchImport()