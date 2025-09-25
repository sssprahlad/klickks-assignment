import React, { useEffect, useState } from "react";
import { URL, GET_CATEGORY } from "../../../constants/Constants";
import Cookies from 'js-cookie';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    const fetchCategories = async () => {
    try{
        const response = await fetch(URL + GET_CATEGORY, {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${Cookies.get('jwt_token')}` },
        });
        const data = await response.json();
        console.log(data);
        setCategories(data);
    }catch(error){
        console.log(error)
        setError(error.message);
    }finally{
    }
    };

    fetchCategories();
  }, []);

//   const handleUpdate = async (id) => {
//     try{
//         const response = await fetch(URL + GET_CATEGORY + id, {
//             method: "PATCH",
//             headers: { "Content-Type": "application/json", "Authorization": `Bearer ${Cookies.get('jwt_token')}` },
//             body: JSON.stringify({ name, image }),
//         });
//         const data = await response.json();
//         console.log(data);
//         setCategories(data);
//     }catch(error){
//         console.log(error)
//         setError(error.message);
//     }

//   }

const deleteCategory = async (id) => {
    try {
      if(window.confirm("Are you sure you want to delete this category?")){
        const response = await fetch(`${URL}${GET_CATEGORY}/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${Cookies.get('jwt_token')}` },
        });
    
        if (!response.ok) {
          throw new Error(`Failed to delete category with id ${id}`);
        }
    
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedCategory) {
      await deleteCategory(selectedCategory.id);
      setDeleteDialogOpen(false);
      setSelectedCategory(null);
    }
  };

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3,
        flexDirection: isMobile ? 'column' : 'row',
        gap: 2
      }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Categories
        </Typography>
        <TextField
          label="Search Categories"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: isMobile ? '100%' : 300 }}
        />
      </Box>

      {filteredCategories.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Typography variant="h6">
            {searchTerm ? 'No matching categories found' : 'No categories available'}
          </Typography>
          {searchTerm && (
            <Button variant="text" onClick={() => setSearchTerm('')} sx={{ mt: 1 }}>
              Clear search
            </Button>
          )}
        </Box>
      ) : isMobile ? (
        <Grid container spacing={2}>
          {filteredCategories.map((category) => (
            <Grid item xs={12} key={category.id}>
              <Card>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={category.image?.startsWith("http") ? category.image : `${URL}/${category.image}`}
                    alt={category.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {category.name}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <IconButton 
                        color="error" 
                        onClick={() => handleDeleteClick(category)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Image</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id} hover>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <Box
                      component="img"
                      src={category.image?.startsWith("http") ? category.image : `${URL}/${category.image}`}
                      alt={category.name}
                      sx={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 1 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <IconButton 
                        color="error" 
                        onClick={() => handleDeleteClick(category)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          Delete Category
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{selectedCategory?.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoriesList;
