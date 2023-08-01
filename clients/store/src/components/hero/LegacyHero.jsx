import { Box, Stack } from '@mui/material';
import React from 'react';
import BrandHeading from '../text/BrandHeading';
import Body from '../text/Body';
import GeneralButton from '../button/GeneralButton';

const mock = {
  mainText: ' Lorem ipsum dolor sit amet consectetur',
  mainTextColor: 'black',

  subText:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quis unde nostrum perferendis accusantium, at voluptatem qui amet error quia vero, id eligendi cum quaerat quidem, ducimus laborum sequi nisi!',
  subTextColor: 'black',

  actionButtonStyle: '',
  actionButtonText: 'Click Me!',
  actionButtonColor: 'black',
  actionButtonTextColor: '',
};

const LegacyHero = () => {
  return (
    <Box sx={{ maxWidth: '100vw', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: { xs: '100px', md: '50px' },
        }}
      >
        {/* Text */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ maxWidth: { xs: '350px', md: '400px' } }}>
            <BrandHeading
              text={mock.mainText}
              textColor={mock.mainTextColor}
              weight="500"
              lineHeight={1}
              marginTop={4}
              marginBottom={2}
            />
            <Box sx={{ maxWidth: { xs: '300px', md: '350px' } }}>
              <Body text={mock.subText} textColor={mock.subTextColor} marginBottom={3} />
            </Box>
            <GeneralButton style="action" text={mock.actionButtonText} bgColor={mock.actionButtonColor} width="150px" />
          </Box>
        </Box>

        {/* IMG */}

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: '350px', height: '300px', border: '1px purple solid', borderRadius: '10px' }}>
            img here...
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LegacyHero;
