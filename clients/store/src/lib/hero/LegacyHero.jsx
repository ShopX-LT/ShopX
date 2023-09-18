import { Box, Container, Stack } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import BrandHeading from '../text/BrandHeading';
import Body from '../text/Body';
import GeneralButton from '../button/GeneralButton';
import { FlexContainer, LegacyImageContainer, LegacyTextContainer, PageContainer } from './styles';
import { floatInAnimationVar1, floatInAnimationVar2 } from './animations';

const LegacyHero = () => {
  const heroDesign = useSelector((state) => state.webDesign.hero);
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Container>
        <FlexContainer>
          <LegacyTextContainer>
            <motion.div initial="initial" animate="animate" variants={floatInAnimationVar1}>
              <Box sx={{ maxWidth: { xs: '350px', sm: '800px' } }}>
                <BrandHeading
                  text={heroDesign.heroHeadline}
                  textColor={heroDesign.heroHeadlineColor}
                  weight="600"
                  lineHeight={1}
                  marginTop={4}
                  marginBottom={2}
                />
                <Box sx={{ marginBottom: '80px', maxWidth: { xs: '300px', md: '650px' } }}>
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

          {/* IMG */}
          <motion.div initial="initial" animate="animate" variants={floatInAnimationVar2}>
            <LegacyImageContainer>
              <img
                src={heroDesign.heroImageUrl}
                alt="hero"
                style={{ width: '400px', height: '400px', imageFit: 'cover', borderRadius: '10px' }}
              />
            </LegacyImageContainer>
          </motion.div>
        </FlexContainer>
      </Container>
    </PageContainer>
  );
};

export default LegacyHero;
