import React from "react";
import PropTypes from "prop-types";
import TextField from "../textField";

const Search = ({ value, onChange }) => {
    return (
        <TextField
            type="search"
            name="search"
            placeholder="Search..."
            value={value}
            onChange={onChange}
        />
    );
};

Search.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default Search;
