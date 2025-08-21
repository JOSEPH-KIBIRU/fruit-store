// eslint-disable-next-line no-unused-vars
import { Container, Typography, Button, Box, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';

export default function Dashboard() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <AddIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Add New Fruit
              </Typography>
              <Button 
                variant="contained" 
                component={Link} 
                to="/admin/add"
                sx={{ mt: 2 }}
              >
                Add Fruit
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <ListIcon sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Manage Fruits
              </Typography>
              <Button 
                variant="contained" 
                color="secondary"
                component={Link} 
                to="/admin/manage"
                sx={{ mt: 2 }}
              >
                Manage
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}