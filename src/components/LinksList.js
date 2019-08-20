import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

const Links = styled.ul`
  list-style: none;
  margin-left: 0;
`

const LinkItem = styled.li`
  display: inline;

  &:not(:last-child):after {
    content: ' | ';
    color: rgba(33, 33, 33, 0.5);
  }
`

const LinksList = ({ links, children }) => {
  return (
    <Links>
      {links.map(({ title, href, ...linkProps }) => (
        <LinkItem key={title}>
          {href.indexOf('/') === 0 ? (
            <Link to={href} title={title}>
              {children({
                title,
                href,
                ...linkProps,
              })}
            </Link>
          ) : (
            <a href={href} title={title}>
              {children({
                title,
                href,
                ...linkProps,
              })}
            </a>
          )}
        </LinkItem>
      ))}
    </Links>
  )
}

export default LinksList
