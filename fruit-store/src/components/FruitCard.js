import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useCart } from "../context/CartContext";

export default function FruitCard({ fruit }) {
  const { addToCart } = useCart();

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={fruit.image_url || "/placeholder-fruit.jpg"}
        alt={fruit.name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {fruit.name}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
          KSh {Math.round(fruit.price * 100).toLocaleString()} / {fruit.unit}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {fruit.description || "Fresh and delicious!"}
        </Typography>
        <Button variant="contained" fullWidth onClick={() => addToCart(fruit)}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
