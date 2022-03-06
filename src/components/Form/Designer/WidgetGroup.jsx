import React, { Fragment } from "react";
import { Widget } from "./Widget";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function ({ name, list }) {
  return (
    <>
      <Fragment key={name}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{name}</Typography>
          </AccordionSummary>
          {list.map((w) => {
            return (
              <AccordionDetails>
                <Widget key={w.name} widget={w} />
              </AccordionDetails>
            );
          })}
        </Accordion>
      </Fragment>
    </>
  );
}
