import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { recipesApi } from '@/lib/api';
import IngredientScaler from '@/components/features/recipes/IngredientScaler';
import SpiceLevelBadge from '@/components/ui/SpiceLevelBadge';

export default async function RecipeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const recipe = await recipesApi.get(params.id);

  return (
    <Box sx={{ bgcolor: 'grey.900', minHeight: '100vh' }}>
      {/* Page header */}
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
          ✦ &nbsp; Thai Recipe &nbsp; ✦
        </Typography>
        <Typography variant="h3" component="h1" sx={{ color: 'white', fontWeight: 700 }}>
          {recipe.titleTh}
        </Typography>
        <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300, mt: 0.5, mb: 3 }}>
          {recipe.titleEn}
        </Typography>
        <Box sx={{ width: 48, height: 3, bgcolor: 'secondary.main', borderRadius: 1, mb: 3 }} />
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, mb: 1.5 }}>
          {recipe.descriptionEn}
        </Typography>
        {recipe.descriptionTh && (
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.5)', maxWidth: 600, mb: 3 }}>
            {recipe.descriptionTh}
          </Typography>
        )}
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <SpiceLevelBadge spiceLevel={recipe.spiceLevel} />
          <Chip
            label={`${recipe.servings} servings`}
            variant="outlined"
            size="small"
            sx={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.5)' }}
          />
        </Box>
      </Box>

      {/* Ingredients section */}
      <Box sx={{ px: { xs: 3, md: 6 }, pb: 8 }}>
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
          ✦ &nbsp; Ingredients &nbsp; ✦
        </Typography>
        <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
          ส่วนผสม
        </Typography>
        <Box sx={{ width: 48, height: 3, bgcolor: 'secondary.main', borderRadius: 1, mb: 3 }} />
        <IngredientScaler ingredients={recipe.ingredients} baseServings={recipe.servings} />
      </Box>
    </Box>
  );
}
