import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GetBookListsQuery } from "./queries/bookQueries";
import BookDetails from "./BookDetails";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { bookListsTheme, sectionDetails } from "../styles/theme";
import { COLORS } from "../styles/constants";

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box
  }
  body {
    background: ${COLORS.bodyBgColor}
  }
  ul.booklists {
    display: flex;
    width: 800px;
    flex-wrap: wrap;
    margin-top: 30px;
    li {
      list-style-type: none;
      padding: 20px 20px;
      /* border: none; */
      border-radius: 1rem;
      font-size: 1.3rem;
      background-color: lightgrey;
      width: 290px;
      margin: 10px;
      color: #003638;
      transition: all .5s ease-in;
      text-align: center;
      cursor: pointer;
      &:hover  {
        transition: all .5s ease-in;
        box-shadow: 0 0 20px 10px #B980F0, 1px 1px 20px 10px #B980F0 inset;
        letter-spacing: 2px
      }
    }
  }
`;

const StyledSection = styled("section")`
  display: ${({ theme: { display } }) => display};
  justify-content: ${({ theme: { justifyContent } }) => justifyContent};
  width: ${({ theme: { width } }) => width};
`;

function BookLists() {
  const { data, loading, error } = useQuery(GetBookListsQuery);
  // eslint-disable-next-line no-unused-vars
  const [selected, setSelected] = useState(null);
  const displayBooks = () => {
    if (loading) return <h1>Loading. . . .</h1>;
    if (error) return <h1>Error: `${error.message}`</h1>;
    return data.books.map(({ id, name }) => {
      return (
        <li key={id} onClick={() => setSelected(id)}>
          {name}
        </li>
      );
    });
  };
  return (
    <ThemeProvider theme={sectionDetails}>
      <StyledSection>
        <GlobalStyle />
        <ThemeProvider theme={bookListsTheme}>
          <ul className="booklists" display="flex">
            {displayBooks()}
          </ul>
        </ThemeProvider>
        <BookDetails selected={selected} />
      </StyledSection>
    </ThemeProvider>
  );
}
export default BookLists;
