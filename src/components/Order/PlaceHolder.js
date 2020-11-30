import React from "react";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";
import Loading from "./Loading";

export default function PlaceHolder(props) {
  const {gig, contractor, mode} = props;
  
  return (
    <div>
      <ReactPlaceholder type="media" rows={7} 
      customPlaceholder={<Loading gig={gig} contractor={contractor}/>}
      ready={mode === "SUCCESS"}>
        <h1>Successful</h1>
      </ReactPlaceholder>
    </div>
  );
}
