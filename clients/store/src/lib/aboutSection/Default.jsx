import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const Default = () => {
  const aboutDesign = useSelector((state) => state.webDesign.about);

  return (
    <Box sx={{ background: aboutDesign.aboutBgColor }}>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            paddingY: 16,

            color: aboutDesign.aboutTextColor,
          }}
        >
          <Box
            sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start' }}
          >
            <Typography variant="h2" sx={{ color: aboutDesign.aboutTextColor, fontWeight: 'bold' }}>
              {aboutDesign.aboutHeading}
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: '470px', marginTop: 5 }}>
              {aboutDesign.aboutDescription}
            </Typography>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', marginTop: { xs: 10, md: 0 }, marginLeft: { xs: 0, md: 10 } }}>
            <img
              src={aboutDesign.aboutImage}
              alt="about us"
              style={{ height: '420px', width: '100%', objectFit: 'cover', borderRadius: '5px' }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Default;
