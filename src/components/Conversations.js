import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Conversation from './Conversation';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((props) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: "0px 2px 5px 0.5px #E3E3E3",
    minHeight: '400px',
    borderRadius: '10px',
    padding: '10px'
  },
  
  empty: {
    minHeight: '100px',
  },

  title: {
    borderBottom: '2px solid #0EE290',
    padding: '5px'
  }
}));


export default function Conversations(props) {

  const classes = useStyles(props);
  const { userID } = props;
  const [conversations, setConversations] = useState([]);
  const [loadingConversations, setLoadingConversations] = useState(true);

  // console.log('in conversations !!!!', props.conv_id)

  useEffect(() => {
    axios.get(`/api/conversations/${userID}`)
    .then(response => {
      setConversations(response.data);
      setLoadingConversations(false);
    })
  },[])

  return (

    ! loadingConversations ? (
     <div>
       {conversations.length !== 0 ? (
        <div className={classes.root}>
          <h3 className={classes.title}>Conversations</h3>
          {conversations.map(conversation => {
              return <Conversation conv_id={props.conv_id} {...conversation} userID={userID}/>
          })}
        </div>
      ) : 
        <div className={`${classes.root} ${classes.empty}`}>
          <h3 className={classes.title}>No Conversations</h3>
        </div>
       }
     </div> 
    ) : 
    <div>
        <CircularProgress size={'60px'} color={`black`}/>
    </div>
    
    // conversations.length !== 0 ? (
    //   <div className={classes.root}>
    //   <h3 className={classes.title}>Conversations</h3>
    //   {conversations.map(conversation => {
    //       return <Conversation conv_id={props.conv_id} {...conversation} userID={userID}/>
    //   })}
    // </div>
    // ) 
    // : 
    //   <div className={`${classes.root} ${classes.empty}`}>
    //     <h3 className={classes.title}>No Conversations</h3>
    //   </div>

  )
}