const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const cors = require("cors");

const app = express();

mongoose.connect(
  "mongodb+srv://eric:test123@reactjs-graphql-books.q02nf.mongodb.net/reactjs-graphql-books?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

mongoose.connection
  .once("open", () => console.info("connected to the DB [ MongoDB ]"))
  .on("error", (err) => {
    console.log({
      error: err,
    });
  });

app.use(cors());

app.use(
  "/api/books",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(5000, "localhost", (err) => {
  if (!err) {
    console.info(`served at http://localhost:5000`);
  } else {
    console.error({
      error: err,
    });
  }
});
