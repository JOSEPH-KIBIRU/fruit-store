import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import { supabase } from '../../lib/supabaseClient';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ManageFruits() {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFruits();
  }, []);

  const fetchFruits = async () => {
    try {
      const { data, error } = await supabase
        .from('fruits')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFruits(data);
    } catch (error) {
      console.error('Error fetching fruits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (fruitId) => {
    if (!window.confirm('Are you sure you want to delete this fruit?')) return;

    try {
      const { error } = await supabase
        .from('fruits')
        .delete()
        .eq('id', fruitId);

      if (error) throw error;
      setFruits(fruits.filter(fruit => fruit.id !== fruitId));
    } catch (error) {
      alert('Error deleting fruit: ' + error.message);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Manage Fruits
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {fruits.map((fruit) => (
          <Grid item xs={12} sm={6} md={4} key={fruit.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={fruit.image_url || '/placeholder-fruit.jpg'}
                alt={fruit.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {fruit.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${fruit.price} per {fruit.unit}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(fruit.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}