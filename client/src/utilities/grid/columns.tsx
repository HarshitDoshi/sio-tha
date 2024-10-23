import { Avatar, Box, Chip, Tooltip, Typography } from "@mui/material";
import { GridActionsCellItem, GridColDef, GridRowId } from "@mui/x-data-grid";
import { ITransaction, ITransactionType } from "../types";
import { Delete } from "@mui/icons-material";

const getColumns = ({
  handleDeleteClick,
}: {
  handleDeleteClick: (id: GridRowId) => () => void;
}) => {
  const columns: GridColDef<(ITransaction[])[number]>[] = [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<Delete />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      renderCell: parameters => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <Tooltip
            title={parameters.value}
          >
            <Typography
              fontFamily={'monospace'}
            >
              {(parameters.value as string).split("-").map(subString => subString.charAt(0).toUpperCase()).join("")}
            </Typography>
          </Tooltip>
        </Box>
      ),
    },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      width: 150,
      editable: false,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 150,
      valueGetter: value => (value as ITransactionType).value,
      renderCell: parameters => {
        return <Chip
          avatar={<Avatar>{parameters.value.charAt(0)}</Avatar>}
          label={parameters.value}
        />
      },
    },
    {
      field: 'occurred_datetime',
      headerName: 'Occurred DateTime',
      type: 'dateTime',
      width: 225,
      editable: false,
      valueGetter: value => new Date(value),
    },
    {
      field: 'created_datetime',
      headerName: 'Created DateTime',
      type: 'dateTime',
      width: 225,
      editable: false,
      valueGetter: value => new Date(value),
    },
    {
      field: 'updated_datetime',
      headerName: 'Updated DateTime',
      type: 'dateTime',
      width: 225,
      editable: false,
      valueGetter: value => new Date(value),
    },
  ];

  return columns;
};

export default getColumns;