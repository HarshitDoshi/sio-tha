import { Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColumns } from "../../../utilities/grid";
import { ITransactionsTable } from "../types";

const TransactionsTable = ({ transactions }: ITransactionsTable) => {
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
        rows={transactions || []}
        columns={GridColumns}
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