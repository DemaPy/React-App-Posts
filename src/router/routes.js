import { Navigate } from "react-router-dom";
import About from "../pages/About";
import Login from "../pages/Login";
import PostPage from "../pages/PostPage";
import Posts from "../pages/Posts";

export const privateRoutes = [
    {path: '/about', element: <About></About>, exact: true},
    {path: '/posts', element: <Posts></Posts>, exact: true},
    {path: '/posts/id', element:<PostPage></PostPage>, exact: true},
]



export const publicRoutes = [
    {path: '/login', element:<Login></Login>, exact: true},
]