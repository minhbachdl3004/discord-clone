import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const useStylesTooltip = makeStyles((theme) => ({
  arrow: {
    fontSize: "10px",
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    boxShadow: '0 0 25px 0 rgba(0, 0, 0, 0.75)',
    zIndex: 99,
  },
}));

const useStylesCopiedTooltip = makeStyles((theme) => ({
  arrow: {
    fontSize: "10px",
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: "#2ecc71",
  },
}));

const CustomTooltip = (props: any) => {
  const classes = props.copied ? useStylesCopiedTooltip() : useStylesTooltip();
  return <Tooltip arrow classes={classes} {...props} />;
};

export default CustomTooltip;
