import Box from "@mui/material/Box";
import { DataGrid, GridEventListener, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";

type DataGridProps = {
  rows: any[];
  columns: GridColDef[];
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  rowCount?: number;
  hidePagination?: boolean;
  apiRef?: any;
  isFetching?: boolean;
  onRowClick?: GridEventListener<"rowClick"> | undefined;
};

export const CustomTable = ({
  rows = [],
  columns,
  setPage,
  rowCount = 0,
  isFetching,
  hidePagination,
  apiRef,
  onRowClick,
}: DataGridProps) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    if (setPage) {
      setPage(() => paginationModel.page + 1);
    }
  }, [paginationModel.page, setPage]);

  return (
    <Box
      sx={{
        marginBlock: "10px",
        "& .MuiDataGrid-overlayWrapper": {
          minHeight: isFetching ? "" : "450px",
        },
        "& .MuiDataGrid-columnHeaders": {
          borderBlock: "1px solid #9D9CAF !important",
          borderRadius: "0px",
          outline: "none !important",
        },
        "& .MuiDataGrid-columnHeaderTitleContainer": {
          textTransform: "uppercase",
          fontSize: "12px",
          paddingBlock: "0px !important",
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: "600",
        },
        "& .MuiDataGrid-columnSeparator": {
          display: "none",
        },
        "& .MuiDataGrid-row": {
          cursor: onRowClick ? "pointer" : "initial",
        },
      }}
    >
      <DataGrid
        rows={rows || []}
        columns={columns}
        rowHeight={39}
        columnHeaderHeight={39}
        pageSizeOptions={[10]}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowCount={rowCount || 0}
        loading={isFetching}
        disableColumnSorting
        disableRowSelectionOnClick
        filterMode="server"
        slots={{
          toolbar: GridToolbar,
        }}
        disableColumnMenu
        disableDensitySelector
        disableColumnFilter
        disableColumnSelector
        hideFooterPagination={hidePagination}
        apiRef={apiRef}
        slotProps={{
          toolbar: {
            printOptions: { disableToolbarButton: true },
            csvOptions: { disableToolbarButton: true },
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        onRowClick={onRowClick}
      />
    </Box>
  );
};
