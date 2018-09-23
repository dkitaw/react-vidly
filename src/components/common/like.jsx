import React from 'react';

 const Like = (props) => {
    let classes = "clickable fa fa-thumbs-";
    
    if (props.liked) {
        classes += "up";
    } else {
        classes += "o-up";
    }
    
    return (
        <i 
            className={classes} 
            onClick={props.onClick}
            aria-hidden="true"/>
    );
 }
 
export default Like;