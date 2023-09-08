import React, { useCallback, useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Dialog,
  DialogContent,
  Button
} from '@mui/material';
import { Delete, Edit, SearchOutlined } from '@mui/icons-material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Box } from '@mui/system';

const StyledTable = styled(Table)({
  minWidth: 500
});

const StyledTableCell = styled(TableCell)(() => ({
  fontWeight: 'bold',
  color: '#E32845',
  fontSize: 14
}));

const ListClasse = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedClasseId, setSelectedClasseId] = useState(null);
  const itemsPerPage = 5;
  const token = localStorage.getItem('token');

  const fetchClasses = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:8080/admin/classes', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setClasses(response.data);
      setIsLoading(false);
      setError('');
    } catch (error) {
      console.error('Error fetching classe list:', error);
      setError('Failed to fetch classe list. Please try again later.');
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const handleConfirmDeleteClasse = () => {
    axios
      .delete(`http://localhost:8080/admin/classe/${selectedClasseId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        console.log('Classe deleted successfully');
        setClasses(classes.filter((classe) => classe._id !== selectedClasseId));
        setDialogOpen(false);
      })
      .catch((error) => {
        console.error('Error deleting classe:', error);
        setDialogOpen(false);
      });
  };

  const handleEditClasse = (id) => {
    navigate(`/classe/edit/${id}`);
  };

  const filteredClasses = classes.filter((classe) => classe.name.toLowerCase().includes(searchValue.toLowerCase()));

  const pageCount = Math.ceil(filteredClasses.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedClasses = filteredClasses.slice(offset, offset + itemsPerPage);

  const handleOpenDialog = (id) => {
    setSelectedClasseId(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      {error && <p>{error}</p>}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ marginLeft: 'auto' }}>
          <OutlinedInput
            size="small"
            id="header-search"
            startAdornment={
              <InputAdornment position="start" sx={{ mr: -0.5 }}>
                <SearchOutlined />
              </InputAdornment>
            }
            aria-describedby="header-search-text"
            inputProps={{
              'aria-label': 'weight'
            }}
            placeholder="Ctrl + K"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Box>
      </div>

      <StyledTable>
        <TableHead>
          <TableRow>
            <StyledTableCell>Class Name</StyledTableCell>
            <StyledTableCell>Teachers</StyledTableCell>
            <StyledTableCell>Options</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <StyledTableCell colSpan={3}>Loading...</StyledTableCell>
            </TableRow>
          ) : (
            paginatedClasses.map((classe) => (
              <TableRow key={classe._id}>
                <TableCell>{classe.name}</TableCell>
                <TableCell>
                  {classe.teachers.map((teacher) => (
                    <div key={teacher._id}>
                      {teacher.user.firstName} {teacher.user.lastName}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleOpenDialog(classe._id)}>
                    <Delete />
                  </IconButton>
                  <IconButton color="dark" onClick={() => handleEditClasse(classe._id)}>
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </StyledTable>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <ReactPaginate
          forcePage={currentPage}
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          disabledClassName={'disabled'}
          activeClassName={'active'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          breakClassName={'break-me'}
          breakLabel={'...'}
        />
      </div>

      {/* Dialog de confirmation pour la suppression de la classe */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogContent>
          <h2>Êtes-vous sûr de vouloir supprimer cette classe?</h2>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmDeleteClasse} color="error">
            Supprimer
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ListClasse;
