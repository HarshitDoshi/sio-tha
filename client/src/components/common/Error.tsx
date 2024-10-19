import { Button, Container, Typography } from "@mui/material";
import { IError } from ".";

const Error = ({ handlerError, handleErrorLabel }: IError) => {
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
      <Typography color={'error'} variant={'h3'}>
        {"Uh oh! Something went wrong!"}
      </Typography>
      {
        handlerError && (
          <Button
            variant="contained"
            size={'large'}
            onClick={handlerError}
          >
            {handleErrorLabel}
          </Button>
        )
      }
    </Container>
  );
};

export default Error;