import { RouterProvider } from "react-router-dom"
import { router } from "./routes/Route"
import 'bootstrap/dist/css/bootstrap-grid.min.css'

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App