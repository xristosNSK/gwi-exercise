import { FC, forwardRef, useState } from 'react';

import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { IoSettings } from 'react-icons/io5';
import { LuCat, LuDog } from 'react-icons/lu';
import { useSelector } from 'react-redux';
import { NavLink as NavLinkBase } from 'react-router-dom';

import { getAnimalType } from '@/models/ui';

import { Routes } from '@/routes/routes';

import { SettingDrawer } from '@/components/settings-drawer';

import { NavButton, Grow } from './header.style';

interface NavLinkProps {
  href: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>((props, ref) => (
  <NavLinkBase ref={ref} to={props.href} {...props} />
));

NavLink.displayName = 'NavLinkRef';

export const Header: FC = () => {
  const animalType = useSelector(getAnimalType);
  const [settings, setSettings] = useState(false);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Typography variant="h6" marginRight={2} lineHeight={1}>
            {animalType === 'cat' ? <LuCat /> : <LuDog />}
          </Typography>

          {Object.values(Routes).map(({ label, path }) => (
            <NavButton key={path} size="small" LinkComponent={NavLink} href={path} color="inherit">
              {label}
            </NavButton>
          ))}

          <Grow />

          <IconButton color="inherit" size="small" onClick={() => setSettings(true)}>
            <IoSettings />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Toolbar variant="dense" sx={{ mb: 2 }} />

      <SettingDrawer open={settings} setOpen={setSettings} />
    </>
  );
};
