import React from "react"
import axios from "axios"

export const useRainbowButton = () => {
  const [rainbowConnector, setRainbowConnector] = React.useState(undefined)
  const [rainbowAccount, setRainbowAccount] = React.useState(undefined)

  const onConnectorInitialized = React.useCallback(
    rainbowConnector => setRainbowConnector(rainbowConnector),
    [] /* eslint-disable-line react-hooks/exhaustive-deps */
  )

  // useEffect hook that will be called everytime there is a change to 'connector'
  // Sign-in and Disconnect logic
  React.useEffect(() => {
    if (!rainbowConnector) return

    // Subscribe to connection events
    rainbowConnector.on("connect", (error, payload) => {
      if (error) {
        throw error
      }

      // Get provided accounts from payload object
      // destructure payload.params[0] --> accounts, reassigning variable name to rainbowAccount
      const { accounts: rainbowAccount } = payload.params[0]

      // axios POST request to heroku API
      // axios
      //   .post(`${process.env.accounts_api}`, {
      //     account: rainbowAccount,
      //   })
      //   .then(
      //     response => {
      //       console.log("RESPONSE:", response)
      //     },
      //     error => {
      //       console.log(error)
      //     }
      //   )

      // set accounts into state useState hook
      setRainbowAccount(rainbowAccount)
    })

    rainbowConnector.on("session_update", (error, payload) => {
      if (error) {
        throw error
      }

      // Get updated rainbowAccount
      const { rainbowAccount } = payload.params[0]
      setRainbowAccount(rainbowAccount)
    })

    rainbowConnector.on("disconnect", (error, payload) => {
      if (error) {
        throw error
      }

      // Delete connector
      // IMPORTANT if users reject the session request you have to
      // create a new session from scratch. `disconnect` will trigger
      // in that case
      setRainbowConnector(undefined)
      setRainbowAccount(undefined)
    })
  }, [rainbowConnector]) /* eslint-disable-line react-hooks/exhaustive-deps */

  const disconnect = React.useCallback(
    async () => rainbowConnector?.killSession(),
    [rainbowConnector]
  )

  // TODO
  // sendTransaction
  // signPersonalMessage
  // signTypedData

  return [rainbowConnector, rainbowAccount, onConnectorInitialized, disconnect]
}
