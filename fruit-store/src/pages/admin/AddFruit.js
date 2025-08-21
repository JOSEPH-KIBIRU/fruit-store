import { useState } from "react";
import { Container, TextField, Button, Box, Typography, MenuItem } from "@mui/material";
import { supabase } from "../../lib/supabaseClient";

export default function AddFruit() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    unit: "kg",
    description: "",
    category: "fruits",
    stock_quantity: 0,
    is_available: true,
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = null;

      // Upload image if selected
      if (image) {
        const fileName = `${Date.now()}-${image.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("fruit-images")
          .upload(fileName, image);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: urlData } = supabase.storage
          .from("fruit-images")
          .getPublicUrl(uploadData.path);

        imageUrl = urlData.publicUrl;
      }

      // Insert fruit data
      const { error } = await supabase.from("fruits").insert([
        {
          ...formData,
          price: parseFloat(formData.price),
          image_url: imageUrl,
          created_at: new Date(),
        },
      ]);

      if (error) throw error;

      // Reset form
      setFormData({ name: "", price: "", unit: "kg", description: "" });
      setImage(null);
      alert("Fruit added successfully!");
    } catch (error) {
      alert("Error adding fruit: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add New Fruit
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Category"
            select
            fullWidth
            margin="normal"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <MenuItem value="fruits">Fruits</MenuItem>
            <MenuItem value="vegetables">Vegetables</MenuItem>
            <MenuItem value="berries">Berries</MenuItem>
            <MenuItem value="tropical">Tropical</MenuItem>
          </TextField>

          <TextField
            label="Stock Quantity"
            type="number"
            fullWidth
            margin="normal"
            value={formData.stock_quantity}
            onChange={(e) =>
              setFormData({
                ...formData,
                stock_quantity: parseInt(e.target.value),
              })
            }
          />
          <TextField
            label="Fruit Name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <TextField
            label="Price"
            type="number"
            fullWidth
            margin="normal"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
          />

          <TextField
            label="Unit"
            fullWidth
            margin="normal"
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            required
          />

          <TextField
            label="Description"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ margin: "16px 0" }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? "Adding..." : "Add Fruit"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}
