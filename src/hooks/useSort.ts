import { useEffect, useState } from "react"
import { TableConfig } from "../components/Table"


export default function useSort(data: any[], config: TableConfig[]) {
  const [sortBy, setSortBy] = useState("")
  const [sortOrder, setSortOrder] = useState("asc")
  const [tableData, setTableData] = useState(data)

  const setSort = (label: string) => {
    if (sortBy === label) {
      if (sortOrder === "asc") {
        setSortOrder("desc")
      } else if (sortOrder === "desc") {
        setSortOrder("")
        setSortBy("")
        setTableData(data)
      }
    } else {
      setSortBy(label)
      setSortOrder("asc")
    }
  }

  const getValue = (item: any) => {
    const configObj =  config.find((key: any) => key.label === sortBy)
    return configObj?.sortBy ? configObj?.sortBy(item) : item.value
  }

  const compareFunction = (a: any, b: any) => {
    const valueA = getValue(a)
    const valueB = getValue(b)
    const reverse = sortOrder === "desc" ? -1 : 1
    if (valueA < valueB) {
      return -1 * reverse;
    }
    if (valueA > valueB) {
      return 1 * reverse;
    }
    return 0;
  }

  useEffect(() => {
    const updatedData = sortBy
      ? [
          ...tableData.sort(compareFunction)
        ]
      : [...tableData]
    setTableData(updatedData)
  }, [sortBy, sortOrder])

  return {
    setSort,
    sortBy,
    sortOrder,
    tableData
  }
}
