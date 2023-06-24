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

export { useFetchPlayersQuery } from "../services/players"
export { useFetchMatchupsQuery } from "../services/matchups"
export { useCreateMatchupMutation, useUpdateMatchupMutation } from "../services/matchups"

export default store
