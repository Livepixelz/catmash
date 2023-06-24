import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { playersApi } from "../services/players"
import { matchupsApi } from "../services/matchups"

export const store = configureStore({
  reducer: {
    [playersApi.reducerPath]: playersApi.reducer,
    [matchupsApi.reducerPath]: matchupsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(playersApi.middleware).concat(matchupsApi.middleware)
})

setupListeners(store.dispatch)

export { useFetchPlayersQuery, useUpdatePlayerMutation } from "../services/players"
export { useFetchMatchupsQuery, useCreateMatchupMutation, useUpdateMatchupMutation } from "../services/matchups"

export default store
