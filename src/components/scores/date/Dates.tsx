import { Box } from "@mui/material";

const Dates = () => {
  const formatDate = () => {
    const date = new Date(day);
    const options = { weekday: "short", month: "2-digit", day: "2-digit" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const d = formatDate();
  const weekday = d.split(",")[0];
  const formatedday = d.split(",")[1];

  // console.log(weekday);
  // console.log(formatedday);

  return (
    <Box>
      <Box>{weekday}</Box>
      <Box>{formatedday}</Box>
    </Box>
  );
};

export default Dates;
