import Center from "../layouts/Center"
import Home from "../pages/Home"
import Login from "../pages/Login"

const routes = [
  {
    path: "/login",
    layout: <Center />,
    content: <Login />,
    protected: false,
  },
  {
    path: "/",
    layout: <Center />,
    content: <Home />,
    protected: true,
  },
]

export default routes
