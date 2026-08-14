import Chip from '@mui/material/Chip';
import type { SpiceLevel } from '@repo/shared';

const SPICE_LABELS: Record<SpiceLevel, string> = {
  NON_SPICY: 'Not Spicy',
  MILD: 'Mild',
  MEDIUM: 'Medium',
  HOT: 'Hot 🌶',
  THAI_HOT: 'Thai Hot 🌶🌶🌶',
};

const SPICE_COLORS: Record<SpiceLevel, 'default' | 'success' | 'warning' | 'error'> = {
  NON_SPICY: 'default',
  MILD: 'success',
  MEDIUM: 'warning',
  HOT: 'error',
  THAI_HOT: 'error',
};

interface SpiceLevelBadgeProps {
  spiceLevel: SpiceLevel;
}

export default function SpiceLevelBadge({ spiceLevel }: SpiceLevelBadgeProps) {
  return (
    <Chip
      label={SPICE_LABELS[spiceLevel]}
      color={SPICE_COLORS[spiceLevel]}
      size="small"
    />
  );
}
