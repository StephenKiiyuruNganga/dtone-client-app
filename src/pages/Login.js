import { gapi } from "gapi-script"
import { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import GoogleLoginBtn from "../components/GoogleLoginBtn"
import PageWrapper from "../components/PageWrapper"
import { CLIENT_ID } from "../constants"

const Login = () => {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const initialize_auth_client = useCallback(() => {
    gapi.client.init({
      clientId: CLIENT_ID,
      scope: "",
    })
  }, [])

  // auth initialization effects
  useEffect(() => {
    gapi.load("client:auth2", initialize_auth_client)
  }, [initialize_auth_client])

  // redirect effects
  useEffect(() => {
    if (token) {
      navigate("/", { replace: true })
    }
  }, [token, navigate])

  return (
    <PageWrapper title="Login using:">
      <GoogleLoginBtn />
    </PageWrapper>
  )
}

export default Login
