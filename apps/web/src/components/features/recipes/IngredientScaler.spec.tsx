import { render, screen, fireEvent } from '@testing-library/react';
import IngredientScaler from './IngredientScaler';
import { IngredientUnit } from '@repo/shared';
import type { IngredientResponse } from '@repo/shared';

const ingredients: IngredientResponse[] = [
  {
    id: 'ing-1',
    nameEn: 'Rice noodles',
    nameTh: 'เส้นก๋วยเตี๋ยว',
    quantity: 200,
    unit: IngredientUnit.GRAMS,
  },
  {
    id: 'ing-2',
    nameEn: 'Fish sauce',
    nameTh: 'น้ำปลา',
    quantity: 2,
    unit: IngredientUnit.TABLESPOONS,
  },
];

describe('IngredientScaler', () => {
  it('renders Thai and English ingredient names', () => {
    render(<IngredientScaler ingredients={ingredients} baseServings={2} />);
    expect(screen.getByText(/Rice noodles/)).toBeInTheDocument();
    expect(screen.getByText(/เส้นก๋วยเตี๋ยว/)).toBeInTheDocument();
    expect(screen.getByText(/Fish sauce/)).toBeInTheDocument();
    expect(screen.getByText(/น้ำปลา/)).toBeInTheDocument();
  });

  it('shows base quantity at default servings', () => {
    render(<IngredientScaler ingredients={ingredients} baseServings={2} />);
    expect(screen.getByText(/200\.0 grams/)).toBeInTheDocument();
    expect(screen.getByText(/2\.0 tablespoons/)).toBeInTheDocument();
  });

  it('scales ingredient quantities when servings change', () => {
    render(<IngredientScaler ingredients={ingredients} baseServings={2} />);
    const slider = screen.getByRole('slider', { name: /serving size/i });
    fireEvent.change(slider, { target: { value: '4' } });
    expect(screen.getByText(/400\.0 grams/)).toBeInTheDocument();
  });

  it('handles null / empty ingredient list without crashing', () => {
    render(<IngredientScaler ingredients={[]} baseServings={2} />);
    expect(screen.queryByRole('listitem')).toBeNull();
  });
});
