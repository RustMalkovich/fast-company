import httpServise from "./http.service";

const userEndpoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpServise.get(userEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpServise.put(
            userEndpoint + payload._id,
            payload
        );
        return data;
    }
};

export default userService;
