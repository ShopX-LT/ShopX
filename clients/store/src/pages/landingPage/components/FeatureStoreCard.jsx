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

const FeatureStoreCard = ({ imageSource, storeName, link, grossIncome }) => {
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
      <VisitButton
        variant="outlined"
        onClick={() => {
          window.open(link);
        }}
      >
        Visit Store
      </VisitButton>
    </GroupContainer>
  );
};

export default FeatureStoreCard;
