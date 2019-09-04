import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'

const newTabProps = {
  target: '_blank',
  rel: 'nofollow noopener noreferrer',
}

const Link = ({ children, href, inCurrentTab, title, className }) =>
  href.indexOf('/') === 0 ? (
    <GatsbyLink to={href} title={title} className={className}>
      {children}
    </GatsbyLink>
  ) : (
    <a
      href={href}
      title={title}
      className={className}
      {...(inCurrentTab ? {} : newTabProps)}
    >
      {children}
    </a>
  )

Link.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string.isRequired,
  inCurrentTab: PropTypes.bool,
  title: PropTypes.string,
  className: PropTypes.string,
}

export default Link
