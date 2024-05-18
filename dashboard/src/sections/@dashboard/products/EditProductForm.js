import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { deleteItemImage, updateItem, updateItemImages } from '../../../services/ItemService';
import ImageUploadBox from '../../../components/image-upload-box';

// YUP DECLERACTIONS
const itemShema = Yup.object().shape({
  title: Yup.string().required('required'),
  price: Yup.mixed().required('required'),
  quantity: Yup.number('required'),
  discount: Yup.number('required'),
});

const EditProductForm = ({ product, onCloseFilter }) => {
  const axiosPrivate = useAxiosPrivate();
  const { title, price, discount, quantity, id } = product;
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  // use api to get the items info
  const initialValueItem = {
    title,
    price,
    quantity,
    discount,
  };

  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
  };
  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  /**
   * Handle form submit event.
   *
   * @param {object} values - Object containing form values.
   * @param {object} onSubmitProps - Props passed to the form onSubmit handler.
   */
  const handleFormSubmit = async (values, onSubmitProps) => {
    const formData = {};
    // Append each form value to the formData object.
    Object.keys(values).forEach((key) => {
      formData[key] = values[key];
    });

    // Send formData object to server to create item.
    await updateItem(axiosPrivate, toast, id, formData);
    // set the drawer to close and reload the page
    // onCloseFilter();
    window.location.reload();
    onSubmitProps.resetForm();
  };

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialValueItem} validationSchema={itemShema}>
      {({
        values,
        errors,
        touched,
        isValidating,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Button variant="outlined" sx={{ mb: 4 }} fullWidth onClick={handleOpenUploadModal}>
            Edit Images
          </Button>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            error={Boolean(touched.title) && Boolean(errors.title)}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.title}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Quantity"
            name="quantity"
            error={Boolean(touched.quantity) && Boolean(errors.quantity)}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.quantity}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            error={Boolean(touched.price) && Boolean(errors.price)}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.price}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Discount"
            name="discount"
            error={Boolean(touched.discount) && Boolean(errors.discount)}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.discount}
            fullWidth
          />

          <Modal open={isUploadModalOpen} onClose={handleCloseUploadModal} aria-labelledby="upload-images-modal">
            <UploadImages product={product} closeUploadModal={handleCloseUploadModal} />
          </Modal>
          <Box sx={{ mx: 'auto' }}>
            <Button variant="contained" sx={{ mt: 4 }} type="submit" fullWidth>
              Save
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default EditProductForm;

function UploadImages({ product, closeUploadModal }) {
  const [productImages, setProductImages] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  // YUP DECLERACTIONS
  const imageShema = Yup.object().shape({
    images: Yup.array(),
  });

  const initialValueItem = {
    images: [],
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: 300, md: 800 },
    height: '700px',
    overflowY: 'scroll',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '8px',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const handleDeleteImage = async (imageId) => {
    const response = await deleteItemImage(axiosPrivate, toast, product.id, imageId);
    if (response) {
      closeUploadModal();
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (values.images.length > 0) {
      const formData = new FormData();

      // Append each image file to the formData object.
      values.images.forEach((image) => {
        formData.append('images', image);
      });

      await updateItemImages(axiosPrivate, toast, product.id, formData);
      onSubmitProps.resetForm();
      setProductImages((prevState) => {
        const newState = [];
        return newState;
      });
    }
    closeUploadModal();
  };

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialValueItem} validationSchema={imageShema}>
      {({
        values,
        errors,
        touched,
        isValidating,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <Box sx={{ ...style }}>
          <Typography variant="h3" sx={{ borderBottom: '1px solid black', marginBottom: 2 }}>
            Edit Images
          </Typography>
          <form onSubmit={handleSubmit}>
            <ImageUploadBox
              setImages={setProductImages}
              images={productImages}
              setFieldValue={setFieldValue}
              uploadedImages={values.images}
              field="images"
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap', marginTop: 4 }}>
              {product.imagesUrl.map((url, index) => (
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                  key={product.images[index]}
                >
                  <img style={{ width: '100px', height: '100px' }} src={url} alt={product.images[index]} />
                  <DeleteIcon
                    color="error"
                    id={product.images[index]}
                    onClick={async () => {
                      await handleDeleteImage(product.images[index]);
                    }}
                  />
                </Box>
              ))}
            </Box>

            <Box sx={{ mx: 'auto' }}>
              <Button variant="contained" sx={{ mt: 4 }} type="submit" fullWidth>
                Save
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </Formik>
  );
}
