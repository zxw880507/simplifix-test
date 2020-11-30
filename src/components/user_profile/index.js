import React from "react";
import Profile from "./profile";
import GigItem from './gigItem'
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';


export default function Gig(props) {


  const {user, gigs} = props;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography
          component="div"
          style={{ margin: "1em" }}
        >
          <div style={{ width: "100%" }}>
            <Box display="flex" flexWrap="wrap" justifyContent="space-evenly" p={1}>
              <Card style={matches ? { width: "30%" } : { width: "100%" }}>
              <Profile user={user}/>
              </Card>
              <Box style={matches ? { width: "50%" } : { width: "100%" }}>
              <GigItem gigs={gigs}/>
              </Box>
            </Box>
          </div>
        </Typography>
      </Container>
    </>
  );
}
