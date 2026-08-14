import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import type { RecipeListResponse } from '@repo/shared';
import RecipeCard from './RecipeCard';

interface RecipeListProps {
  data: RecipeListResponse;
}

export default function RecipeList({ data }: RecipeListProps) {
  if (data.items.length === 0) {
    return (
      <Typography sx={{ color: 'rgba(255,255,255,0.5)', mt: 4 }}>
        No recipes found. / ไม่พบสูตรอาหาร
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {data.items.map((recipe) => (
        <Grid item xs={12} sm={6} md={4} key={recipe.id}>
          <RecipeCard recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  );
}
