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
    baseUrl: import.meta.env.VITE_API_BASE_URL as string,
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
      providesTags: (result, _error) => {
        const tags = result.map((player:Player) => {
          return { type: 'Players', id: player.id };
        });
        tags.push({ type: 'Players', id: 'LIST' });
        return tags
      },
    }),
    updatePlayer: builder.mutation<Player, Partial<Player>>({
        query: ({id, ...patch}) => ({
            url: `players/${id}`,
            method: "PATCH",
            body: patch
        }),
        invalidatesTags: (_result, _error, arg) => [
            { type: "Players", id: arg.id },
            { type: 'Players', id: 'LIST' }
        ],
    }),
  })
})

export const { useFetchPlayersQuery, useUpdatePlayerMutation } = playersApi
export { playersApi }
