import React, { useEffect, useState } from "react";
// import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useHistory, useParams } from "react-router-dom";

const EditUserPage = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const { userId } = useParams();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [professions, setProfession] = useState([]);
    const [qualities, setQualities] = useState([]);
    // const [errors, setErrors] = useState({});

    useEffect(() => {
        setIsLoading(true);

        api.users.getById(userId).then(({ profession, qualities, ...data }) => {
            setData((prevState) => ({
                ...prevState,
                ...data,
                qualities: qualities.map((quality) => ({
                    label: quality.name,
                    value: quality._id
                })),
                profession: profession._id
            }));
        });

        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // const isValid = validate();
        // if (!isValid) return;
        const { profession, qualities } = data;
        api.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then((data) => history.push(`/users/${data._id}`));
    };

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-4">
                {!isLoading && Object.keys(professions).length > 0 ? (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            // error={errors.name}
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            // error={errors.email}
                        />
                        <SelectField
                            label="Выбери свою профессию"
                            defaultOption="Выбрать..."
                            options={professions}
                            name="profession"
                            value={data.profession}
                            onChange={handleChange}
                            // error={errors.profession}
                        />
                        <RadioField
                            options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" },
                                { name: "Other", value: "other" }
                            ]}
                            value={data.gender}
                            name="sex"
                            onChange={handleChange}
                            label="Выберите ваш пол"
                        />
                        <MultiSelectField
                            options={qualities}
                            onChange={handleChange}
                            defaultOptions={data.qualities}
                            name="qualities"
                            label="Выберите ваши качества"
                        />
                        <button
                            type="submit"
                            // disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Обновить
                        </button>
                    </form>
                ) : (
                    "Loading..."
                )}
            </div>
        </div>
    );
};

export default EditUserPage;
