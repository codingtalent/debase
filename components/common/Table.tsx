import type { FC } from 'react'

interface TableHeader {
  className: string;
  title: string;
}
interface Props {
  header: TableHeader[];
  renderTableContent: () => FC;
  children: any
}
const Table: FC<Props> = ({ header, children }) => {
  return (
    <div className="mb-6">
      <div className="table-header">
        {header.map((h) => (
          <div key={h.title} className={h.className}>{h.title}</div>
        ))}
      </div>
      <div className="table-content">
        {children}
      </div>
    </div>
  )
}

export default Table
