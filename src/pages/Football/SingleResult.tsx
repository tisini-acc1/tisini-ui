import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";

import homeLogo from "../../assets/homeLogo.png";
import awayLogo from "../../assets/awayLogo.png";

type Props = {
  homeTeam: string;
  awayTeam: string;
  homeScore: string;
  awayScore: string;
  fixtureId: string;
  fixtureType: string;
  fixtureState: string;
  minute: string;
};

const SingleResult = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  fixtureId,
  fixtureType,
  fixtureState,
  minute,
}: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (fixtureType === "football") {
      navigate(`/scores/football/${fixtureId}`);
    } else {
      navigate(`/scores/rugby/${fixtureId}`);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-2 text-sm font-semibold whitespace-nowrap my-4 pb-2 border-b border-gray-900">
      <div className="col-span-5 flex gap-1 lg:flex-col flex-row-reverse lg:justify-center items-center">
        <img className="lg:w-10 lg:h-10 w-4 h-4" src={homeLogo} alt="" />
        <div className="">{homeTeam}</div>
      </div>

      <div className="col-span-2 flex items-center justify-center">
        {fixtureState !== "notstarted" && (
          <div
            className=" font-bold
           lg:text-3xl text-base"
          >
            {homeScore} - {awayScore}
          </div>
        )}
      </div>

      <div className="col-span-5 flex gap-1 lg:flex-col flex-row lg:justify-center items-center">
        <img className="lg:w-10 lg:h-10 h-5 w-5" src={awayLogo} alt="" />
        <div>{awayTeam}</div>
      </div>
    </div>
    // <Grid
    //   container
    //   borderBottom="1px solid black"
    //   onClick={handleClick}
    //   sx={{
    //     "&:hover": {
    //       bgcolor: "lightgray",
    //       cursor: "pointer",
    //     },
    //   }}
    // >
    //   <Grid item xs={1}>
    //     <Box
    //       display="flex"
    //       justifyContent="center"
    //       alignItems="center"
    //       height="100%"
    //     >
    //       <Typography variant="h6" fontSize="small" fontWeight="bold">
    //         {fixtureState === "notstarted"
    //           ? `⌛`
    //           : fixtureState === "started"
    //           ? minute
    //           : "FT"}
    //       </Typography>
    //     </Box>
    //   </Grid>
    //   <Grid item xs={10}>
    //     <Box p={0.3}>
    //       <Box display="flex" gap={0.5} flexDirection="row">
    //         <Box>
    //           <img
    //             style={{ width: "1rem", height: "1rem" }}
    //             src={homeLogo}
    //             alt=""
    //           />
    //         </Box>
    //         <Typography variant="h6" fontSize="small" fontWeight="bold">
    //           {homeTeam}
    //         </Typography>
    //       </Box>
    //       <Box display="flex" gap={0.5} flexDirection="row">
    //         <Box>
    //           <img
    //             style={{ width: "1rem", height: "1rem" }}
    //             src={awayLogo}
    //             alt=""
    //           />
    //         </Box>
    //         <Typography variant="h6" fontSize="small" fontWeight="bold">
    //           {awayTeam}
    //         </Typography>
    //       </Box>
    //     </Box>
    //   </Grid>

    //   {fixtureState !== "notstarted" && (
    //     <Grid item xs={1}>
    //       <Box p={0.6}>
    //         <Typography variant="h6" fontSize="small" fontWeight="bold">
    //           {homeScore}
    //         </Typography>
    //         <Typography variant="h6" fontSize="small" fontWeight="bold">
    //           {awayScore}
    //         </Typography>
    //       </Box>
    //     </Grid>
    //   )}
    // </Grid>
  );
};

export default SingleResult;
