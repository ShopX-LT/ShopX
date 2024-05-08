import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { Box, CircularProgress, Container, Dialog, Slide, Typography } from '@mui/material';
//
import Review from '../lib/review/Review';
import { fCurrency } from '../utils/formatNumber';
import ImageSwiper from '../components/ImageSwiper';
import useReview from '../sections/products/hooks/useReview';
import DescriptiveAppBar from '../components/DescriptiveAppBar';
import { FullViewPortBody, FlexColumnAlignedToStart, StyledProductPrice } from './styles';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DescriptionPage = ({ isOpen, handleClose, product }) => {
  const design = useSelector((state) => state.webDesign);
  const { reviews, isLoading } = useReview({ itemId: product.id, isOpen });

  return (
    <div style={{ background: design.mainBackgroundColor }}>
      <Dialog fullScreen open={isOpen} onClose={handleClose} TransitionComponent={Transition}>
        <DescriptiveAppBar design={design} productTitle={product.title} handleClosePage={handleClose} />
        <FullViewPortBody design={design}>
          <Container>
            <FlexColumnAlignedToStart>
              <ImageSwiper productImages={product.imagesUrl} />
              <ProductTitleAndPrice product={product} />
            </FlexColumnAlignedToStart>
            <Box my={4}>
              <Typography variant="subtitle1" marginBottom={1} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                Description
              </Typography>
              <Typography variant="body2">{product.description}</Typography>
              <Typography
                variant="subtitle1"
                marginTop={2}
                marginBottom={1}
                sx={{ borderBottom: 1, borderColor: 'divider' }}
              >
                Reviews
              </Typography>
              {isLoading && <CircularProgress />}
              {reviews.map((review, index) => (
                <Review
                  key={index}
                  select="default"
                  name={review.name}
                  rating={review.rating}
                  comment={review.comment}
                />
              ))}
            </Box>
          </Container>
        </FullViewPortBody>
      </Dialog>
    </div>
  );
};

export default DescriptionPage;

function ProductTitleAndPrice({ product }) {
  const priceAfterDiscount = product.price * (1 - product.discount / 100);
  return (
    <Box>
      <Typography variant="h6">{product.title}</Typography>
      <StyledProductPrice hasDiscount={product.discount}>{fCurrency(product.price)}</StyledProductPrice>
      {product.discount ? <StyledProductPrice>{fCurrency(priceAfterDiscount)}</StyledProductPrice> : null}
    </Box>
  );
}

DescriptionPage.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  product: PropTypes.object,
};
