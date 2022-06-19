import { BrowserRouter, Route, Routes } from "react-router-dom"
import RequireAuth from "./RequireAuth"
import routes from "./routes"

const RouteManager = () => {
  const protectedRoutes = routes
    .filter((r) => r.protected)
    .map((r, idx) => (
      <Route key={"pro" + idx} element={r.layout}>
        <Route
          path={r.path}
          exact
          element={<RequireAuth>{r.content}</RequireAuth>}
        />
      </Route>
    ))

  const publicRoutes = routes
    .filter((r) => !r.protected)
    .map((r, idx) => (
      <Route key={"pub" + idx} element={r.layout}>
        <Route path={r.path} exact element={r.content} />
      </Route>
    ))

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes}
        {protectedRoutes}
      </Routes>
    </BrowserRouter>
  )
}

export default RouteManager
