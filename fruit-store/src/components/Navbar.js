import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, logout } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', width: 250 }}>
      <Typography variant="h6" sx={{ my: 2 }}>
       Anns Fresh Fruit Store
      </Typography>
      <List>
        <ListItem component={Link} to="/shop">
          <ListItemText primary="Shop" />
        </ListItem>
        <ListItem component={Link} to="/cart">
          <ListItemText primary="Cart" />
        </ListItem>
        {user && (
          <ListItem component={Link} to="/admin">
            <ListItemText primary="Admin" />
          </ListItem>
        )}
        {user ? (
          <ListItem onClick={logout}>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Anns Fresh Fruit Store
            </Link>
          </Typography>
          
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit" component={Link} to="/shop">
                Shop
              </Button>
              <Button color="inherit" component={Link} to="/cart" startIcon={<ShoppingCartIcon />}>
                Cart
              </Button>
              {user?.email === 'admin1@gmail.com' && (
                <Button color="inherit" component={Link} to="/admin" startIcon={<DashboardIcon />}>
                  Admin
                </Button>
              )}
              {user ? (
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              ) : (
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </>
  );
}