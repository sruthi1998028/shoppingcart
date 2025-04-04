import React from 'react';

function ProgressBar({threshold,current}){
    const percentage=Math.min(100,(current/threshold*100));
    return(
        <div style={styles.progressBarContainer}>
            <div 
                style={{...styles.progressBarFill,width:`${percentage}%`}}>{percentage>0 && `${percentage}%`}</div>
            <div
                style={styles.progressBarLabel}>Spend Rs{threshold-current>0?threshold-current:0}more to get a free gift!</div>
        </div>
    );
}

const styles={
    progressBarContainer:{
        backgroundColor: '#f3f3f3',
        borderRadius: '5px',
        height:'20px',
        marginBottom:'10px',
        overflow:'hidden',
        position:'relative',
    },
progressBarFill:{
    backgroundColor:'#28a745',
    height:'100%',
    borderRadius:'5px',
    display:'flex',
    alignItems: 'center',
    justifyContent:'center',
    color:'white',
    fontSize:'0.8em'
},
progressBarLabel:{
    position:'absolue',
    top:'50%',
    left:'5px',
    transform:'translateY(-50%)',
    fontSize:'0.8em',
    color:'#555',
},
};
export default ProgressBar;
