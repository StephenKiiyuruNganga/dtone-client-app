import { Provider as StoreProvider } from "react-redux"
import RouteManager from "./routes"
import store from "./store"

function App() {
  return (
    <StoreProvider store={store}>
      <RouteManager />
    </StoreProvider>
  )
}

export default App
