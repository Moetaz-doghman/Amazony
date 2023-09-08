import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomButton = styled(Button)(() => ({
  position: 'absolute',
  right: '100px',
  backgroundColor: '#1890ff', // Red color
  color: '#fff', // Text color
  '&:hover': {
    backgroundColor: '#003a8c' // Darker red color on hover
  }
}));

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 500px;
  margin: 0 auto;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 14px;
`;

const AddGallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Added isLoading state
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const initialValues = {
    title: '',
    images: ''
  };

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = '☹︎ title is required';
    }

    return errors;
  };

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true); // Set isLoading to true when the form is submitted

      const galleryData = {
        title: values.title,
        images: []
      };

      // Upload all images and wait for the responses
      const uploadPromises = galleryImages.map(async (image) => {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dotvzhxdz/image/upload', {
          file: image,
          upload_preset: 'InfoPlus'
        });
        return response.data.secure_url;
      });

      // Wait for all the image uploads to complete
      const uploadedImageUrls = await Promise.all(uploadPromises);
      galleryData.images = uploadedImageUrls;
      await axios.post('http://localhost:8080/gallery/addGallery', galleryData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setIsLoading(false); // Set isLoading to false when the request is completed

      navigate('/gallery-list');
    } catch (error) {
      console.error(error);
      setIsLoading(false); // Set isLoading to false in case of an error
    }
  };

  const onImageInputChange = (e) => {
    const uploadedImages = Array.from(e.target.files);

    Promise.all(
      uploadedImages.map((image) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            resolve(reader.result);
          };

          reader.onerror = reject;
          reader.readAsDataURL(image);
        });
      })
    ).then((imageURLs) => {
      setGalleryImages(imageURLs);
    });
  };

  const handleGalleryList = () => {
    navigate('/gallery-list');
  };

  return (
    <>
      <CustomButton onClick={handleGalleryList}>Back</CustomButton>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
        {() => (
          <StyledForm>
            <Field name="title">{({ field }) => <TextField required label="Gallery Title" {...field} fullWidth />}</Field>
            <ErrorMessage name="title" component={ErrorText} />

            <input type="file" id="images" name="images" multiple accept="image/*" onChange={onImageInputChange} />

            <Button type="submit" variant="contained" color="primary">
              {isLoading ? 'Loading...' : 'Save'} {/* Show "Loading..." while isLoading is true */}
            </Button>
          </StyledForm>
        )}
      </Formik>
    </>
  );
};

export default AddGallery;
