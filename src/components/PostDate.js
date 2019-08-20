import React from 'react'
import styled from '@emotion/styled'

import { scale } from '../utils/typography'

const Date = styled.time`
  ${scale(-0.3)};
`

const PostDate = ({ post }) => (
  <Date dateTime={post.frontmatter.date}>{post.frontmatter.humanDate}</Date>
)

export default PostDate
