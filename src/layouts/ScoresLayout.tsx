import { Outlet } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import MainFooter from "@/components/MainFooter";
import ScoresHeader from "@/components/scores/ScoresHeader";
import { tokens } from "@/theme/ScoresTheme";
import MainHeader from "@/components/MainHeader";

// import { tokens } from "../theme";

// type ScoresLayoutProps = {
//   children: React.ReactNode;
// };

const ScoresLayout = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Box maxWidth="md" margin="auto">
        <Box minHeight="100vh" display="flex" flexDirection="column">
          <MainHeader />
          <ScoresHeader />

          <Box bgcolor={colors.primary[400]}>
            <Outlet />
          </Box>
        </Box>
      </Box>
      {/* <Footer /> */}
      <MainFooter />
    </>
  );
};

export default ScoresLayout;
