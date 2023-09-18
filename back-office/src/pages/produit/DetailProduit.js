import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Grid, Typography, Button, Dialog, DialogContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'; // Importez Moment.js
import ReactStars from 'react-rating-stars-component';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { styled } from '@mui/system';
axios.defaults.withCredentials = true;

const StyledTable = styled(Table)({
  minWidth: 500
});

const StyledTableCell = styled(TableCell)(() => ({
  fontWeight: 'bold',
  color: '#E32845',
  fontSize: 14
}));

const DetailProduit = () => {
  const navigate = useNavigate();
  const { produitId } = useParams();
  const [produitDetails, setProduitDetails] = useState(null);
  const [error, setError] = useState('');
  const [comments, setComments] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduitDetails = async () => {
      try {
        const response = await axios.get(`https://amazony-backend.vercel.app/produit/getProduitById/${produitId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProduitDetails(response.data);
        setError('');
      } catch (error) {
        console.error('Error fetching produit details:', error);
        setError('Failed to fetch produit details. Please try again later.');
      }
    };

    fetchProduitDetails();
  }, [produitId, token]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://amazony-backend.vercel.app/comment/comments/${produitId}`);
        setComments(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des commentaires :', error);
      }
    };
    fetchComments();
  }, [produitId]);

  const formatDate = (dateString) => {
    return moment(dateString).format('DD MMMM YYYY à HH:mm'); // Utilisez le format de date souhaité
  };

  const handleConfirmDeleteProduit = () => {
    axios
      .delete(`https://amazony-backend.vercel.app/produit/deleteProduit/${produitId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        console.log('Produit deleted successfully');
        navigate('/produit-list');
      })
      .catch((error) => {
        console.error('Error deleting produit:', error);
      })
      .finally(() => {
        setDialogOpen(false);
      });
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!produitDetails) {
    return <p>Loading...</p>;
  }
  const handleDeleteComment = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      axios
        .delete(`https://amazony-backend.vercel.app/comment/comments/${commentId}`)
        .then(() => {
          setComments(comments.filter((comment) => comment._id !== commentId)); // Utilisez eventId ici
        })
        .catch((error) => {
          console.error('Error deleting comment:', error);
        });
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => navigate('/produit-list')}>
        Retourner à la liste des produits
      </Button>
      <Box sx={{ p: 2 }}>
        <Typography variant="h2" sx={{ color: '#E32845', marginBottom: '1rem' }}>
          Détails du produit
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {produitDetails.images.map((image, index) => (
              <img key={index} src={image.secure_url} alt={`Ima ${index}`} style={{ width: '100%', height: 'auto', maxWidth: '400px' }} />
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Titre :
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {produitDetails.titre}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Description :
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {produitDetails.description}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Description détaillée :
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {produitDetails.description_detaillee}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Catégorie :
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {produitDetails.categorie}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Prix :
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {produitDetails.prix}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Taille :
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {produitDetails.taille.join(', ')}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Couleur :
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {produitDetails.couleur.join(', ')}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Quantité :
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {produitDetails.quantite}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Marque :
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {produitDetails.marque}
                </Typography>
              </Box>
              <Button variant="outlined" color="error" onClick={() => setDialogOpen(true)}>
                Supprimer le produit
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
          Commentaires:
        </Typography>
        {comments.length === 0 ? ( // Vérifiez si la liste des commentaires est vide
          <Typography variant="body1" sx={{ color: '#666666' }}>
            Pas de commentaires.
          </Typography>
        ) : (
          <StyledTable>
            <TableHead>
              <TableRow>
                <StyledTableCell>Comment</StyledTableCell>
                <StyledTableCell>Rating</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Options</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <StyledTableCell colSpan={6}>Loading...</StyledTableCell>
                </TableRow>
              ) : (
                comments.map((comment) => (
                  <TableRow key={comment._id}>
                    <TableCell style={{ maxWidth: '500px', wordWrap: 'break-word' }}>{comment.comment}</TableCell>
                    <TableCell>
                      <ReactStars
                        count={5}
                        size={24}
                        value={comment.rating}
                        edit={false} // Empêche l'utilisateur de modifier le rating
                        activeColor="#ffd700" // Couleur des étoiles remplies
                      />
                    </TableCell>
                    <TableCell>{formatDate(comment.createdAt)}</TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => handleDeleteComment(comment._id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </StyledTable>
        )}
      </Box>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogContent>
          <h2>Êtes-vous sûr de vouloir supprimer ce produit?</h2>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmDeleteProduit} color="error">
            Supprimer
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DetailProduit;
