import AboutPage from "../pages/AboutPage";
import SinglePostPage from "../pages/SinglePostPage";
import PostsPage from "../pages/PostsPage";
import LoginPage from "../pages/LoginPage";
import PostsPageRibbon from "../pages/PostsPageRibbon";

export const privateRoutes = [
  {path: '/about', component: AboutPage, exact: true},
  {path: '/posts', component: PostsPage, exact: true},
  {path: '/postsRibbon', component: PostsPageRibbon, exact: true},
  {path: '/posts/:id', component: SinglePostPage, exact: true},
]

export const publicRoutes = [
  {path: '/login', component: LoginPage, exact: true},
]

