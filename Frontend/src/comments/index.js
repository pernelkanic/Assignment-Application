import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState } from "react";
import "../App.css";
const Commentscomp=(props)=>{
    const {createdDate, createdBy , text} = props
    const [commentRelativeTime, setCommentRelativeTime] = useState("");
    useEffect(()=>{
        updateCommentRelativeTime()
    },[createdDate])
    
    function updateCommentRelativeTime(){
            if(createdDate){
                dayjs.extend(relativeTime);
                setCommentRelativeTime(dayjs(createdDate).fromNow());
            }

        }
setInterval(()=>{
    updateCommentRelativeTime();
}, 1000*61)

    return(
        <>
        <div className="commentbubble">
            <span style={{fontWeight:"bold"}}>{` ${createdBy}    `} </span>
           <div> {text}</div>
        </div>
           <div style={{marginTop:"-1.2em" , marginLeft:"1.4em" , fontSize:"12px"}}>{commentRelativeTime?`Posted ${commentRelativeTime} `:"" }</div>
        </>
    )
}
export default Commentscomp;