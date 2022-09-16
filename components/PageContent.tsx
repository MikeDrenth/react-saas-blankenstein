interface Props {
  inhoud: string
}

export const PageContent = ({ inhoud }: Props) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: inhoud }} />
    </>
  )
}
