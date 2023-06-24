import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

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
  }),
  tagTypes: ["Players"],
  endpoints: (builder) => ({
    fetchPlayers: builder.query<PlayersResponse|any, void>({
      query: () => {
        return {
          url: "/players?_sort=score&_order=desc",
          method: "GET"
        }
      },
      providesTags: (result, error) => {
        return result.map((player:Player) => {
          return { type: 'Players', id: player.id };
        });
      },
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

export const { useFetchPlayersQuery, useUpdatePlayerMutation } = playersApi
export { playersApi }
