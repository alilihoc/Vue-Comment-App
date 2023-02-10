import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Comments from "../views/Comments";

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    routes: [
        { path: "/home", component: Home },
        { path: "/comments", component: Comments },
        { path: "*", redirect: "/home" }
    ]
});