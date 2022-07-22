import React from 'react'
import './circle.css'
const Circle = ({onClick} : any) => {
  return (
    <div onClick={onClick} className='circle'></div>
  )
}

export default Circle