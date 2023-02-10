import Vue from "vue";
import Vuex from "vuex";
import CommentModule from "./comment";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        comment: CommentModule
    }
});