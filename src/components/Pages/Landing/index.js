import {
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import React from "react";
import {
  AiOutlineEyeInvisible,
  AiOutlineLineChart,
  AiOutlineUserDelete,
  AiOutlineUsergroupDelete,
  AiOutlineUserSwitch,
} from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import TwitterIcon from "@material-ui/icons/Twitter";
import Pricing, { usePricingStyles } from "../../Pricing/Pricing";
import { TWITTER_AUTH_LINK } from "../../../constants";
import { tiers } from "../../../tiers";

import Img from "gatsby-image";
import { graphql, StaticQuery } from "gatsby";
import SEO from "../../Seo";

const useStyles = makeStyles((theme) => ({
  img: {
    width: "100%",
    objectFit: "contain",
  },
  featureContainer: {
    padding: 30,
    width: 280,
    height: "100%",
  },
  section: {
    margin: "60px 0",
  },
  sectionTitle: {
    margin: "20px 0",
  },
  imageContainer: {
    // maxHeight: "calc(100vh - 64px - 72px - 21px)",
    // display: "flex",
  },
  loginContainer: {
    padding: 16,
  },
}));

const features = [
  {
    icon: <AiOutlineUsergroupDelete />,
    title: "Unfollowers",
    description: "Find out who unfollowed you",
  },
  {
    icon: <AiOutlineLineChart />,
    title: "Followers history",
    description: "Get the picture of your number of followers changing in time",
  },
  {
    icon: <AiOutlineEyeInvisible />,
    title: "Not following back",
    description: "Recognize users who don't follow you back",
  },
  {
    icon: <AiOutlineUserSwitch />,
    title: "Following back",
    description: "Look at your mutual followers",
  },
  {
    icon: <AiOutlineUserDelete />,
    title: "I don't follow back",
    description: "See users that you don't follow back",
  },
];

export default function Landing() {
  const classes = useStyles();
  const theme = useTheme();

  const pricingStyles = usePricingStyles();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  // const sources = [
  //   data.mobileImage.childImageSharp.fixed,
  //   {
  //     ...data.desktopImage.childImageSharp.fixed,
  //     media: `(min-width: 600px)`,
  //   },
  // ];

  return (
    <div>
      <SEO noTemplate/>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item md>
          <Typography component="h1" variant="h2" gutterBottom>
            Welcome to the Social Assistant
          </Typography>
          {/* <div style={{ maxHeight: "100%", height: "calc(100vh - 64px - 72px - 21px)" }}> */}
          <StaticQuery
            query={query}
            render={(data) => {
              const sources = [
                data.mobileImage.childImageSharp.fluid,
                {
                  ...data.desktopImage.childImageSharp.fluid,
                  media: `(min-width: 600px)`,
                },
              ];
              return (
                <Img
                  style={{ maxHeight: mobile ? 500 : "100%" }}
                  imgStyle={{ objectFit: "contain" }}
                  fluid={sources}
                />
              );
            }}
          />
          {/* <Img fluid={sources} /> */}
          {/* <img
              className={classes.img}
              alt="App screenshot"
              src={mobile ? "/iphone.png" : "/mbp.png"}
            /> */}
          {/* </div> */}
        </Grid>
        <Grid item md={3}>
          <Paper id="login" className={classes.loginContainer}>
            <Typography component="h2" variant="h5">
              Login with social media
            </Typography>
            <Box marginY={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<TwitterIcon />}
                href={TWITTER_AUTH_LINK}
              >
                Login with Twitter
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <section className={classes.section} id="features">
        <Typography
          className={classes.sectionTitle}
          component="h1"
          variant="h3"
        >
          Features
        </Typography>
        <Grid container spacing={2} className={pricingStyles.container}>
          <IconContext.Provider value={{ color: "#1DA1F2", size: 48 }}>
            {features.map((feature, index) => (
              <Grid item key={index}>
                <Paper className={classes.featureContainer}>
                  {feature.icon}
                  <Typography variant="h5">{feature.title}</Typography>
                  <Typography variant="subtitle1">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </IconContext.Provider>
        </Grid>
      </section>
      <section className={classes.section} id="pricing">
        <Typography
          className={classes.sectionTitle}
          component="h1"
          variant="h3"
        >
          Pricing
        </Typography>
        <Grid container spacing={2} className={pricingStyles.container}>
          {tiers.map((tier) => (
            <Grid item key={tier.name}>
              <Pricing tier={tier} />
            </Grid>
          ))}
        </Grid>
      </section>
    </div>
  );
}

const query = graphql`
  query {
    mobileImage: file(relativePath: { eq: "iphone.png" }) {
      childImageSharp {
        fluid(maxHeight: 500, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    desktopImage: file(relativePath: { eq: "mbp.png" }) {
      childImageSharp {
        fluid(maxWidth: 2000, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
