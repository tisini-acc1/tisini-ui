import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import tisini from "../../assets/brandTisini.jpg";

const Header = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <Grid
        sx={{
          backgroundImage: `url(${tisini})`,
          backgroundSize: "fit",
          backgroundPosition: "center",
          width: "100%",
          height: "11em",
          position: "relative",
        }}
      >
        <Grid
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            padding: "6px",
            color: "white",
            display: "flex",
            gap: 1,
          }}
        >
          <Button variant="contained" onClick={() => navigate("/scores")}>
            Football
          </Button>
          <Button variant="contained" onClick={() => navigate("/scores/rugby")}>
            Rugby
          </Button>
        </Grid>
      </Grid>
    </nav>
  );
};

export default Header;
