interface LayoutsProps {
  layouts: [];
}

interface LayoutProps {
  columns: [];
  margin_top: string;
  margin_bottom: string;
  padding_top: string;
  padding_bottom: string;
}

interface ColumnProps {
  column_id: number;
  col: ColProps;
}

interface ColProps {
  column_count: number;
}

const GridLayouts = ({ layouts }: LayoutsProps) => {
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
          if (!columns || !columns.length) return;
          return (
            <div
              className={`container columns-${columns && columns.length} 
              pt-${padding_top && padding_top} 
              pb-${padding_bottom && padding_bottom} 
              mt-${margin_top && margin_top} 
              mb-${margin_bottom && margin_bottom}`}
              key={index}
            >
              {columns.map((column: ColumnProps, index) => {
                return (
                  <div key={index}>
                    Column id {column?.column_id} - Column count
                    {column?.col.column_count}
                  </div>
                );
              })}
            </div>
          );
        }
      )}
    </div>
  );
};

export default GridLayouts;
