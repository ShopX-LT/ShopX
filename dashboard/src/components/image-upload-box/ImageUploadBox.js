import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Dropzone from 'react-dropzone';

/*
 * This component should only be used with formik
 * This component represents the file uploader for a single assignment. It uses react-dropzone to handle drag and drop functionality.
 */
const ImageUploadBox = ({ setImages, images, setFieldValue, field = 'images', uploadedImages }) => {
  return (
    <Box gridColumn="span 4" border={`1px solid black`} borderRadius="5px" p="1rem" m="1rem">
      <Dropzone
        acceptedFiles=".jpg,.jpeg,.png"
        multiple
        onDrop={(newImages) => {
          setImages((prevState) => {
            const newState = [...prevState, ...newImages];
            return newState;
          });
          setFieldValue(field, [...images, ...newImages]);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <Box {...getRootProps()} border={`1px dashed black`} p="1rem" sx={{ '&:hover': { cursor: 'pointer' } }}>
            <input {...getInputProps()} />

            <p>Add New Picture Here</p>
          </Box>
        )}
      </Dropzone>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap' }}>
        {uploadedImages.map((image, index) => {
          return (
            <Box key={image.name}>
              <img src={URL.createObjectURL(image)} alt={image.name} width={200} height={200} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <Typography>{image.name}</Typography>
                <IconButton
                  onClick={() => {
                    const newFiles = [...images];
                    newFiles.splice(index, 1);
                    setImages(newFiles);
                    setTimeout(() => {
                      setFieldValue(field, newFiles);
                    }, 0);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ImageUploadBox;
