import { Skeleton, Stack } from '@mui/material';
import React from 'react';
import { useTheme } from 'react-jss';

export default function ChartSkeleton() {
  const theme = useTheme();

  return (
    <Stack spacing={1}>
      <Skeleton sx={{ bgcolor: theme.stroke.light }} variant="text" />
      <Skeleton
        sx={{ bgcolor: theme.stroke.light }}
        variant="rectangular"
        width="100%"
        height={300}
      />
    </Stack>
  );
}
