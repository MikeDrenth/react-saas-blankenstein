import React from 'react'
import Link from 'next/link'

// Import styling
import { StyledMenu } from './styles/menu/StyledMenu'
import { StyledList } from './styles/menu/StyledList'
import { StyledLi } from './styles/menu/StyledLI'
import { StyledA } from './styles/menu/StyledA'

interface Props {
  data?: []
  menu?: []
}

interface MenuProps {
  _id: number
  name: string
  url: string
  active: boolean
}

const Menu = ({ menu }: Props) => {
  return (
    <StyledMenu>
      <StyledList>
        {menu.data.map(({ _id, name, url, active }: MenuProps) =>
          active ? (
            <StyledLi key={_id}>
              <Link href={url}>
                <StyledA>{name}</StyledA>
              </Link>
            </StyledLi>
          ) : (
            ''
          )
        )}
      </StyledList>
    </StyledMenu>
  )
}

export default Menu
