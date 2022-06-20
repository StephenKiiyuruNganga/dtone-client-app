import { Box } from "@mui/system"
import { GoogleLogout } from "react-google-login"
import { useDispatch } from "react-redux"
import { CLIENT_ID } from "../constants"
import { AUTH_ACTIONS } from "../store/auth-slice"

const GoogleLogoutBtn = () => {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(AUTH_ACTIONS.updateToken(null))
    dispatch(AUTH_ACTIONS.updateUserInfo(null))
    // console.log("Logout successful")
  }

  return (
    <Box>
      <GoogleLogout
        clientId={CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={logoutHandler}
      />
    </Box>
  )
}

export default GoogleLogoutBtn
