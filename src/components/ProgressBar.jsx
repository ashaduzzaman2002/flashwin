import React from 'react'
  
const Progressbar = ({bgcolor,progress}) => {
     
    const Parentdiv = {
        height: 4,
        width: '100%',
        backgroundColor: '#35544d',
      }
      
      const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
      }
      
        
    return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        
      </div>
    </div>
    )
}
  
export default Progressbar;