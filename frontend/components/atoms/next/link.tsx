import NextLink from 'next/link'
import { MaterialLink } from 'components/atoms/material'

const Link = ({ href, children, ...props }) => (
  <NextLink {...props} href={href} passHref>
    <MaterialLink {...props}>{children}</MaterialLink>
  </NextLink>
)

export default Link
