import { Box } from '@mui/material';
import React from 'react';
import './oldstyle.css';
import BrandHeading from '../text/BrandHeading';
import Body from '../text/Body';
import ActionButton from '../button/ActionButton';
import GeneralButton from '../button/GeneralButton';
import { ImageCover, MinimalistImageContainer, MinimalistTextContainer, PageContainer } from './styles';

const mock = {
  heroHeadline: ' Lorem ipsum dolor',
  heroHeadlineColor: 'white',

  subText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quis !',
  subTextColor: 'white',

  actionButtonStyle: '',
  actionButtonText: 'Click Me!',
  actionButtonColor: 'black',
  actionButtonTextColor: '',

  imageUrl:
    'https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  imageBlur: '1',
  coverOpacity: 0.6,
};
const MinimalistHero = () => {
  return (
    <PageContainer design={{ justifyCenter: true }}>
      {/* IMAGE */}

      <MinimalistImageContainer>
        <img
          style={{ width: '100%', height: '95%', filter: `blur(${mock.imageBlur}px)` }}
          src={mock.imageUrl}
          alt="background image"
        />
      </MinimalistImageContainer>
      <ImageCover design={{ coverOpacity: mock.coverOpacity }}></ImageCover>
      {/* TEXT */}
      <MinimalistTextContainer>
        <BrandHeading
          text={mock.heroHeadline}
          textColor={mock.heroHeadlineColor}
          weight="500"
          lineHeight={1}
          marginBottom={1}
        />
        <Box sx={{ maxWidth: { xs: '300px', md: '400px' } }}>
          <Body text={mock.subText} textColor={mock.subTextColor} marginBottom={4} />
        </Box>
        <GeneralButton
          buttonstyle="action"
          text={mock.actionButtonText}
          bgColor={mock.actionButtonColor}
          width="150px"
        />
      </MinimalistTextContainer>
    </PageContainer>
  );
};

export default MinimalistHero;
