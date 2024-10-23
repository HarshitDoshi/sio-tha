import { Container } from "@mui/material";
import { DataGrid, GridColDef, GridEventListener, GridRowEditStopReasons, GridRowId, GridRowModel, GridRowModesModel, GridValidRowModel } from "@mui/x-data-grid";
import { getColumns } from "../../../utilities/grid";
import { ITransactionsTable } from "../types";
import { useEffect, useState } from "react";
import { useDeleteTransaction } from "../../../utilities/services";
import { ITransaction } from "../../../utilities/types";

const TransactionsTable = ({ spaceId, transactions }: ITransactionsTable) => {

  const deleteTransactionMutation = useDeleteTransaction({
    spaceId,
  });

  const [rows, setRows] = useState(transactions || []);
  useEffect(() => {
    if (transactions) setRows(transactions);
  }, [transactions]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
    deleteTransactionMutation.mutate(id as ITransaction['id']);
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow as ITransaction, };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  return (
    <Container
      maxWidth="xl"
      sx={{
        flexGrow: 1,
      }}
    >
      <DataGrid
        sx={{
          width: '100%',
        }}
        rows={rows}
        columns={getColumns({
          handleDeleteClick,
        }) as GridColDef<GridValidRowModel>[]}
        editMode={"row"}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 12,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Container>
  );
};

export default TransactionsTable;
