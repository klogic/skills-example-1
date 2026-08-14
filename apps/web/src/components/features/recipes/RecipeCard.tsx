import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';
import type { RecipeResponse } from '@repo/shared';
import SpiceLevelBadge from '@/components/ui/SpiceLevelBadge';

interface RecipeCardProps {
  recipe: RecipeResponse;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card
      sx={{
        position: 'relative',
        height: 280,
        overflow: 'hidden',
        borderRadius: 2,
        bgcolor: 'grey.800',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease',
        '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 },
      }}
    >
      <CardActionArea component={Link} href={`/recipes/${recipe.id}`} sx={{ height: '100%' }}>
        {/* Decorative gradient background — no imageUrl on RecipeResponse */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(180,30,20,0.3) 0%, rgba(0,0,0,0.7) 100%)',
          }}
        />
        {/* Bottom-to-top overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
          }}
        />
        {/* Text content at bottom */}
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2.5 }}>
          <SpiceLevelBadge spiceLevel={recipe.spiceLevel} />
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, mt: 0.5 }}>
            {recipe.titleEn}
          </Typography>
          <Typography variant="body2" sx={{ color: 'secondary.main' }}>
            {recipe.titleTh}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255,255,255,0.65)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mt: 0.5,
            }}
          >
            {recipe.descriptionEn}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', mt: 1.5 }}>
            {recipe.servings} servings
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}
