import Page from "../components/Page"
import PlayerCard from "../components/PlayerCard"
import LoadingScreen from "../components/LoadingScreen"
import { FaBolt } from "react-icons/fa"
import { generateAllMatchups } from "../utils"
import { useFetchPlayersQuery, useUpdatePlayerMutation } from "../store"
import { Matchup } from "../services/matchups"
import { Player } from "../services/players"
import { useEffect, useState } from "react"

const MatchPage = ()  => {

  const { data: playersData, isLoading: isPlayersLoading } = useFetchPlayersQuery()

  const [updatePlayer] = useUpdatePlayerMutation();
  
  const localHistory = localStorage.getItem("matchups") ? JSON.parse(localStorage.getItem("matchups") ?? '') : []

  const [matchupsHistory, setMatchupsHistory] = useState(localHistory)

  const [matchup, setMatchup] = useState<Matchup | null>(null)
  const [playerOne, setPlayerOne] = useState<Player | null>(null)
  const [playerTwo, setPlayerTwo] = useState<Player | null>(null)

  const handlePlayerClick = (id: string) => {
    const winner = id === playerOne?.id ? playerOne : playerTwo
    if (matchup && winner) {
      updatePlayer({ id, score: winner.score + 1 })
      markMatchupAsPlayed(matchup)
      //console.log(updatePlayerResults.data)
    }
  }

  const markMatchupAsPlayed = (matchup: Matchup) => {
    matchupsHistory.push(matchup.players)
    setMatchupsHistory(matchupsHistory)
    localStorage.setItem("matchups", JSON.stringify(matchupsHistory))
  }

  useEffect(() => {
    const pick = (matchups: string[], matchupsHistory: []):string[] => {
      const possibleNewMatchups:any[] = matchups.filter((m) => {
        return !(matchupsHistory.findIndex((h) => {
          return m.includes(h[0]) && m.includes(h[1])
        }) > -1)
      })
      const keys = Object.keys(possibleNewMatchups)
      const randomKey:number = +keys[Math.floor(Math.random() * keys.length)]
      const retVal:string[] = possibleNewMatchups[randomKey]
      return retVal
    }
    if (playersData?.length > 0) {
      const matchups:string[] = generateAllMatchups(playersData)
      
      const players:string[] = pick(matchups, matchupsHistory)
      
      setPlayerOne(playersData.find((p:Player) => p.id === players[0]))
      setPlayerTwo(playersData.find((p:Player) => p.id === players[1]))
      setMatchup({
        players
      })
    }
  }, [playersData])
  
  let content

  if (!isPlayersLoading && playerOne && playerTwo) {
    content = (
      <Page title="Match">
        <div className="flex items-center justify-center gap-4 pb-24 lg:pb-40 mx-8 relative">
          <PlayerCard player={playerOne} handleClick={handlePlayerClick} />
          <div className="font-bold text-4xl italic text-pink-700 pointer-events-none"><FaBolt className="absolute z-0 text-white w-[300px] h-auto top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 opacity-5" /><span className="relative font-serif text-white text-2xl md:text-5xl">VS</span></div>
          <PlayerCard player={playerTwo} handleClick={handlePlayerClick} />
        </div>
      </Page>)
  } else {
    content = <LoadingScreen />
  }
  return content
}

export default MatchPage
