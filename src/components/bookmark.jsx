import React from "react";

const BookMark = ({ bookmark }) => {
  if (bookmark === false) {
    return <i className="bi bi-bookmark"></i>;
  } else if (bookmark === true) {
    return <i className="bi bi-bookmark-fill"></i>;
  }
};

export default BookMark;
