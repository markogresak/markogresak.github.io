import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import Link from './Link'

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

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

const LinkItems = ({ links, children }) => (
  <Links>
    {links.map((link) => (
      <LinkItem key={link.title}>
        <Link
          href={link.href}
          title={link.title}
          inCurrentTab={link.inCurrentTab}
        >
          {children(link)}
        </Link>
      </LinkItem>
    ))}
  </Links>
)

const LinksList = ({ links, children }) => {
  const linksLeft = links.filter((link) => !link.right)
  const linksRight = links.filter((link) => link.right)

  return (
    <LinksContainer>
      <LinkItems links={linksLeft}>{children}</LinkItems>
      <LinkItems links={linksRight}>{children}</LinkItems>
    </LinksContainer>
  )
}

LinksList.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      inCurrentTab: PropTypes.bool,
      right: PropTypes.bool,
      title: PropTypes.string,
    }).isRequired,
  ).isRequired,
  children: PropTypes.func.isRequired,
}

LinksList.defaultProps = {
  children: ({ title }) => title,
}

export default LinksList
