import React from "react";
// import { useProfessions } from "../../hooks/useProfessions";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessionById,
    getProfessionsLoadingStatus
} from "../../store/professions";

const Profession = ({ id }) => {
    // const { isLoading, getProfession } = useProfessions();
    // const prof = getProfession(id);
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const profession = useSelector(getProfessionById(id));

    if (!isLoading) {
        return <p>{profession.name}</p>;
    } else {
        return "Loading...";
    }
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
