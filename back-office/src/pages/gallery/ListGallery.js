import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Stack, Dialog, DialogContent, Button, IconButton, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { DeleteOutline } from '@mui/icons-material';

function ShadowBox({ shadow, imageUrl, onImageClick }) {
  return (
    <MainCard border={false} sx={{ boxShadow: shadow }}>
      <Stack spacing={1} justifyContent="center" alignItems="center" onClick={onImageClick}>
        {/* Affichage de l'image */}
        <img src={imageUrl} alt={`ss`} style={{ width: '100%', height: 'auto', cursor: 'pointer' }} />
      </Stack>
    </MainCard>
  );
}

ShadowBox.propTypes = {
  shadow: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired
};

function ListGallery() {
  const [galleries, setGalleries] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryToDelete, setGalleryToDelete] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  const fetchGalleries = async () => {
    try {
      const response = await fetch('http://localhost:8080/gallery/getAllGalleries');
      if (!response.ok) {
        throw new Error('Failed to fetch gallery list. Please try again later.');
      }
      const data = await response.json();
      setGalleries(data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des galeries :', error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseDialog = () => {
    setGalleryToDelete(null);
    setDialogOpen(false);
  };

  const handleDeleteGallery = async () => {
    try {
      if (!galleryToDelete) return;

      const response = await fetch(`http://localhost:8080/gallery/deleteGallery/${galleryToDelete._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete gallery. Please try again later.');
      }

      // Reload galleries after successful deletion
      fetchGalleries();
    } catch (error) {
      console.error('Erreur lors de la suppression de la galerie :', error);
      setError(error.message);
    } finally {
      handleCloseDialog();
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <div>
      <Grid container spacing={3}>
        {galleries.map((gallery, index) => (
          <Grid item xs={12} key={index}>
            <MainCard>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <h2>{gallery.title}</h2>
                <IconButton
                  onClick={() => {
                    setGalleryToDelete(gallery);
                    setDialogOpen(true);
                  }}
                >
                  <DeleteOutline />
                </IconButton>
              </Stack>
              <Grid container spacing={3}>
                {gallery.images.map((image, imageIndex) => (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={imageIndex}>
                    {/* Passer l'URL de l'image en tant que prop à ShadowBox */}
                    <ShadowBox shadow="1" imageUrl={image.secure_url} onImageClick={() => handleImageClick(image.secure_url)} />
                  </Grid>
                ))}
              </Grid>
            </MainCard>
          </Grid>
        ))}
      </Grid>
      {/* Dialog de confirmation pour la suppression de la galerie */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogContent>
          <h2>Êtes-vous sûr de vouloir supprimer cette galerie?</h2>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDeleteGallery} color="error">
            Supprimer
          </Button>
        </DialogContent>
      </Dialog>
      {/* Dialog pour afficher l'image agrandie */}
      <Dialog open={Boolean(selectedImage)} onClose={() => setSelectedImage(null)}>
        <DialogContent>
          <img src={selectedImage} alt="grandie" style={{ width: '100%', height: 'auto' }} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ListGallery;
