import { Add } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";

const CreateHeader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '0.5rem',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <Add
          sx={{
            fontSize: '2rem',
          }}
        />
        <Typography
          variant={'h5'}
          fontWeight={'bold'}
        >
          {"Transaction"}
        </Typography>
      </Box>
      <Divider orientation={'horizontal'} sx={{ width: '100%' }} />
    </Box>
  );
};

export default CreateHeader;