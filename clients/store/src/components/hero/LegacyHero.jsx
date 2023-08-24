import { Box, Stack } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import BrandHeading from '../text/BrandHeading';
import Body from '../text/Body';
import GeneralButton from '../button/GeneralButton';
import { FlexContainer, LegacyImageContainer, LegacyTextContainer, PageContainer } from './styles';

const LegacyHero = () => {
  const heroDesign = useSelector((state) => state.webDesign.hero);
  const navigate = useNavigate();

  return (
    <PageContainer>
      <FlexContainer>
        <LegacyTextContainer>
          <Box sx={{ maxWidth: { xs: '350px', md: '400px' } }}>
            <BrandHeading
              text={heroDesign.heroHeadline}
              textColor={heroDesign.heroHeadlineColor}
              weight="500"
              lineHeight={1}
              marginTop={4}
              marginBottom={1}
            />
            <Box sx={{ maxWidth: { xs: '300px', md: '350px' } }}>
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
        </LegacyTextContainer>

        {/* IMG */}

        <LegacyImageContainer>
          <Box sx={{ width: '350px', height: '300px', border: '1px purple solid', borderRadius: '10px' }}>
            img here...
          </Box>
        </LegacyImageContainer>
      </FlexContainer>
    </PageContainer>
  );
};

export default LegacyHero;
