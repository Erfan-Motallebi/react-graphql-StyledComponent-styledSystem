const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const _ = require("lodash");

const Book = require("../models/book");
const Author = require("../models/author");

// dummy data

//#region

// const bookz = [
//   {a
//     id: "1",
//     name: "Winner of the PULITZER PRIZE",
//     genre: "Novel",
//     yearOfRelease: 1960,
//     authorId: "1",
//   },
//   {
//     id: "2",
//     name: "Don Quixote",
//     genre: "Advanturous",
//     yearOfRelease: 1987,
//     authorId: "2",
//   },
//   {
//     id: "3",
//     name: "Lord of the Rings",
//     genre: "Sci-Fi",
//     yearOfRelease: 1998,
//     authorId: "3",
//   },
//   {
//     id: "4",
//     name: "Early Life",
//     genre: "Love",
//     yearOfRelease: 1748,
//     authorId: "2",
//   },
//   {
//     id: "5",
//     name: "To kill a Mockingbird",
//     genre: "novel",
//     yearOfRelease: 1847,
//     authorId: "1",
//   },
//   {
//     id: "6",
//     name: "The Silmarillian",
//     genre: "Advanturous",
//     yearOfRelease: 2001,
//     authorId: "3",
//   },
//   {
//     id: "7",
//     name: "Poet Soldier",
//     genre: "War",
//     yearOfRelease: 1874,
//     authorId: "2",
//   },
// ];

// const authorz = [
//   { id: "1", name: "Harper Lee", age: 54 },
//   { id: "2", name: "Miguel de Cervantes", age: 61 },
//   { id: "3", name: "J.R.R. Tolkien", age: 76 },
// ];

//#endregion

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    yearOfRelease: { type: GraphQLInt },
    authorId: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorId: { $eq: parent.id } });
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        yearOfRelease: { type: new GraphQLNonNull(GraphQLInt) },
        authorId: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        let BookModel = await new Book({
          name: args.name,
          genre: args.genre,
          yearOfRelease: args.yearOfRelease,
          authorId: args.authorId,
        });
        return await BookModel.save();
      },
    },
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parent, args) {
        let AuthorModel = await new Author({
          name: args.name,
          age: args.age,
        });
        return await AuthorModel.save();
      },
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Author.findById(args.id);
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
