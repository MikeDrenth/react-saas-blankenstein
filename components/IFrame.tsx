interface Props {
  width: string
  height: string
  url: string
}

export const IFrame = ({ url, width, height }: Props) => {
  return (
    <>
      <iframe frameBorder={0} height={height} src={url} width={width}></iframe>
    </>
  )
}
