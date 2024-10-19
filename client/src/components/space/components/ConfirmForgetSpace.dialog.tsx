import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { IConfirmForgetSpaceDialog } from "../types";
import { Cancel, CheckCircle, ContentCopy, Delete, Error as ErrorIcon } from "@mui/icons-material";

const ConfirmForgetSpaceDialog = ({ openConfirmForgetSpaceDialog, handleForgetSpaceDialogClose, copySpaceIdLog, handleCopySpaceId, handleForgetSpace }: IConfirmForgetSpaceDialog) => {
  return (
    <Dialog
      open={openConfirmForgetSpaceDialog}
      onClose={handleForgetSpaceDialogClose}
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to forget this space?"}
      </DialogTitle>
      <DialogContent sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        <DialogContentText id="alert-dialog-description">
          {"Forgeting a space will not delete your data. It simply means that the app will not return to this space when you open it next time. To access this space again, you will need to enter the space code. You can use the copy space code button to copy the space code to your clipboard so that you can paste it later."}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant={'text'}
          size={'medium'}
          color={'success'}
          startIcon={
            copySpaceIdLog
              ? copySpaceIdLog.type === 'success'
                ? <CheckCircle color={'success'} />
                : <ErrorIcon color={'error'} />
              : <ContentCopy />
          }
          endIcon={
            copySpaceIdLog
              ? copySpaceIdLog.type === 'success'
                ? <CheckCircle sx={{ color: 'transparent' }} />
                : <ErrorIcon sx={{ color: 'transparent' }} />
              : <ContentCopy sx={{ color: 'transparent' }} />
          }
          onClick={handleCopySpaceId}
        >
          {
            copySpaceIdLog
              ? copySpaceIdLog.type === 'success'
                ? 'Copied successfully!'
                : 'Failed to copy!'
              : 'Copy space code'
          }
        </Button>
        <Button
          variant="text"
          size={'medium'}
          color={'warning'}
          startIcon={<Cancel />}
          endIcon={<Cancel sx={{ color: 'transparent' }} />}
          onClick={handleForgetSpaceDialogClose}
        >
          {"Cancel"}
        </Button>
        <Button
          variant="text"
          size={'medium'}
          color={'error'}
          startIcon={<Delete />}
          endIcon={<Delete sx={{ color: 'transparent' }} />}
          onClick={handleForgetSpace}
          autoFocus
        >
          Forget
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmForgetSpaceDialog;