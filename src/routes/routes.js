import Layout from "../layouts/CenterLayout"
import Home from "../pages/Home"
import Login from "../pages/Login"

const routes = [
  {
    path: "/login",
    layout: <Layout />,
    content: <Login />,
    protected: false,
  },
  {
    path: "/",
    layout: <Layout />,
    content: <Home />,
    protected: true,
  },
]

export default routes
