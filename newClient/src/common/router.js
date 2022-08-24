import { createRouter, createWebHashHistory } from "vue-router";

let routes = [
    { 
        path: "/", 
        component: () => import("../views/home/Home.vue"),
        meta: { transition: 'slide-left' }
    },
    { 
        path: "/login", 
        component: () => import("../views/user/Login.vue"),
        meta: { transition: 'slide-left' }
    },
    { 
        path: "/createuser", 
        component: () => import("../views/user/CreateUser.vue"),
        meta: { transition: 'slide-left' }
    },
    { 
        path: "/userinfo", 
        component: () => import("../views/user/UserInfo.vue"),
        meta: { transition: 'slide-left' }
    },
    { 
        path: "/postarticles", 
        component: () => import("../views/articles/PostArticles.vue"),
        meta: { transition: 'slide-left' }
    },
    { 
        path: "/articlescontent", 
        component: () => import("../views/articles/ArticleContent.vue"),
        meta: { transition: 'slide-left' }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export { router, routes };