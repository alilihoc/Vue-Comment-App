import PostAPI from "../api/comment";

const CREATING_COMMENT = "CREATING_COMMENT",
    CREATING_COMMENT_SUCCESS = "CREATING_COMMENT_SUCCESS",
    CREATING_COMMENT_ERROR = "CREATING_COMMENT_ERROR",
    FETCHING_COMMENTS = "FETCHING_COMMENTS",
    FETCHING_COMMENTS_SUCCESS = "FETCHING_COMMENTS_SUCCESS",
    FETCHING_COMMENTS_ERROR = "FETCHING_COMMENTS_ERROR";

export default {
    namespaced: true,
    state: {
        isLoading: false,
        isSuccess: false,
        error: null,
        comments: []
    },
    getters: {
        isLoading(state) {
            return state.isLoading;
        },
        hasError(state) {
            return state.error !== null;
        },
        error(state) {
            return state.error;
        },
        isSuccess(state) {
            return state.isSuccess;
        },
        hasComments(state) {
            return state.comments.length > 0;
        },
        comments(state) {
            return state.comments;
        }
    },
    mutations: {
        [CREATING_COMMENT](state) {
            state.isLoading = true;
            state.isSuccess = false;
            state.error = null;
        },
        [CREATING_COMMENT_SUCCESS](state, comment) {
            state.isLoading = false;
            state.isSuccess = true;
            state.error = null;
            state.comments.push(comment);
        },
        [CREATING_COMMENT_ERROR](state, error) {
            state.isLoading = false;
            state.isSuccess = false;
            state.error = error;
        },
        [FETCHING_COMMENTS](state) {
            state.isLoading = true;
            state.isSuccess = false;
            state.error = null;
            state.comments = [];
        },
        [FETCHING_COMMENTS_SUCCESS](state, comments) {
            state.isLoading = false;
            state.isSuccess = false;
            state.error = null;
            state.comments = comments;
        },
        [FETCHING_COMMENTS_ERROR](state, error) {
            state.isLoading = false;
            state.isSuccess = true;
            state.error = error;
            state.comments = [];
        }
    },
    actions: {
        async create({commit}, data) {
            commit(CREATING_COMMENT);
            try {
                let response = await PostAPI.create(data);
                commit(CREATING_COMMENT_SUCCESS, response.data);
                return response.data;
            } catch (error) {
                if (error.response.data) {
                    let responseData = error.response.data;
                    error = responseData['hydra:title'] ?? error

                    if (responseData['@type'] === 'ConstraintViolationList') {
                        error = responseData['hydra:description'] ?? error;
                    }
                }

                commit(CREATING_COMMENT_ERROR, error);
                return null;
            }
        },
        async findAll({commit}) {
            commit(FETCHING_COMMENTS);
            try {
                let response = await PostAPI.findAll();
                commit(FETCHING_COMMENTS_SUCCESS, response.data['hydra:member']);
                return response.data['hydra:member'];
            } catch (error) {
                commit(FETCHING_COMMENTS_ERROR, error);
                return null;
            }
        }
    }
};