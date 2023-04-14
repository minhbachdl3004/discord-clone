import { Snackbar, makeStyles } from "@material-ui/core";
import Alert from "@mui/material/Alert";

interface Props {
  open: boolean;
  message: string;
  onClose: () => void;
  className: any;
  status: any;
}

const useStyles = makeStyles((theme) => ({
  medium: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  large: {
    width: 1000,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  error: {
    backgroundColor: "red",
  },
  success: {
    backgroundColor: "lightgreen",
    color: "black",
  },
  fontSize: {
    fontSize: 24,
  },
}));

const MySnackbar: React.FC<Props> = ({ open, message, onClose, status }) => {
  const classes = useStyles();
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={open}
      onClose={onClose}
      message={message}
      ContentProps={{
        "aria-describedby": "message-id",
        className: status === "error" ? classes.error : classes.success,
      }}
      className={classes.large}
    >
      <Alert
        onClose={onClose}
        severity={status}
        sx={{ width: "30%", fontSize: 14 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MySnackbar;
