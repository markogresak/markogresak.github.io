import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { rhythm } from '../utils/typography'

import Link from './Link'

const LinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Links = styled.ul`
  list-style: none;
  margin-left: ${({ right }) => (right ? 'auto' : 0)};
`

const LinkItem = styled.li`
  display: inline;

  &:not(:last-child):after {
    content: ' | ';
    opacity: 0.5;
  }
`

const LinkItems = ({ links, right }) => (
  <Links right={right}>
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

const LinksList = ({ links, className }) => {
  const linksLeft = links.filter((link) => !link.right)
  const linksRight = links.filter((link) => link.right)

  return (
    <LinksContainer className={className}>
      {linksLeft.length > 0 && <LinkItems links={linksLeft} />}
      {linksRight.length > 0 && <LinkItems links={linksRight} right />}
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
