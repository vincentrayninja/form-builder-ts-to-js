import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const LeftSide = ({ children }) => {
  return (
    <Grid item xs={3}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        {children}
      </Paper>
    </Grid>
  );
};

export default LeftSide;
