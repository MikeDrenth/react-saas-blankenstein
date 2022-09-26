import React from 'react'

import { StyledTopBar } from './styles/StyledTopBar'

const TopBar = () => {
  return (
    <>
      <StyledTopBar>
        <ul>
          <li>Blankenstein 100,</li>
          <li>7943PE Meppel </li>
          <li>
            <a href="tel:0881304200">088 - 130 42 00</a>
          </li>
          <li>
            <a href="mailto:support@digizijn.nl">support@digizijn.nl</a>
          </li>
        </ul>
        <ul>
          <li>Customerportal - Demo </li>
        </ul>
      </StyledTopBar>
    </>
  )
}

export default TopBar
