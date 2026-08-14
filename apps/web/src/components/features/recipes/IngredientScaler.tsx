'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import type { IngredientResponse } from '@repo/shared';

interface IngredientScalerProps {
  ingredients: IngredientResponse[];
  baseServings: number;
}

export default function IngredientScaler({
  ingredients,
  baseServings,
}: IngredientScalerProps) {
  const [servings, setServings] = useState(baseServings);
  const scale = servings / baseServings;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
          Servings / จำนวนที่เสิร์ฟ:
        </Typography>
        <Typography variant="h6" sx={{ color: 'secondary.main' }}>
          {servings}
        </Typography>
      </Box>
      <Slider
        value={servings}
        onChange={(_, val) => setServings(val as number)}
        min={1}
        max={baseServings * 4}
        step={1}
        sx={{ maxWidth: 300, mb: 3, color: 'secondary.main' }}
        aria-label="Serving size"
      />
      <List dense>
        {ingredients.map((ingredient) => (
          <ListItem key={ingredient.id} disableGutters>
            <ListItemText
              primary={`${ingredient.nameEn} / ${ingredient.nameTh}`}
              secondary={`${(ingredient.quantity * scale).toFixed(1)} ${ingredient.unit}`}
              primaryTypographyProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
              secondaryTypographyProps={{ sx: { color: 'rgba(255,255,255,0.4)' } }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
