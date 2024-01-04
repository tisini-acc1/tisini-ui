import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import RugbyStats from "./RugbyStats";
import RugbyHeader from "./RugbyHeader";
import RugbyLineUps from "./RugbyLineUps";
import { tokens } from "@/theme/ScoresTheme";
import RugbyStandings from "./RugbyStandings";
import { useQuery } from "@tanstack/react-query";
import FetchFixtureById from "@/lib/scores/FetchFixtureById";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const SingleRugby = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { fixtureId } = useParams();

  const [value, setValue] = useState(1);

  // console.log(value);

  const { data, isLoading } = useQuery(["rugbyById"], () =>
    FetchFixtureById(fixtureId!)
  );

  const details = data?.data[0][0];
  const home = data?.data[1];
  const away = data?.data[2];
  const scores = data?.data[3];
  const lineups = data?.data[4];
  const cards = data?.data[5];
  const league = data?.data[7];

  console.log(data?.data);

  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  // };
  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container>
      <Grid item xs={12} p={1}>
        <Box bgcolor={colors.primary[300]} sx={{ width: "100%" }}>
          <RugbyHeader fixDetails={details} fixScores={scores} />
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Lineups" {...a11yProps(0)} />
              <Tab label="Team stats" {...a11yProps(1)} />
              <Tab
                label="Standings"
                {...a11yProps(2)}
                disabled={league.length === 0}
              />
            </Tabs>
          </AppBar>

          <TabPanel value={value} index={0} dir={theme.direction}>
            <RugbyLineUps teams={details} squads={lineups} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <RugbyStats home={home} away={away} cards={cards} />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <RugbyStandings standings={league} />
          </TabPanel>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SingleRugby;
