import Page from "../components/Page"
import { useFetchPlayersQuery } from "../store"
import { Player } from "../services/players"
import { TableConfig } from "../components/Table"
import SortableTable from "../components/SortableTable";
import LoadingScreen from "../components/LoadingScreen";

const ScorePage = ()  => {
  const { data, isLoading } = useFetchPlayersQuery()

  const config:TableConfig[] = [
    {
      label: "Photo",
      render: (item: Player) => (
        <img
          className="w-16 h-16 lg:w-24 lg:h-24 rounded-full object-cover border-2 lg-border-8 border-solid border-white"
          src={item.url}
          alt={item.id}
        />
      )
    },
    {
      label: "Nickname",
      render: (item: Player) => (
        <span className="font-serif italic font-bold text-xl">{item.firstname}</span>
      ),
      sortBy: (item) => item.firstname
    },
    {
      label: "Score",
      render: (item: Player) => (
        <span className="font-bold font-serif text-3xl lg:text-5xl">{item.score}</span>
      ),
      sortBy: (item) => item.score
    }
  ]
  let content
  if (isLoading) {
    content = <LoadingScreen />
  }
  if (!isLoading && data?.length) {
    content = (
      <Page title="Top Chats">
        <SortableTable config={config} data={data} />
      </Page>
    )
  }
  return content
}

export default ScorePage
