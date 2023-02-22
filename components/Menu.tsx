import { useState, useRef, useEffect } from "react";

interface Pages {
  language_id?: number;
  page_hidden?: string;
  page_hidden_menu?: string;
  page_highlight?: string;
  page_id?: number;
  page_order?: number;
  page_title?: string;
  page_url?: string;
  parent_id?: number;
  page_menuname?: string;
  site_id?: number;
  type_id?: 0;
}

interface PagesProps {
  pages?: Pages;
  language_id?: number;
  page_hidden?: string;
  page_hidden_menu?: string;
  page_highlight?: string;
  page_id?: number;
  page_order?: number;
  page_title?: string;
  page_url?: string;
  parent_id?: number;
  page_menuname?: string;
  site_id?: number;
  type_id?: 0;
  children?: [];
  page?: [];
  layouts?: [];
}

interface PageProps {
  page_menuname: string;
  page_hidden: string;
  page_hidden_menu: string;
  page_id: number;
  children: [];
  page_url: string;
}

const DropdownMenu = ({ pages }: PagesProps) => {
  const [menuOpen, SetMenuOpen]: any = useState("");
  const ref = useRef<any>(null);

  useEffect(() => {
    const openMenuHandler = (e: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target)) {
        SetMenuOpen("");
      }
    };

    document.addEventListener("mousedown", openMenuHandler);

    return () => {
      document.removeEventListener("mousedown", openMenuHandler);
    };
  }, [menuOpen]);

  return (
    <div className="hidden md:flex md:ml-auto md:w-auto">
      <ul className="inline-flex ml-auto font-medium" ref={ref}>
        {pages?.map((page: PageProps) => {
          // Als er geen menu naam, pagina op hidden of menu hidden aan staat, door gaan
          if (
            page.page_menuname.length === 0 ||
            page.page_hidden === "ja" ||
            page.page_hidden_menu === "ja"
          )
            return;
          return (
            <li
              key={page.page_id}
              className={`focus:bg-cyan-500 hover:bg-cyan-500 hover:text-white inline-flex cursor-pointer justify-center items-center p-3 mx-1 relative ${
                menuOpen === page.page_id ? "active" : ""
              }`}
              onClick={() => SetMenuOpen(page.page_id)}
            >
              {page.page_menuname}
              {page.children.length > 0 && (
                <svg
                  className="w-5 h-5 ml-1"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
                </svg>
              )}
              <ul
                className={`min-w-[10rem] dropdown shadow-md absolute top-full left-0 ${
                  menuOpen === page.page_id ? "show" : "hidden"
                }`}
              >
                {page.children.map((child: PageProps) => {
                  // Als er geen menu naam, pagina op hidden of menu hidden aan staat, door gaan
                  if (
                    child.page_menuname.length === 0 ||
                    child.page_hidden === "ja" ||
                    child.page_hidden_menu === "ja"
                  )
                    return;
                  return (
                    <li key={child.page_id}>
                      <a
                        className="cursor-pointer block bg-slate-200 hover:text-white text-black hover:bg-cyan-500 px-4 py-2"
                        href={child.page_url}
                      >
                        {child.page_menuname}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
      <button className="flex md:hidden">
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
        </svg>
      </button>
    </div>
  );
};

const Menu = ({ pages }: PagesProps) => {
  return <DropdownMenu pages={pages}></DropdownMenu>;
};

export default Menu;
