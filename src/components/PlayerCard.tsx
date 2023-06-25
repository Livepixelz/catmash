import { ReactSVG } from "react-svg";
import { Player } from "../services/players"

type PlayerCardProps = {
  player: Player,
  handleClick: (id: string) => void
}
function PlayerCard({ player, handleClick }: PlayerCardProps) {
  const { id, url, firstname } = player

  const image = {
    alt: id,
    src: url,
  }

  return (
    <article className="relative flex-1">
      <figure
        className="relative cursor-pointer mb-8 w-30 h-30 md:w-56 md:h-56 xl:w-[400px] xl:h-[400px] aspect-square transition rounded-full overflow-hidden border-[16px] border-solid border-pink-700/20 hover:border-white hover:scale-105 hover:shadow-xl hover:shadow-pink-900/60 hover:rounded-full"
        onClick={() => {
          handleClick(id)
        }}
      >
        <ReactSVG className="w-20 h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" src="logo.svg" />
        <img
          className="relative h-full w-full  object-cover"
          src={url}
          alt={id}
        />
      </figure>
      <figcaption className="font-serif text-xl lg:text-3xl text-center italic font-bold text-white absolute w-full">
        {firstname}
      </figcaption>
    </article>
  )
}

export default PlayerCard
