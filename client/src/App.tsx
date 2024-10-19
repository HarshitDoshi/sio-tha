import HeroIllustration from './assets/static/hero.svg';
import { Box, Button, FormControlLabel, Grid2 as Grid, Switch, TextField, Typography } from '@mui/material';
import { Shell } from './components';
import { useCreateSpace } from './utilities/services';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function App() {
  const location = useLocation();
  const [showHeaderAndFooter, setShowHeaderAndFooter] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState<boolean>(false);
  const [haveSpaceCode, setHaveSpaceCode] = useState<boolean>(false);
  const [spaceCode, setSpaceCode] = useState<string>("");
  useEffect(() => {
    if (location.pathname === "/") {
      setShowHeaderAndFooter(true);
      setShowLandingPage(true);
    } else {
      setShowHeaderAndFooter(true);
      setShowLandingPage(false);
    }
  }, [location.pathname]);

  const navigate = useNavigate();
  const createSpaceMutation = useCreateSpace();

  useEffect(() => {
    const lastUsedSpace = localStorage.getItem("whoa!llet-space");
    if (lastUsedSpace) {
      navigate(`/${lastUsedSpace}`);
    }
    if (createSpaceMutation.isSuccess) {
      localStorage.setItem("whoa!llet-space", createSpaceMutation.data.id);
      navigate(`/${createSpaceMutation.data.id}`);
    }
  }, [createSpaceMutation.isSuccess, navigate, createSpaceMutation.data?.id]);

  const handleCTAClick = () => {
    if (haveSpaceCode) {
      setSpaceCode("");
      setHaveSpaceCode(false);
      localStorage.setItem("whoa!llet-space", spaceCode);
      navigate(`/${spaceCode}`);
    } else {
      createSpaceMutation.mutate({
        name: "New Space",
      })
    }
  };

  return (
    <Shell
      showHeaderAndFooter={showHeaderAndFooter}
    >
      {
        showLandingPage && (
          <Grid
            container spacing={2} width={"100%"} height={"100%"}
            alignItems={'stretch'}
            justifyContent={'center'}
          >
            <Grid size={{ sm: 12, xs: 12, md: 6 }}>
              <Box
                sx={{
                  height: '100%',
                  paddingY: '2rem',
                  paddingX: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '2rem',
                }}
              >
                <Typography
                  variant={'h2'}
                  fontWeight={'bold'}
                >
                  {"Woah! Where'd my money go?"}
                </Typography>
                <Box
                  component={'img'}
                  src={HeroIllustration}
                  alt="Hero Illustration"
                  sx={{
                    height: '100%',
                    maxWidth: '100%',
                    width: '100%',
                  }}
                />
              </Box>
            </Grid>
            <Grid size={{ sm: 12, xs: 12, md: 6 }}>
              <Box
                sx={{
                  height: '100%',
                  paddingX: '4rem',
                  paddingY: '8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1rem',
                  background: 'radial-gradient(circle, rgba(0, 115, 230, 0.4) 0%, rgba(0, 115, 230, 0) 60%)',
                  borderRadius: '50%',
                }}
              >
                <FormControlLabel
                  value={haveSpaceCode}
                  onChange={() => setHaveSpaceCode(!haveSpaceCode)}
                  control={<Switch color="primary" />}
                  label={<Typography variant={'body2'} marginX={'0.5rem'}>{"I have a space code"}</Typography>}
                  labelPlacement={'end'}
                />
                {
                  haveSpaceCode && (
                    <TextField
                      fullWidth
                      variant={'outlined'}
                      label={'Space Code'}
                      value={spaceCode}
                      onChange={(event) => setSpaceCode(event.target.value)}
                    />
                  )
                }
                <Button
                  // fullWidth
                  disabled={
                    createSpaceMutation.isPending
                    || (haveSpaceCode && !spaceCode)
                  }
                  variant={'contained'}
                  size={'large'}
                  onClick={handleCTAClick}
                >
                  {
                    createSpaceMutation.isPending
                      ? 'Creating a space...'
                      : haveSpaceCode
                        ? 'Enter Space'
                        : 'Get Started!'
                  }
                </Button>
              </Box>
            </Grid>
          </Grid>
        )
      }
      <Outlet />
    </Shell>
  )
}

export default App
