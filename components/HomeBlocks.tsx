import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Import styling
import { StyledBlockTitel } from '../components/styles/homeBlocks/StyledBlockTitel'
import { StyledBlockSubTitel } from '../components/styles/homeBlocks/StyledBlockSubTitel'
import { StyledBlockGrid } from '../components/styles/homeBlocks/StyledBlockGrid'

interface Props {
  _id: number
  titel: string
  sub_titel: string
  image: string
  url: string
}

const HomeBlocks = (props) => {
  return (
    <>
      <StyledBlockGrid>
        {props.blocks.data.map((block: Props) => (
          <Link href={block.url} key={block._id}>
            <a>
              <StyledBlockSubTitel>{block.sub_titel}</StyledBlockSubTitel>
              <StyledBlockTitel>{block.titel}</StyledBlockTitel>
              <Image
                objectFit="cover"
                layout="fill"
                src={block.image}
                alt="Blankenstein aan Zee"
              />
            </a>
          </Link>
        ))}
      </StyledBlockGrid>
    </>
  )
}

export default HomeBlocks
