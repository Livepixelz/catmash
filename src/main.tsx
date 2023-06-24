import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import App from "./App.tsx"
import MatchPage from "./pages/MatchPage.tsx"
import ScorePage from "./pages/ScorePage.tsx"
import store from "./store/index.ts"
import "./css/index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MatchPage />
      },
      {
        path: "/score",
        element: <ScorePage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
