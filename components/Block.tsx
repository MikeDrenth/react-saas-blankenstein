import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Menu = ({ blocks }) => {
  console.log(blocks)
  return (
    <div>
      {blocks.map(({ id, subTitle, title, url, img }) => (
        <div key={id}>
          <Image
            width="240px"
            height="80px"
            objectFit="cover"
            src={img}
            alt={title}
          />
          <a>{subTitle}</a>
        </div>
      ))}
    </div>
  )
}

export default Menu
