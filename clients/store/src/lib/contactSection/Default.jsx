import React from 'react';
import { Box, Container, Tooltip, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useSelector } from 'react-redux';

const Default = () => {
  const contactDesign = useSelector((state) => state.webDesign.contact);
  const iconsAnimation = {
    color: contactDesign.contactTextColor,
    transition: 'all 200ms ease-in-out',
    '&:hover': { color: contactDesign.contactHeadingColor, transform: 'translateY(-5px)' },
  };

  return (
    <Box sx={{ background: contactDesign.contactBgColor }}>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            paddingY: 16,

            color: contactDesign.contactTextColor,
          }}
        >
          <Box
            sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start' }}
          >
            <Typography variant="h2" sx={{ color: contactDesign.contactHeadingColor, fontWeight: 'bold' }}>
              Contact Us
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: '470px', marginTop: 1 }}>
              {contactDesign.contactDescription}
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: contactDesign.contactHeadingColor, fontWeight: 'bold', marginTop: 5 }}
            >
              Socials
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 4,
                maxWidth: '470px',
                justifyContent: 'space-between',
                paddingY: 2,
              }}
            >
              {contactDesign.contactEmail ? (
                <a href={`mailto:${contactDesign.contactEmail}`}>
                  <Tooltip title="email" placement="top">
                    <MailIcon sx={iconsAnimation} />
                  </Tooltip>
                </a>
              ) : null}

              {contactDesign.contactInstagram ? (
                <a
                  href={`https://www.instagram.com/${contactDesign.contactInstagram}`}
                  target="_blank"
                  rel={'external'}
                >
                  <Tooltip title="Instagram" placement="top">
                    <InstagramIcon sx={iconsAnimation} />
                  </Tooltip>
                </a>
              ) : null}

              {contactDesign.contactTwitter ? (
                <a href={`https://www.twitter.com/${contactDesign.contactTwitter}`} target="_blank" rel={'external'}>
                  <Tooltip title="Twitter" placement="top">
                    <TwitterIcon sx={iconsAnimation} />
                  </Tooltip>
                </a>
              ) : null}

              {contactDesign.contactWhatsapp ? (
                <a href={contactDesign.contactWhatsapp}>
                  <Tooltip title="Whatsapp" placement="top">
                    <WhatsAppIcon sx={iconsAnimation} />
                  </Tooltip>
                </a>
              ) : null}
            </Box>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', marginTop: { xs: 10, md: 0 }, marginLeft: { xs: 0, md: 10 } }}>
            {/* IMAGE */}
            <img
              src={contactDesign.contactImage}
              alt="constact us"
              style={{ height: '420px', width: '100%', objectFit: 'cover', borderRadius: '5px' }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Default;
