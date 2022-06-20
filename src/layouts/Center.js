import { Container } from "@mui/system"
import { Outlet } from "react-router"

const Center = () => {
  return (
    <Container
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // border: "solid",
      }}
    >
      <Outlet />
    </Container>
  )
}

export default Center
