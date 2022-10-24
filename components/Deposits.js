import Typography from "@mui/material/Typography";
import Title from "./Title";

export default function Deposits({ data, error }) {
  return (
    <>
      <Title>Depósitos</Title>
      <Typography component="p" variant="h4">
        ${data?.totalDeposits?.toFixed(2)}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {data?.totalPaidUsers} vecinos pagaron
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {new Date().toDateString()}
      </Typography>
    </>
  );
}
