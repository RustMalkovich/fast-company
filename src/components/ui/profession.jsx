import React from "react";
import { useProffesions } from "../../hooks/useProfessions";
import PropTypes from "prop-types";

const Profession = ({ id }) => {
    console.log(id);
    const { isLoading, getProfession } = useProffesions();
    const prof = getProfession(id);
    console.log(prof.name);
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else {
        return "loading ...";
    }
};
Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
