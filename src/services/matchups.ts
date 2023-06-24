import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {nanoid} from "@reduxjs/toolkit";

// DEV ONLY!!!
const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

export interface Matchup {
  id: string;
  players: [];
  winner: string;
}

interface MatchupsResponse {
  matchups: Matchup[]
}

const matchupsApi = createApi({
  reducerPath: "matchups",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    fetchFn: async (...args) => {
      // REMOVE FOR PRODUCTION
      await pause(1000)
      return fetch(...args)
    }
  }),
  tagTypes: ["Matchups"],
  endpoints: (builder) => ({
    fetchMatchups: builder.query<MatchupsResponse, void>({
      query: () => {
        return {
          url: "/matchups?_sort=score&_order=desc",
          method: "GET"
        }
      }
    }),
    createMatchup: builder.mutation<Matchup, Partial<Matchup>>({
        query: (body) => {
            body.id = nanoid();
            return {
                url: `matchups/`,
                method: "POST",
                body
            }
        },
    }),
    updateMatchup: builder.mutation<Matchup, Partial<Matchup>>({
        query: ({id, ...patch}) => ({
            url: `matchups/${id}`,
            method: "PATCH",
            body: patch
        }),
        invalidatesTags: (result, error, arg) => [
            { type: "Matchups", id: arg.id },
        ],
    }),
  })
})

export const { useFetchMatchupsQuery, useCreateMatchupMutation, useUpdateMatchupMutation } = matchupsApi
export { matchupsApi }
