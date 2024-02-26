import React from 'react'
import { useNavigate } from 'react-router-dom'
const HotelCards = ({hotel}) => {
    const history=useNavigate();

    

   const handleOnclick=(hotel)=>{
        history(`/hotel/${hotel._id}`)
    }
  return (
    <div>
      <div key={hotel._id} onClick={()=>handleOnclick(hotel)}> 
        <div>{hotel.name}</div>
        <div>{hotel.description}</div>
        <div>{hotel.phone}</div>
        <div>{hotel.email}</div>
        {hotel.imageUrl.map((image, imageIndex) => (
          <img
            key={`${hotel._id}-image-${imageIndex}`} 
            src={image.url}
            alt={`Description of image ${imageIndex + 1}`}
            style={{ width: '100px', height: 'auto', marginBottom: '8px' }}
          />
        ))}



      </div>
    </div>
  )
}

export default HotelCards
