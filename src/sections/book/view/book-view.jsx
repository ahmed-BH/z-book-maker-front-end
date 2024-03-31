import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Card, Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

export default function BookView() {
  return (
    <Container maxWidth="xl" sx={{height: '100%'}}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Book section</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Book
        </Button>
      </Stack>
      
      <Grid container spacing={3} sx={{height: '100%'}}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Card sx={{height: '100%'}}>
            hello
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Card sx={{height: '100%'}}>
            hello
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}