import { Box } from "@mui/material"
import { gapi } from "gapi-script"
import { GoogleLogin } from "react-google-login"
import { useDispatch } from "react-redux"
import { CLIENT_ID } from "../constants"
import { AUTH_ACTIONS } from "../store/auth-slice"

const GoogleLoginBtn = () => {
  const dispatch = useDispatch()

  const successHandler = (res) => {
    // console.log("Login success", res.profileObj)
    const token = gapi.auth.getToken().access_token
    // console.log("token", token)
    dispatch(AUTH_ACTIONS.updateUserInfo(res.profileObj))
    dispatch(AUTH_ACTIONS.updateToken(token))
  }
  const failureHandler = (res) => {
    console.log("Login failed", res)
  }

  return (
    <Box>
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="Login"
        onSuccess={successHandler}
        onFailure={failureHandler}
        cookiePolicy="single_host_origin"
        isSignedIn={false}
      />
    </Box>
  )
}

export default GoogleLoginBtn
