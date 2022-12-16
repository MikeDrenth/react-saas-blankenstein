import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

interface PageProps {
  pages: []
  language_id: number
  page_hidden: string
  page_hidden_menu: string
  page_highlight: string
  page_id: number
  page_order: number
  page_title: string
  page_url: string
  parent_id: number
  page_menuname: string
  site_id: number
  type_id: 0
  children: []
  page: []
}

const DropdownMenu = ({ pages }: PageProps) => {
  const [menuOpen, SetMenuOpen]: any = useState('')
  const ref = useRef<any>(null)

  useEffect(() => {
    const openMenuHandler = (e: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target)) {
        SetMenuOpen('')
      }
    }

    document.addEventListener('mousedown', openMenuHandler)

    return () => {
      document.removeEventListener('mousedown', openMenuHandler)
    }
  }, [menuOpen])

  return (
    <ul className="inline-flex ml-3 font-medium" ref={ref}>
      {pages.map((page: PageProps) => {
        return (
          <li
            key={page.page_id}
            className={`flex cursor-pointer justify-center items-center py-3 mx-6 relative ${
              menuOpen === page.page_id ? 'active' : ''
            }`}
            onClick={() => SetMenuOpen(page.page_id)}
          >
            {page.page_menuname}
            <ul
              className={`min-w-[10rem] dropdown  absolute top-full left-0 ${
                menuOpen === page.page_id ? 'show' : 'hidden'
              }`}
            >
              {page.children.map((child: PageProps) => {
                if (
                  child.page_menuname.length === 0 ||
                  child.page_hidden === 'ja' ||
                  child.page_hidden_menu === 'ja'
                )
                  return
                return (
                  <li
                    className="cursor-pointer bg-slate-200 hover:text-white hover:bg-cyan-600 px-4 py-2"
                    key={child.page_id}
                  >
                    <Link href={child.page_url}>{child.page_menuname}</Link>
                  </li>
                )
              })}
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

const Menu = ({ pages }: PageProps) => {
  return <DropdownMenu pages={pages}></DropdownMenu>
}

export default Menu
