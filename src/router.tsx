import { createBrowserRouter } from "react-router-dom";
import AuthForm from "./Component/Auth/Auth";
import Login from "./Component/Login/Login";
import AddPost from "./Component/Post/Add/AddPost";
import UpdatePost from "./Component/Post/Update/UpdatePost";
import ListUser from "./Component/User/ListUser";
import ListPost from "./Component/Post/Lisst/ListPost";
import Layouts from "./Component/Layout/Layout";
import UpdateUser from "./Component/User/UpdateUser";


export const router = createBrowserRouter([
    {path: "/sigin", element: <AuthForm/>},
    {path: "/login", element: <Login/>},
    {path: "", element: <Layouts /> , children: [
        {path: "user", element: <ListUser />},
        {path: "updates/:id", element: <UpdateUser/>},
        {path: "update/:id", element: <UpdatePost />},
        {path: "list", element: <ListPost/>},
        {path: "add", element: <AddPost/>}
    ]},
])