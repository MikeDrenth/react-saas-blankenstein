import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { StyledObjectImage } from '../components/styles/objectOverzicht/StyledObjectImage'
import { StyledObjectInfo } from '../components/styles/objectOverzicht/StyledObjectInfo'
import { StyledObjectOverview } from '../components/styles/objectOverzicht/StyledObjectOverview'

interface accommodatiesProps {
  naam: string
  omschrijving: string
  faciliteiten: []
  cijfer: number
  rating: number
  image: string
}

const Menu = ({ accommodaties }) => {
  console.table(accommodaties.data)
  return (
    <div>
      {accommodaties.data.map(
        (
          {
            naam,
            omschrijving,
            faciliteiten,
            cijfer,
            rating,
            image,
          }: accommodatiesProps,
          index: number
        ) => (
          <div key={index}>
            <StyledObjectOverview>
              <StyledObjectImage>
                <Image layout="fill" objectFit="cover" src={image} alt={naam} />
              </StyledObjectImage>
              <StyledObjectInfo>
                <h1>{naam}</h1>
                <p>{omschrijving}</p>
                {/* {cijfer} */}
                {/* {rating} */}
                <ul>
                  {faciliteiten.map((faciliteit: string, key: number) => (
                    <li key={key}>{faciliteit}</li>
                  ))}
                </ul>
                <Link href="/">
                  <a>Lees meer</a>
                </Link>
              </StyledObjectInfo>
            </StyledObjectOverview>
          </div>
        )
      )}
    </div>
  )
}

export default Menu
