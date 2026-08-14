'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const searchSchema = z.object({
  query: z.string(),
});

type SearchFormValues = z.infer<typeof searchSchema>;

export default function RecipeSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { register, handleSubmit } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: searchParams.get('query') ?? '' },
  });

  function onSubmit(values: SearchFormValues) {
    const params = new URLSearchParams();
    if (values.query) params.set('query', values.query);
    router.push(`/recipes?${params.toString()}`);
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', gap: 1, mb: 3 }}
    >
      <TextField
        {...register('query')}
        placeholder="Search recipes... / ค้นหาสูตรอาหาร"
        size="small"
        sx={{
          flexGrow: 1,
          '& .MuiOutlinedInput-root': {
            color: 'white',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
            '&.Mui-focused fieldset': { borderColor: 'secondary.main' },
          },
          '& input::placeholder': { color: 'rgba(255,255,255,0.4)', opacity: 1 },
        }}
        inputProps={{ 'aria-label': 'Search recipes' }}
      />
      <Button type="submit" variant="contained">
        Search
      </Button>
    </Box>
  );
}
