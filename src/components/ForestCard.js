import React from 'react';
import styled from 'styled-components';

const ForestCard = (props) => {
  const { name, address, phoneNumber, memo } = props.placeInfo;
  return (
    <Card>
      <h3>{name}</h3>
      <div>📍 {address}</div>
      <div>📞 {phoneNumber}</div>
      <div>{memo && memo}</div>
    </Card>
  );
};

const Card = styled.article`
  width: 362px;
  height: 135px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  padding: 20px 17px;

  h3 {
    font-size: 20px;
    line-height: 22px;
    margin-bottom: 8px;
  }
  div {
    font-size: 16px;
    line-height: 18px;
  }
`;

export default ForestCard;
