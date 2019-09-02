import React from 'react'
import styled from '@emotion/styled'

import Link from './Link'

const Links = styled.ul`
  list-style: none;
  margin-left: 0;
`

const LinkItem = styled.li`
  display: inline;

  &:not(:last-child):after {
    content: ' | ';
    opacity: 0.5;
  }
`

const LinksList = ({ links, children }) => {
  return (
    <Links>
      {links.map(({ title, href, inCurrentTab, ...linkProps }) => (
        <LinkItem key={title}>
          <Link href={href} title={title} inCurrentTab={inCurrentTab}>
            {children({
              title,
              href,
              ...linkProps,
            })}
          </Link>
        </LinkItem>
      ))}
    </Links>
  )
}

export default LinksList
