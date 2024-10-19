import { Box } from "@mui/material";
import { ITabPanel } from "./types";

const TabPanel = (props: ITabPanel) => {
  const { children, value, index, ...other } = props;
  return (
    <Box
      {...other}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        height: '100%',
        maxHeight: '100%',
        minWidth: '100%',
        width: '100%',
        maxWidth: '100%',
        flexGrow: 1,
      }}
    >
      {
        value === index
          ? children
          : null
      }
    </Box>
  );
}

export default TabPanel;