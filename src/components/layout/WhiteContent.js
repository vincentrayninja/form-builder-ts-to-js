import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const WhiteContent = ({ children }) => {
  return (
    <Grid item xs={6}>
      <Paper variant="outlined">{children}</Paper>
    </Grid>
  );
};

export default WhiteContent;
