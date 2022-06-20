import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AUTH_ACTIONS } from "../store/auth-slice"

const useAxios = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)

  // for debugging purposes only
  const [requestConfig, setRequestConfig] = useState()

  useEffect(() => {
    if (requestConfig) {
      console.log(
        "useAxios: request config data ====================>",
        requestConfig
      )
    }
  }, [requestConfig])

  const sendRequest = useCallback(
    async ({ method, api, body, params, noAuth }, applyData) => {
      // for debugging purposes only
      setRequestConfig({
        method,
        api,
        body,
        params,
        token,
      })

      setIsLoading(true)

      try {
        const { data, status } = await axios({
          // baseURL: BASE,
          method: method ? method : null,
          url: api ? api : null,
          data: body ? body : null,
          // headers: noAuth
          //   ? {
          //       Accept: "application/json",
          //     }
          //   : {
          //       Accept: "application/json",
          //       Authorization: `Bearer ${token}`,
          //     },
          params: params ? params : null,
          timeout: 20000,
        })

        console.log("useAxios: response status ==================> ", status)
        console.log("useAxios: response data ==================> ", data)

        applyData?.(data)
      } catch (error) {
        if (error?.response) {
          console.log(
            "useAxios: error status ==================> ",
            error.response?.status
          )
          console.log(
            "useAxios: error response data ==================> ",
            error.response?.data
          )
        }
      }

      setIsLoading(false)
    },
    [token]
  )

  return { isLoading, sendRequest }
}

export default useAxios
