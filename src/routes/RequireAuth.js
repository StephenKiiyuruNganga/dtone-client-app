import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

const RequireAuth = (props) => {
  const { token } = useSelector((state) => state.auth)
  const location = useLocation()

  let renderItem = props.children

  if (!token) {
    renderItem = <Navigate to="/login" state={{ from: location }} />
  }

  return renderItem
}

export default RequireAuth
