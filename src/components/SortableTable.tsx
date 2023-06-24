import classNames from "classnames"
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted
} from "react-icons/ti"
import Table, {TableProps, TableConfig} from "./Table"
import useSort from "../hooks/useSort"

export default function SortableTable({ data, config }: TableProps) {
  const { setSort, sortBy, sortOrder, tableData } = useSort(data, config)


  const getIcons = (column: TableConfig) => {
    return column.label === sortBy ? (
      sortOrder === "asc" ? (
        <TiArrowSortedDown />
      ) : (
        <TiArrowSortedUp />
      )
    ) : (
      column.sortBy && <TiArrowUnsorted className="text-pink-500" />
    )
  }
  const updatedConfig = config.map((column: TableConfig) => {
    if (!column.sortBy) {
      return column
    }
    return {
      ...column,
      header: () => (
        <th
          key={column.label}
          className={classNames("text-left p-3 cursor-pointer", {
            "bg-pink-100 text-black": column.label === sortBy
          })}
          onClick={() => {
            setSort(column.label)
          }}
        >
          <div
            className={classNames("flex items-center justify-between")}
          >
            {column.label}
            {getIcons(column)}
          </div>
        </th>
      )
    }
  })
  return <Table data={tableData} config={updatedConfig} />
}
