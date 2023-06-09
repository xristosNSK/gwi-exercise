import { FC, useState, MouseEvent as ReactMouseEvent } from 'react';

import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Stack,
  Chip,
  Box,
  ButtonGroup,
  Button,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { TiInfoLargeOutline } from 'react-icons/ti';

import { Breed } from '@/models/interfaces/breed';

import { LifeSpanSlider } from '@/components/life-span-slider';
import { ScoresGrid } from '@/components/scores-grid';

import { capitalize } from '@/utils/capitalize';

import { SummaryButtons } from './breed-accordion.style';

interface Props {
  breed: Breed;
  onLinkClick?: (breed: Breed) => void;
  onCloseClick?: () => void;
}

const BREED_SCORES: (keyof Breed)[] = [
  'adaptability',
  'affection_level',
  'child_friendly',
  'dog_friendly',
  'energy_level',
  'experimental',
  'grooming',
  'hairless',
  'indoor',
  'intelligence',
  'lap',
  'natural',
  'rare',
  'rex',
  'shedding_level',
  'short_legs',
  'social_needs',
  'stranger_friendly',
  'suppressed_tail',
  'vocalisation',
];

function normalizeKey(key: string) {
  return capitalize(key.replace(/_/g, ' '));
}

export const BreedAccordion: FC<Props> = ({ breed, onLinkClick, onCloseClick }) => {
  const [open, setOpen] = useState(false);

  const scores = BREED_SCORES.reduce(
    (prev, id) => ({
      ...prev,
      ...(typeof breed[id] === 'number' ? { [normalizeKey(id)]: breed[id] as number } : {}),
    }),
    {} as Record<string, number>
  );

  const onBreedButtonClick = (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    onLinkClick(breed);
  };

  return (
    <Accordion expanded={open} onChange={(_, isExpanded) => setOpen(isExpanded)}>
      <AccordionSummary>
        <Typography variant="body1">{breed.name}</Typography>

        <SummaryButtons>
          {onLinkClick && (
            <Tooltip title="More from this breed" placement='top'>
              <IconButton type="button" size="small" onClick={onBreedButtonClick}>
                <TiInfoLargeOutline />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Read more" placement='top'>
            <IconButton type="button" size="small">
              {open ? <BiChevronUp /> : <BiChevronDown />}
            </IconButton>
          </Tooltip>

          {onCloseClick && (
            <Tooltip title="Close" placement='top'>
              <IconButton type="button" size="small" onClick={onCloseClick}>
                <IoMdClose />
              </IconButton>
            </Tooltip>
          )}
        </SummaryButtons>
      </AccordionSummary>

      <AccordionDetails>
        {breed.description && (
          <>
            <Typography variant="body2" marginBottom={2}>
              {breed.description}
            </Typography>

            <Box marginBottom={2}>
              <Divider />
            </Box>
          </>
        )}

        {breed.alt_names && (
          <Box marginBottom={2}>
            <Typography variant="body1" textAlign="center" gutterBottom>
              Alternative Names
            </Typography>

            <Stack direction="row" justifyContent="center" spacing={1}>
              {breed.alt_names.split(', ').map((name) => (
                <Chip key={name} label={name} />
              ))}
            </Stack>
          </Box>
        )}

        {breed.temperament && (
          <Box marginBottom={2}>
            <Typography variant="body1" textAlign="center" gutterBottom>
              Temperament
            </Typography>

            <Typography variant="body2" textAlign="center">
              {breed.temperament}
            </Typography>
          </Box>
        )}

        {breed.life_span && <LifeSpanSlider lifeSpan={breed.life_span} />}

        <ScoresGrid scores={scores} range={[0, 5]} />

        <Box display="flex" justifyContent="center" marginBottom={2}>
          <ButtonGroup size="small">
            {breed.wikipedia_url && (
              <Button key="wiki" href={breed.wikipedia_url} target="_blank">
                Wikipedia
              </Button>
            )}

            {breed.cfa_url && (
              <Button key="cfa" href={breed.cfa_url} target="_blank">
                CFA
              </Button>
            )}

            {breed.vcahospitals_url && (
              <Button key="vca" href={breed.vcahospitals_url} target="_blank">
                VCA Hospitals
              </Button>
            )}
          </ButtonGroup>
        </Box>

        {onLinkClick && (
          <Box display="flex" justifyContent="center">
            <Button type="button" variant="contained" onClick={onBreedButtonClick}>
              More from this breed
            </Button>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};
