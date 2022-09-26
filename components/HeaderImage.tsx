import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const HeaderImage = ({ highlight }) => {
  return (
    <>
      <header>
        <Image
          width="2100"
          height="800"
          objectFit="cover"
          src={highlight}
          alt="Blankenstein aan Zee"
        />
      </header>
    </>
  )
}

export default HeaderImage
