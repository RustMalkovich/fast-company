import React from "react";
// import { useProfessions } from "../../hooks/useProfessions";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfessionById } from "../../store/professions";

const Profession = ({ id }) => {
    // const { isLoading, getProfession } = useProfessions();
    // const prof = getProfession(id);

    const profession = useSelector(getProfessionById(id));

    if (!profession) return "loading...";

    return <p>{profession.name}</p>;
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
