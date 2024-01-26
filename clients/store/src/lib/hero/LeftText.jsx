import { Box, Container, Stack } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import BrandHeading from '../text/BrandHeading';
import Body from '../text/Body';
import GeneralButton from '../button/GeneralButton';
import {
  FlexContainer,
  ImageCover,
  LegacyImageContainer,
  LegacyTextContainer,
  MinimalistImageContainer,
  PageContainer,
} from './styles';
import { floatInAnimationVar1, floatInAnimationVar2 } from './animations';

const LeftText = () => {
  const heroDesign = useSelector((state) => state.webDesign.hero);
  const navigate = useNavigate();

  return (
    <PageContainer>
      {/* IMAGE */}

      <MinimalistImageContainer>
        <img
          style={{ objectFit: 'cover', width: '100%', height: '100%', filter: `blur(${heroDesign.heroImageBlur}px)` }}
          src={heroDesign.heroImageUrl}
          alt="background image"
        />
      </MinimalistImageContainer>
      <ImageCover design={{ coverOpacity: heroDesign.heroImageCoverOpacity }}></ImageCover>
      <Container sx={{ zIndex: 1 }}>
        <LegacyTextContainer>
          <motion.div initial="initial" animate="animate" variants={floatInAnimationVar1}>
            <Box sx={{ maxWidth: { xs: '350px', sm: '800px' } }}>
              <BrandHeading
                text={heroDesign.heroHeadline}
                textColor={heroDesign.heroHeadlineColor}
                weight="600"
                smTextFontSize="100px"
                lineHeight={1}
                marginTop={4}
                marginBottom={2}
              />
              <Box sx={{ maxWidth: { xs: '300px', md: '650px' } }}>
                <Body text={heroDesign.heroSubText} textColor={heroDesign.heroSubTextColor} marginBottom={3} />
              </Box>
              <GeneralButton
                buttonstyle="action"
                text={heroDesign.heroActionButtonText}
                bgColor={heroDesign.heroActionButtonColor}
                textColor={heroDesign.heroActionButtonTextColor}
                width="150px"
                onClick={() => navigate('/products')}
              />
            </Box>
          </motion.div>
        </LegacyTextContainer>
      </Container>
    </PageContainer>
  );
};

export default LeftText;
