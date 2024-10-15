import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageSwiper = ({ productImages }) => {
  return (
    <Box sx={{ maxWidth: '99vw' }}>
      <Carousel
        ariaLabel="product images"
        showArrows={true}
        showStatus={false}
        showThumbs={true}
        thumbWidth={100}
        showIndicators={true}
        infiniteLoop={true}
        swipeable={true}
        emulateTouch={true}
        useKeyboardArrows={true}
      >
        {productImages.map((imageUrl) => {
          return (
            <Box key={imageUrl}>
              <img style={{ maxHeight: '520px', maxWidth: '420px', objectFit: 'cover' }} alt={'x'} src={imageUrl} />
            </Box>
          );
        })}
      </Carousel>
    </Box>
  );
};

export default ImageSwiper;

ImageSwiper.propTypes = {
  productImages: PropTypes.array,
};
