import React from "react";
// import { useProfessions } from "../../hooks/useProfessions";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessionsByIds,
    getProfessionsLoadingStatus
} from "../../store/professions";

const Profession = ({ id }) => {
    // const { isLoading, getProfession } = useProfessions();
    const isLoading = useSelector(getProfessionsLoadingStatus());
    // const prof = getProfession(id);
    const prof = useSelector(getProfessionsByIds(id));

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
