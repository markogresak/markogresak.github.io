import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "@emotion/styled"

import { rhythm } from "../utils/typography"

import Layout from "./layout"

const LinksList = styled.ul`
  list-style: none;
  margin-left: 0;
`

const IconWrapper = styled.span`
  margin-right: ${rhythm(0.5)};
`

const Links = () => {
  const data = useStaticQuery(graphql`
    query LinksQuery {
      site {
        siteMetadata {
          links {
            title
            items {
              title
              href
              icon
              color
            }
          }
        }
      }
      github {
        user(login: "markogresak") {
          repositories {
            totalCount
          }
        }
      }
    }
  `)

  const { title, items } = data.site.siteMetadata.links
  const { totalCount: repositoriesCount } = data.github.user.repositories

  return (
    <Layout title={title}>
      <LinksList>
        {items.map(({ title, href, icon, color }) => (
          <li key={title}>
            <IconWrapper>
              <FontAwesomeIcon icon={["fab", icon]} color={color} />
            </IconWrapper>
            <a href={href} title={title}>
              {title}
              {title === "Github" && <> ({repositoriesCount} projects)</>}
            </a>
          </li>
        ))}
      </LinksList>
    </Layout>
  )
}

export default Links
