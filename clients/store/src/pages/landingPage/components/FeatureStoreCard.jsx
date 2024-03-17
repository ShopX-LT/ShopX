import React from 'react';
import { Box, Typography } from '@mui/material';

import {
  GroupContainer,
  ImageContainer,
  ImageRelativeContainer,
  ItemContainer,
  TextContainer,
  VisitButton,
  imageStyle,
} from './styles';

const imageSource =
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D';
const FeatureStoreCard = ({ imageSource, storeName, grossIncome }) => {
  return (
    <GroupContainer>
      <ItemContainer>
        <ImageRelativeContainer>
          <ImageContainer>
            <img style={imageStyle} src={imageSource} />
          </ImageContainer>
        </ImageRelativeContainer>
        <TextContainer>
          <Typography variant="subtitle2" fontWeight={500}>
            {storeName}
          </Typography>
          <Typography align="left" variant="subtitle2" fontWeight={300}>
            Gross Income: {grossIncome}
          </Typography>
        </TextContainer>
      </ItemContainer>
      <VisitButton variant="outlined">Visit Store</VisitButton>
    </GroupContainer>
  );
};

export default FeatureStoreCard;
