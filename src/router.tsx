import { createBrowserRouter } from "react-router-dom";
import AuthForm from "./Component/Auth/Auth";
import Login from "./Component/Login/Login";
import AddPost from "./Component/Post/Add/AddPost";

import UpdatePost from "./Component/Post/Update/UpdatePost";
import ListUser from "./Component/User/ListUser";
import ListPost from "./Component/Post/Lisst/ListPost";


export const router = createBrowserRouter([
    {path: "/", element: <AuthForm/>},
    {path: "/login", element: <Login/>},
    {path: "/add", element: <AddPost/>},
    {path: "/list", element: <ListPost/>},
    {path: "/update/:id", element: <UpdatePost />},
    {path: "/user", element: <ListUser />},
])