import { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';

import Nav from './nav';
import Main from './main';
import Header from './header';
import { isNavFixed } from './config-layout';
import DocumentHeaderSection from './common/document-header-section';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  const { pathname } = useLocation();
  const documentSection = pathname.endsWith('book') ? (<DocumentHeaderSection />) : null;

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} documentSection={documentSection}/>
      { !isNavFixed && (<Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />) }
      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        { isNavFixed && (<Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />) }

        <Main>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
