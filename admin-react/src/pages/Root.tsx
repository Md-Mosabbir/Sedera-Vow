import { Outlet } from "react-router-dom"
import Container from "../components/Container"
import Navigation from "../components/Navigation"

const Root = () => {
  return (
    <main>
      <Navigation />
      <Container className="w-3/4 mx-auto">
        <Outlet />
      </Container>
    </main>
  )
}

export default Root
