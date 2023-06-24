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
    <section className="absolute inset-0 flex flex-col">
      <header className="text-white lg:my-8 p-4 h-[160px] -mb-10 flex item-center justify-center flex flex-col w-full text-center sticky">
          <ReactSVG className="md:animate-dance text-pink-800 w-20 h-20 lg:h-40 lg:w-40 flex-1 mx-auto" src="logo.svg" />
          <h1 className="relative font-serif font-bold -top-10 lg:top-0 md:-mt-10 text-3xl lg:text-5xl">Balance ton chat</h1>
      </header>
      <main className="flex flex-1 justify-center pb-[164px]">
        <Outlet />
      </main>
      <NavBar routes={nav} className="fixed bottom-0 inset-x-0" />
      <div id="portal"></div>
    </section>
  )
}

export default App
