/** @jsx jsx */
import { jsx, Heading, Flex } from "theme-ui"
import { animated, useSpring, config } from "react-spring"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import useEmiliaConfig from "../hooks/use-emilia-config"
import HeaderBackground from "./header-background"
import Location from "../assets/location"
import SocialMediaList from "./social-media-list"
import { ChildImageSharpFixed } from "../types"

type AvatarStaticQuery = {
  file: {
    childImageSharp: ChildImageSharpFixed
  }
}

const Header = () => {
  const { name, location, assetsPath } = useEmiliaConfig()
  const avatar = useStaticQuery<AvatarStaticQuery>(graphql`
    query {
      file(name: { eq: "avatar" }) {
        childImageSharp {
          fixed(width: 140, height: 140, quality: 100) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `)

  const fadeUpProps = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: `translate3d(0, 30px, 0)` },
    to: { opacity: 1, transform: `translate3d(0, 0, 0)` },
  })
  const fadeUpPropsDelay = useSpring({
    config: config.slow,
    delay: 250,
    from: { opacity: 0, transform: `translate3d(0, 30px, 0)` },
    to: { opacity: 1, transform: `translate3d(0, 0, 0)` },
  })
  const fadeProps = useSpring({ config: config.slow, from: { opacity: 0 }, to: { opacity: 1 } })
  const fadeLongProps = useSpring({ config: config.slow, delay: 600, from: { opacity: 0 }, to: { opacity: 1 } })

  return (
    <Flex as="header" variant="layout.projectHead">
      <HeaderBackground />
      <div sx={{ display: 'flex', padding: '20px', textAlign: `left`, marginBottom: '120px', zIndex: 10 }}>
        <animated.div style={fadeProps}>
          <div
            sx={{
              overflow: `hidden`,
              // borderRadius: `full`,
              height: [`140px`, `180px`],
              width: [`140px`, `180px`],
              display: `inline-block`,
              boxShadow: `lg`,
              "> div:not([data-placeholder='true'])": {
                height: [`140px !important`, `180px !important`],
                width: [`140px !important`, `180px !important`],
              },
            }}
          >
            {avatar?.file?.childImageSharp?.fixed ? (
              <Img fixed={avatar.file.childImageSharp.fixed} />
            ) : (
              <div
                sx={{
                  fontSize: 0,
                  position: `absolute`,
                  top: 0,
                  left: 0,
                  width: `100% !important`,
                  right: 0,
                  p: 3,
                  backgroundColor: `red.2`,
                }}
                data-placeholder="true"
              >
                Place an image with the name "avatar" inside the directory "{assetsPath}"
              </div>
            )}
          </div>
        </animated.div>
        <animated.div style={fadeUpProps} sx={{marginLeft: '20px'}}>
          <Heading as="h2" variant="styles.h2">
            {name}
          </Heading>
          <Heading as="h3" variant="styles.h3">
          💄资深彩妆造型师
          </Heading>
          <Heading as="h4" variant="styles.h4">
          🤝承接各类妆面造型：新娘跟妆、平面广告、年会晚宴、影视等，韩式半永久纹眉
          </Heading>
        </animated.div>
        <animated.div style={fadeUpPropsDelay}>
          <Flex
            sx={{
              svg: {
                width: `20px`,
                height: `20px`,
                ".primary": { color: `iconPrimary` },
                ".secondary": { color: `iconSecondary` },
                mr: 2,
              },
              justifyContent: `center`,
              alignItems: `center`,
              color: `text`,
            }}
          >
            {/* <Location /> {location} */}
          </Flex>
        </animated.div>
        <div data-testid="social-header" sx={{ mt: 4, mb: 6, a: { mx: 2 } }}>
          <animated.div style={fadeLongProps}>
            <SocialMediaList />
          </animated.div>
        </div>
      </div>
    </Flex>
  )
}

export default Header
