import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"
import { MdScoreboard, MdLeaderboard } from "react-icons/md"
import { ReactSVG } from "react-svg";

function App() {
  const nav = [
    {
      label: "Match",
      to: "/",
      icon: <MdScoreboard className="w-8 lg:w-16 h-auto" />
    },
    {
      label: "Score",
      to: "/score",
      icon: <MdLeaderboard className="w-8 lg:w-16 h-auto" />
    }
  ]
  return (
    <section className="absolute inset-0">
      <header className="text-white my-8 p-4 h-[160px] flex item-center justify-center flex flex-col w-full text-center sticky">
          <ReactSVG className="text-pink-800 h-40 w-40 flex-1 mx-auto" src="logo.svg" />
          <h1 className="font-serif font-bold -mt-10 text-3xl lg:text-5xl">Balance ton chat</h1>
      </header>
      <main className="h-screen flex justify-center pb-[164px]">
        <Outlet />
      </main>
      <NavBar routes={nav} className="fixed bottom-0 inset-x-0" />
      <div id="portal"></div>
    </section>
  )
}

export default App
