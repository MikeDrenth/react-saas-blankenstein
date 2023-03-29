import ContentComponent from "./ContentComponent";

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
  component: component;
  component_type: string;
}

interface component {
  component_type: string;
  content: any;
}

interface ColProps {
  column_count: number;
}

const GridLayouts = ({ layouts }: LayoutsProps) => {
  return (
    <div className="mt-8">
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
              className={`container mx-auto mb-8 grid grid-cols-3 gap-10 font-mono text-white text-sm leading-6 bg-stripes-fuchsia rounded-lg`}
              key={index}
            >
              {columns.map(({ component }: ColumnProps, index) => {
                if (
                  component &&
                  component.component_type &&
                  component.component_type === "content" &&
                  component.content.content_content
                )
                  return (
                    <ContentComponent key={index} content={component.content} />
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
