import React, {useContext} from 'react';
import {UserCookie} from '../../hooks/UserCookie';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles(() => ({
  error: {color: "#f44336"},
  warning: {color: "#ff9800"},
  info: {color: "#2196f3"},
  success: {color: "#4caf50"}
}))
export default function AlertDialog(props) {

  const {state, setState} = useContext(UserCookie);
  const {error, success} = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteGig = (id) => {
    setOpen(false);
    axios.delete(`/api/gigs/${id}`)
    .then(res => {
      const gigs = [...state.gigs];
      const index = gigs.findIndex(gig => gig.id === id);
      gigs.splice(index, 1);
      setState({...state, gigs});
    })
  }

  return (
    <>
      <DeleteIcon className={props.class} onClick={handleClickOpen}/>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Deleting a gig"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          You have selected to delete this gig.
          <br/>
          <br/>
          If this was an action that you wanted to do, please confirm your choice, or cancel and return to the page.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={success}>
            Cancel
          </Button>
          <Button onClick={() => deleteGig(props.gigId)} className={error} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}