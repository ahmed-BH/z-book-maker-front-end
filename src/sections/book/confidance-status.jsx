import { useMemo } from 'react';

import Tooltip from '@mui/material/Tooltip';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import { useBookPageStore } from './store/book-store';

const ConfidanceStatusColorMapping = [
  { check: (confidence) => confidence < 50, color: 'error' },
  { check: (confidence) => confidence < 70, color: 'warning' },
  { check: (confidence) => confidence < 90, color: 'info' },
  { check: (confidence) => confidence <= 100, color: 'success' },
];

export default function ConfidanceStatus() {
  const storedPage = useBookPageStore();

  const pageConfidence = useMemo(() => Math.ceil(storedPage.textBlocks[0]?.confidence), [storedPage.textBlocks]);
  const color = useMemo(() => ConfidanceStatusColorMapping.find(({ check }) => check(pageConfidence))?.color || 'info',
    [pageConfidence]
  );


  return pageConfidence ? (
    <Tooltip title="Confidence of current scan">
      <Label
        variant="filled"
        color={color} >
        <Iconify icon="f7:scope" />&nbsp; {pageConfidence}%
      </Label>
    </Tooltip>
  )
    : (
      <Tooltip title="Confidence of current scan">
        <Iconify icon="f7:scope" />
      </Tooltip >
    );
};