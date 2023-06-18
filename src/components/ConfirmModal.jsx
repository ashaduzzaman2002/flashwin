import React from 'react'
import '../styles/ConfirmModal.css'

const ConfirmModal = ({text1, text2, setFunc}) => {
  return (
    <div className='modalContainer'>
        <div className='modalBox'>
            <h2>{text1}</h2>
            <p>{text2}</p>

            <div className='modalBtn'>
                <button>Yes</button>
                <button onClick={() => setFunc(false)}>No</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmModal