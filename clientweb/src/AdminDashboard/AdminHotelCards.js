import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHotelCards = ({ hotel }) => {
  const navigate = useNavigate();

  const handleClick = (hotelId) => {
    navigate(`/Admin/hotel/${hotelId}`);
  };

  const cardStyle = {
    border: '1px solid var(--brown)',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    height: '350px', // Set the fixed height
  };

  const titleStyle = {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: 'var(--brown)',
  };

  const descriptionStyle = {
    textAlign: 'start',
  };

  const tableStyle = {
    textAlign: 'start',
    margin: '10px 0',
  };

  const tableRowStyle = {
    margin: '10px 0',
  };

  const tableDataStyle = {
    padding: '3px 10px',
  };

  const imageContainerStyle = {
    display: 'flex',
    gap: '8px',
    marginTop: '10px',
  };

  const imageStyle = {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '5px',
  };

  return (
    <div style={cardStyle} onClick={() => handleClick(hotel._id)}>
      <h3 style={titleStyle}>{hotel.name}</h3>
      <p style={descriptionStyle}>{hotel.description}</p>
      <table style={tableStyle}>
        <tbody>
          <tr style={tableRowStyle}>
            <td style={tableDataStyle}>Phone:</td>
            <td style={tableDataStyle}>{hotel.phone}</td>
          </tr>
          <tr style={tableRowStyle}>
            <td style={tableDataStyle}>Email:</td>
            <td style={tableDataStyle}>{hotel.email}</td>
          </tr>
        </tbody>
      </table>
      <div style={imageContainerStyle}>
        {hotel.imageUrl.map((image, imageIndex) => (
          <img
            key={`${hotel._id}-image-${imageIndex}`}
            src={image.url}
            alt={`Description of image ${imageIndex + 1}`}
            style={imageStyle}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminHotelCards;
