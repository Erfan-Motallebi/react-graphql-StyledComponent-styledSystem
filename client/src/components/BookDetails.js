import React from "react";
import { useQuery } from "@apollo/client";
import { GetBooklistDetails } from "./queries/bookQueries";
import { createGlobalStyle } from "styled-components";
import { COLORS } from "../styles/constants";

const GlobalStyle = createGlobalStyle`

  ul.select-book { 
    list-style: none;
    li.select-book-list {
      padding: 10px 15px ;
      text-shadow: 0 0 5px #628395;
      font-size: 1.4rem;
      border-right: solid 2px red; 
      border-left: solid 2px red; 
      width: 440px;
      margin: 20px;
      
  }
  }

  .section-details {
    div {
      border: none;
      background: ${COLORS.bgColor};
      padding: 5px 15px;
      margin: 15px;
      border-radius: .5rem;
      box-shadow: 3px 3px 10px 3px #B05B3B;
      transition: all 0.4s ease-in-out;
      cursor: pointer;
      &:hover {
        box-shadow: ${COLORS.boxShadow};
        transition: all 0.6s ease-in-out;
      }
    }
  }
`;

function BookDetails({ selected }) {
  const { loading, error, data } = useQuery(GetBooklistDetails, {
    variables: {
      id: selected,
    },
  });

  const displayBookDetails = () => {
    if (loading)
      return (
        <div>
          <h1>Loading . . .</h1>
        </div>
      );

    if (data) {
      const { book } = data;
      return (
        <section key={book.id} className="section-details">
          <h1
            style={{
              textShadow: "0px 1px 3px #0F044C, -1px 0 1px #A73489 ",
              fontSize: "1.5rem",
            }}
          >
            Book Details
          </h1>
          <div>
            <h1>BOOK</h1>
            <p>{book.genre}</p>
            <p>{book.name}</p>
            <p>{book.yearOfRelease}</p>
          </div>
          <div>
            <h1>Author</h1>
            <p>{book.author.name}</p>
            <p>{book.author.age}</p>
          </div>
          <div>
            <h1>Other Books of The Author</h1>
            {book.author.books.map(({ id, name }) => {
              return <p key={id}>{name}</p>;
            })}
          </div>
        </section>
      );
    } else if (!data || error) {
      return (
        <li className="select-book-list">
          Select a book to get a full details of the book
        </li>
      );
    }
  };

  return (
    <div>
      <GlobalStyle />
      <ul className="select-book">{displayBookDetails()}</ul>
    </div>
  );
}

export default BookDetails;
