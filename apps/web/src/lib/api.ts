import type {
  CategoryResponse,
  CreateRecipeDto,
  RecipeListResponse,
  RecipeResponse,
  SearchRecipeDto,
  UpdateRecipeDto,
} from '@repo/shared';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export const recipesApi = {
  list: (query: SearchRecipeDto = {}): Promise<RecipeListResponse> => {
    const params = new URLSearchParams(
      Object.entries(query)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)]),
    );
    return apiFetch<RecipeListResponse>(`/recipes?${params.toString()}`);
  },

  get: (id: string): Promise<RecipeResponse> =>
    apiFetch<RecipeResponse>(`/recipes/${id}`),

  create: (dto: CreateRecipeDto): Promise<RecipeResponse> =>
    apiFetch<RecipeResponse>('/recipes', {
      method: 'POST',
      body: JSON.stringify(dto),
    }),

  update: (id: string, dto: UpdateRecipeDto): Promise<RecipeResponse> =>
    apiFetch<RecipeResponse>(`/recipes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dto),
    }),

  remove: (id: string): Promise<void> =>
    apiFetch<void>(`/recipes/${id}`, { method: 'DELETE' }),
};

export const categoriesApi = {
  list: (): Promise<CategoryResponse[]> =>
    apiFetch<CategoryResponse[]>('/categories'),
};
