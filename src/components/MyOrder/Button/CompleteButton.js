import React, {useState} from "react";
import OrderPrice from './OrderPrice';
import Fab from "@material-ui/core/Fab";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});

export default function CompleteButton(props) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  
  return (
    <ThemeProvider theme={theme}>
      <Fab variant="extended" color="primary" onClick={handleClickOpen}>
        <CloudDoneIcon style={{ marginRight: "0.3em" }} />
        Complete
      </Fab>
      <OrderPrice open={open} setOpen={setOpen} order={props.order}/>
    </ThemeProvider>
  );
}
