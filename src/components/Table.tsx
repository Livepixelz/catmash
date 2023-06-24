import classNames from "classnames"
import { Fragment, ReactElement } from "react"

export type TableProps = {
  data: any[],
  config: TableConfig[]
}

export type TableConfig = {
  label: string,
  render: (item: any) => ReactElement,
  sortBy?: (item: any) => ReactElement,
  header?: () => ReactElement
}

const Table = ({ data, config }: TableProps) => {
  return (
    <table className=" shadow-md shadow-pink-900 rounded-lg max-w-[600px] w-full mx-8">
      <thead>
        <tr className="border-b border-solid border-pink-200 bg-pink-800 text-white rounded-full overflow-hidden">
          {config.map((column) => {
            if (column.header) {
              return <Fragment key={column.label}>{column.header()}</Fragment>
            } else {
              return (
                <th className="text-left p-3" key={column.label}>
                  {column.label}
                </th>
              )
            }
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr
            key={item.id}
            className="hover:relative hover:z-40 transition border-b border-solid border-pink-100 even:bg-pink-50 odd:bg-pink-100 hover:scale-105 hover:shadow-xl hover:shadow-pink-700/20 hover:rounded-full overflow-hidden"
          >
            {config.map((column) => (
              <td key={column.label} className={classNames("text-left p-3")}>
                {column.render(item)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
