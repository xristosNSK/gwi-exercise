import { FC } from 'react';

import { Drawer, IconButton, ButtonGroup, Button, Box, Divider, Typography } from '@mui/material';
import { BsFillSunFill, BsMoonFill } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';

import { getMode, getAnimalType, setMode, setAnimalType } from '@/models/ui';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const SettingDrawer: FC<Props> = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const mode = useSelector(getMode);
  const animalType = useSelector(getAnimalType);

  const updateMode = (mode: 'light' | 'dark') => {
    dispatch(setMode(mode));
  };

  const toggleAnimalType = () => {
    const type = animalType === 'cat' ? 'dog' : 'cat';
    dispatch(setAnimalType(type));
    setOpen(false);
  };

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <Box paddingX={3}>
        <Box paddingY={2} display="flex" justifyContent="space-between">
          <Typography variant="body1">Settings</Typography>

          <IconButton size="small" onClick={() => setOpen(false)}>
            <MdOutlineClose />
          </IconButton>
        </Box>

        <Divider />

        <Box paddingY={2}>
          <Typography variant="button" display="block" gutterBottom>
            Mode
          </Typography>

          <ButtonGroup size="medium">
            <Button
              startIcon={<BsFillSunFill />}
              color={mode === 'light' ? 'primary' : 'inherit'}
              onClick={() => updateMode('light')}
            >
              Light
            </Button>
            <Button
              startIcon={<BsMoonFill />}
              color={mode === 'dark' ? 'primary' : 'inherit'}
              onClick={() => updateMode('dark')}
            >
              Dark
            </Button>
          </ButtonGroup>
        </Box>

        <Box paddingY={2} textAlign="center">
          <Button variant="outlined" color="primary" onClick={() => toggleAnimalType()}>
            Not a {animalType === 'cat' ? 'Cat' : 'Dog'} person?
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
