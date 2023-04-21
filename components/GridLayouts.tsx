import ContentComponent from "./ContentComponent";
import { useState, useEffect } from "react";

interface themeColor {
  themeColor: ThemeColors;
}
interface LayoutsProps {
  layouts: []; // Aangeven welke velden hier in zitten, dit kan via een Type gebeuren.
  stylesheet: any;
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

interface ThemeColors {
  [key: string]: string;
}

const GridLayouts = ({ layouts, stylesheet }: LayoutsProps) => {
  const [{ layoutRows } = { layoutRows: [] }] = layouts;

  console.log(stylesheet, "123123");

  return (
    <div className="mt-8">
      {layoutRows?.map(({ columns }: LayoutProps, index: number) => {
        if (!columns || !columns.length) return;
        return (
          <div
            className={`container mx-auto mb-8 grid grid-cols-3 gap-10 font-mono text-white text-sm leading-6 rounded-lg`}
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
                  <ContentComponent
                    colors={stylesheet}
                    key={index}
                    content={component.content}
                  />
                );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GridLayouts;
