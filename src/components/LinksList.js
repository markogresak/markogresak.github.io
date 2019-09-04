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

const LinkItems = ({ links, className }) => (
  <Links className={className}>
    {links.map(({ title, href, inCurrentTab, icon, iconColor }) => (
      <LinkItem key={title}>
        <Link href={href} title={title} inCurrentTab={inCurrentTab}>
          <>
            {icon && (
              <FontAwesomeIcon
                icon={icon.split(' ')}
                color={iconColor}
                css={{ marginRight: rhythm(0.25) }}
                // force same width on all icons
                style={{ width: '1em' }}
              />
            )}
            {title}
          </>
        </Link>
      </LinkItem>
    ))}
  </Links>
)

const LinksList = ({ links }) => {
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
}

export default LinksList
