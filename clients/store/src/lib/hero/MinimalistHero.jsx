import { Box } from '@mui/material';
import React from 'react';
import './oldstyle.css';
import BrandHeading from '../text/BrandHeading';
import Body from '../text/Body';
import GeneralButton from '../button/GeneralButton';
import { ImageCover, MinimalistImageContainer, MinimalistTextContainer, PageContainer } from './styles';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MinimalistHero = () => {
  const heroDesign = useSelector((state) => state.webDesign.hero);
  const navigate = useNavigate();
  return (
    <PageContainer design={{ justifyCenter: true }} sx={{}}>
      {/* IMAGE */}

      <MinimalistImageContainer>
        <img
          style={{ objectFit: 'cover', width: '100%', height: '100%', filter: `blur(${heroDesign.heroImageBlur}px)` }}
          src={heroDesign.heroImageUrl}
          alt="background image"
        />
      </MinimalistImageContainer>
      <ImageCover design={{ coverOpacity: heroDesign.heroImageCoverOpacity }}></ImageCover>
      {/* TEXT */}
      <MinimalistTextContainer>
        <BrandHeading
          text={heroDesign.heroHeadline}
          textColor={heroDesign.heroHeadlineColor}
          weight="500"
          xsTextFontSize="60px"
          smTextFontSize="90px"
          lineHeight={1}
          marginBottom={1}
        />
        <Box sx={{ maxWidth: { xs: '300px', md: '400px' } }}>
          <Body text={heroDesign.heroSubText} textColor={heroDesign.heroSubTextColor} marginBottom={4} />
        </Box>
        <GeneralButton
          buttonstyle="action"
          text={heroDesign.heroActionButtonText}
          textColor={heroDesign.heroActionButtonTextColor}
          bgColor={heroDesign.heroActionButtonColor}
          onClick={() => navigate('/products')}
          width="150px"
        />
      </MinimalistTextContainer>
    </PageContainer>
  );
};

export default MinimalistHero;
