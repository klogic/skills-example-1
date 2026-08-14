import { Suspense } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { recipesApi } from '@/lib/api';
import RecipeList from '@/components/features/recipes/RecipeList';
import RecipeSearch from '@/components/features/recipes/RecipeSearch';

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: { query?: string; spiceLevel?: string; page?: string };
}) {
  const data = await recipesApi.list({
    query: searchParams.query,
    page: searchParams.page ? Number(searchParams.page) : 1,
  });

  return (
    <Box sx={{ bgcolor: 'grey.900', minHeight: '100vh' }}>
      <Box sx={{ px: { xs: 3, md: 6 }, pt: { xs: 6, md: 8 }, pb: 5 }}>
        <Typography
          sx={{
            color: 'secondary.main',
            letterSpacing: 6,
            fontSize: '0.7rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            mb: 2,
          }}
        >
          ✦ &nbsp; Thai Recipes &nbsp; ✦
        </Typography>
        <Typography variant="h3" component="h1" sx={{ color: 'white', fontWeight: 700 }}>
          สูตรอาหารไทย
        </Typography>
        <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300, mt: 0.5, mb: 3 }}>
          Recipes
        </Typography>
        <Box sx={{ width: 48, height: 3, bgcolor: 'secondary.main', borderRadius: 1, mb: 3 }} />
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, mb: 3 }}>
          Explore our collection of authentic Thai recipes from across the kingdom.
        </Typography>
        <RecipeSearch />
      </Box>
      <Box sx={{ px: { xs: 3, md: 6 }, pb: 8 }}>
        <Suspense fallback={<CircularProgress sx={{ mt: 4, color: 'secondary.main' }} />}>
          <RecipeList data={data} />
        </Suspense>
      </Box>
    </Box>
  );
}
