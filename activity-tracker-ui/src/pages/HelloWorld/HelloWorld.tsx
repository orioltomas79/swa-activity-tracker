import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const HelloWorld = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <div>Hello</div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default HelloWorld;
