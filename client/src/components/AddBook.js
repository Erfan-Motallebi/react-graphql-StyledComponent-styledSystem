import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import {
  background,
  border,
  borderRadius,
  fontSize,
  padding,
  width,
} from "styled-system";
import { COLORS } from "../styles/constants";
import {
  GetAuthorListsQuery,
  AddBookMutation,
  GetBookListsQuery,
} from "./queries/bookQueries";

const StyledButton = styled("button")`
  ${padding}
  ${background}
  ${borderRadius}
  ${fontSize}
  ${border}
   margin-left: 100px;
  ${width}
  transition: all 0.4s ease-in-out;
  cursor: pointer;
  &:hover {
    transition: all 0.4s ease-in-out;
    box-shadow: 0 0 15px 5px #b05b3b;
  }
`;

const StyledInput = styled("input")`
  margin: 10px 30px;
  font-size: 1.2rem;
  padding: 10px 15px;
  outline-style: none;
  border: none;
  border-radius: 0.5rem;
  background: #ffa0a0;
  width: 250px;
  display: block;
  transition: all 0.4s ease-in-out;
  &::placeholder {
    color: #262a53;
  }
  &:focus {
    transition: all 0.4s ease-in-out;
    width: 350px;
  }
`;

const StyledSelected = styled.select`
  padding: 10px 20px;
  font-size: 3ex;
  outline-style: none;
  margin: 10px 20px;
  border-radius: 0.3rem;
  background: #628395;
  transition: all 0.4s ease-in-out;
  &:hover {
    transition: all 0.4s ease-in-out;
    box-shadow: ${COLORS.boxShadow};
  }
`;

function AddBook() {
  const [values, setValues] = useState({
    name: "",
    genre: "",
    yearOfRelease: "",
    authorId: "",
  });
  const { data, loading, error } = useQuery(GetAuthorListsQuery);
  const [AddBookList] = useMutation(AddBookMutation);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    AddBookList({
      variables: {
        name: values.name,
        genre: values.genre,
        yearOfRelease: +values.yearOfRelease,
        authorId: values.authorId,
      },
      refetchQueries: [
        {
          query: GetBookListsQuery,
        },
      ],
    });
  };

  const displayAuthor = () => {
    if (loading)
      return (
        <option value="loading" disabled>
          Loading . . .{" "}
        </option>
      );
    if (error)
      return (
        <option value="error" disabled>
          `${error.message}`
        </option>
      );
    return data.authors.map(({ id, name }) => {
      return (
        <option value={id} key={id}>
          {name}
        </option>
      );
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <form onSubmit={(e) => submitHandler(e)}>
        <StyledInput
          type="text"
          name="name"
          id="name"
          onChange={(e) => onChangeHandler(e)}
          placeholder="Name of the book"
        />{" "}
        <br />
        <StyledInput
          type="text"
          name="genre"
          id="genre"
          onChange={(e) => onChangeHandler(e)}
          placeholder="Genre of the book"
        />{" "}
        <br />
        <StyledInput
          placeholder="Year of the release"
          onChange={(e) => onChangeHandler(e)}
          type="text"
          name="yearOfRelease"
          id="yearOfRelease"
        />{" "}
        <br />
        <StyledSelected
          name="author"
          id="author"
          onChange={(e) => setValues({ ...values, authorId: e.target.value })}
        >
          <option>Select an auther</option>
          {displayAuthor()}
        </StyledSelected>{" "}
        <br /> <br />
        <StyledButton
          className="plus"
          padding="10px 30px"
          fontSize="1.4rem"
          background="#D79771"
          border="none"
          borderRadius="1.2rem"
          width="100px"
        >
          +
        </StyledButton>
      </form>
    </div>
  );
}

export default AddBook;
