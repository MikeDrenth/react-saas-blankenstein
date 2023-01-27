interface LayoutProps {
  columns: []
  margin_top: number
  margin_bottom: number
  padding_top: number
  padding_bottom: number
}

const GridLayouts = ({ layouts }) => {
  if (!layouts || !layouts.length) return
  return (
    <div>
      {layouts.map(
        (
          {
            columns,
            margin_top,
            margin_bottom,
            padding_top,
            padding_bottom,
          }: LayoutProps,
          index: number
        ) => {
          if (!columns || !columns.length) return
          return (
            <div
              className={`container columns-${columns && columns.length} 
              pt-${padding_top && padding_top} 
              pb-${padding_bottom && padding_bottom} 
              mt-${margin_top && margin_top} 
              mb-${margin_bottom && margin_bottom}`}
              key={index}
            >
              {columns.map((column, index) => {
                console.log(column, 'col')
                return (
                  <div key={index}>
                    Column id {column.column_id} - Column count
                    {column.col.column_count}
                  </div>
                )
              })}
            </div>
          )
        }
      )}
    </div>
  )
}

export default GridLayouts
