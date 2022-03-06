import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const WhiteSider = ({ children }) => {
  return (
    <Grid item xs={3}>
      <Paper variant="outlined">{children}</Paper>
    </Grid>
  );
};

export default WhiteSider;
