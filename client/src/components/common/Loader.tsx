import { CircularProgress, Container, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        gap: '1rem',
      }}
    >
      <CircularProgress />
      <Typography color={'info'} variant={'h3'}>
        {"Loading..."}
      </Typography>
    </Container>
  );
};

export default Loader;