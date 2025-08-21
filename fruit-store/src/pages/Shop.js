import { useEffect, useState } from 'react'
import { Container, Grid, Typography } from '@mui/material'
import { supabase } from '../lib/supabaseClient'
import FruitCard from '../components/FruitCard'

export default function Shop() {
  const [fruits, setFruits] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFruits()
  }, [])

  const fetchFruits = async () => {
    try {
      const { data, error } = await supabase
        .from('fruits')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setFruits(data)
    } catch (error) {
      console.error('Error fetching fruits:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Typography>Loading fruits...</Typography>

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Our Fresh Fruits
      </Typography>
      <Grid container spacing={3}>
        {fruits.map((fruit) => (
          <Grid item xs={12} sm={6} md={4} key={fruit.id}>
            <FruitCard fruit={fruit} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}