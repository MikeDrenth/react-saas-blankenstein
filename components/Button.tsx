import Link from 'next/link'

interface Props {
  text: string
  url: string
}

export const Button = ({ text, url }: Props) => {
  return (
    <>
      <Link href={`/${url}`}>
        <a>{text}</a>
      </Link>
    </>
  )
}
