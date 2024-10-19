import { Add, Analytics, CheckCircle, ContentCopy, Delete, Error } from "@mui/icons-material";
import { Button, Container } from "@mui/material";
import { ISpaceActions } from "../types";

const SpaceActions = ({
  copySpaceIdLog,
  toggleCreateTransactionDrawer,
  toggleVisualizeTransactionsDrawer,
  handleCopySpaceId,
  handleForgetSpaceDialogOpen,
  openConfirmForgetSpaceDialog,
}: ISpaceActions) => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
      }}>
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <Button
          variant="contained"
          size={'medium'}
          startIcon={<Add />}
          endIcon={<Add sx={{ color: 'transparent' }} />}
          color={'primary'}
          onClick={toggleCreateTransactionDrawer(true)}
        >
          {"Transaction"}
        </Button>
        <Button
          variant="contained"
          size={'medium'}
          startIcon={<Analytics />}
          endIcon={<Analytics sx={{ color: 'transparent' }} />}
          color={'secondary'}
          onClick={toggleVisualizeTransactionsDrawer(true)}
        >
          {"Visualize"}
        </Button>
        <Button
          variant="contained"
          size={'medium'}
          color={
            (copySpaceIdLog && !openConfirmForgetSpaceDialog)
              ? copySpaceIdLog.type === 'success'
                ? 'success'
                : 'error'
              : 'info'
          }
          onClick={handleCopySpaceId}
          startIcon={
            (copySpaceIdLog && !openConfirmForgetSpaceDialog)
              ? copySpaceIdLog.type === 'success'
                ? <CheckCircle />
                : <Error />
              : <ContentCopy />
          }
          endIcon={
            (copySpaceIdLog && !openConfirmForgetSpaceDialog)
              ? copySpaceIdLog.type === 'success'
                ? <CheckCircle sx={{ color: 'transparent' }} />
                : <Error sx={{ color: 'transparent' }} />
              : <ContentCopy sx={{ color: 'transparent' }} />
          }
        >
          {
            (copySpaceIdLog && !openConfirmForgetSpaceDialog)
              ? copySpaceIdLog.type === 'success'
                ? 'Copied successfully!'
                : 'Failed to copy!'
              : 'Copy space code'
          }
        </Button>
        <Button
          variant="contained"
          size={'medium'}
          color={'error'}
          startIcon={<Delete />}
          endIcon={<Delete sx={{ color: 'transparent' }} />}
          onClick={handleForgetSpaceDialogOpen}
        >
          {'Forget Space'}
        </Button>
      </Container>
    </Container>
  );
};

export default SpaceActions;