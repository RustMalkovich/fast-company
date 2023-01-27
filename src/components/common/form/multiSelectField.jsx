import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;

    const handleChange = (value) => {
        onChange({ name, value });
    };

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                options={optionsArray}
                closeMenuOnSelect={false}
                name={name}
                defaultValue={defaultValue}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
            />
        </div>
    );
};
MultiSelectField.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
export default MultiSelectField;
