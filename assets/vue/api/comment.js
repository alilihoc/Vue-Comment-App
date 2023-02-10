import axios from "axios";

export default {
    create(data) {
        return axios.post("/api/comments", data);
    },
    findAll() {
        return axios.get("/api/comments");
    }
};