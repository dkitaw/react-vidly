import React from 'react';

/**
 * Input:
 *   liked: boolean
 * Output:
 *   onClick: event
 */

 const Like = (props) => {
    let classes = "fa fa-thumbs-";
    
    if (props.liked) {
        classes += "up";
    } else {
        classes += "o-up";
    }
    
    return (
        <i 
            className={classes} 
            style={{cursor:"pointer"}}
            onClick={props.onClick}
            aria-hidden="true"/>
    );
 }
 
export default Like;