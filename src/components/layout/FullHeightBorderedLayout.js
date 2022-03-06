import React from "react";
import Grid from "@material-ui/core/Grid";

const FullHeightBorderedLayout = ({ children }) => {
  return (
    <Grid container spacing={1}>
      {children}
    </Grid>
  );
};

export default FullHeightBorderedLayout;
