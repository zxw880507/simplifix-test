import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((props) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '70px',
    boxShadow: "0px 2px 5px 0.5px #E3E3E3",
    borderRadius: '20px',
    margin: '0.5rem 0rem 0.5rem 0rem',
    transition: '0.2s ease-in-out',
    textDecoration: 'none',
    background: props => props.id === parseInt(props.conv_id) ? '#0EE290' : 'white',
    '&:hover': {
      background: '#0EE290',
      color: 'white'
    }
  },
  link: {
    textDecoration: 'none',
    color: props => props.id === parseInt(props.conv_id) ? 'white' : 'black',
    '&:hover': {
      color: 'white'
    },
  }
}));

export default function Conversation(props) {

  const classes = useStyles(props);

  return(
    props.userID === props.client_id ? (
      <Link to={`/chat/?conv_id=${props.id}`} className={classes.root}>
        {props.id ? 
          <div className={classes.root}>
            <div className={classes.link}>
              <p>{props.contractor_first} {props.contractor_last}</p>
            </div>
          </div> 
        : 
          <CircularProgress color={`black`}/>
        }
      </Link>
    ) : (
    <Link to={`/chat/?conv_id=${props.id}`} className={classes.root}>
    <div className={classes.root}>
      <div className={classes.link}>
        <p className={classes.link}>{props.client_first} {props.client_last}</p>
      </div>
    </div> 
  </Link>)
  )
}