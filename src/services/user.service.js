import httpServise from "./http.service";

const userEndpoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpServise.get(userEndpoint);
        return data;
    }
};

export default userService;
