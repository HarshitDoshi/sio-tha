import { Box } from "@mui/material";
import Header from "./Header";
import { IShellProperties } from "./types";

const Shell = ({ showHeaderAndFooter, children }: IShellProperties) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: '100%',
        height: '100%',
        maxHeight: '100%',
        minWidth: '100%',
        width: '100%',
        maxWidth: '100%',
      }}
    >
      {showHeaderAndFooter && <Header />}
      {children}
    </Box>
  );
};

export default Shell;