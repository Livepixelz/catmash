import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// DEV ONLY!!!
const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

export interface Player {
  id: string;
  name: string;
  firstname: string;
  url: string;
  score: number;
}

interface PlayersResponse {
  players: Player[]
}

const playersApi = createApi({
  reducerPath: "players",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    fetchFn: async (...args) => {
      // REMOVE FOR PRODUCTION
      await pause(1000)
      return fetch(...args)
    }
  }),
  tagTypes: ["Players"],
  endpoints: (builder) => ({
    fetchPlayers: builder.query<PlayersResponse|any, void>({
      query: () => {
        return {
          url: "/players?_sort=score&_order=desc",
          method: "GET"
        }
      }
    }),
    updatePlayer: builder.mutation<Player, Partial<Player>>({
        query: ({id, ...patch}) => ({
            url: `players/${id}`,
            method: "PATCH",
            body: patch
        }),
        invalidatesTags: (result, error, arg) => [
            { type: "Players", id: arg.id },
        ],
    }),
  })
})

export const { useFetchPlayersQuery } = playersApi
export { playersApi }
