import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Skeleton } from "@mui/material";

type DataGridProps = {
  rows: any[];
  columns: GridColDef[];
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  rowCount?: number;
  hidePagination?: boolean;
  apiRef?: any;
  isFetching?: boolean;
};

type LoaderProps = {
  columns: GridColDef[];
};

export const CustomTable = ({
  rows = [],
  columns,
  setPage,
  rowCount = 0,
  isFetching,
  hidePagination,
  apiRef,
}: DataGridProps) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    if (setPage) {
      setPage(() => paginationModel.page + 1);
    }
  }, [paginationModel, setPage]);

  return (
    <Box
      sx={{
        marginBlock: "10px",
        "& .MuiDataGrid-overlayWrapper": {
          minHeight: isFetching ? "" : "450px",
        },
        "& .MuiDataGrid-iconButtonContainer ": {
          display: "none",
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
        // "& .MuiDataGrid-menuIcon": {
          // "& .MuiButtonBase-root": {
          //   color: "white",
          // },
        // },
        // "& .MuiDataGrid-iconButtonContainer": {
        //   "& .MuiButtonBase-root": {
        //     color: "white",
        //   },
        // },
        "& .MuiDataGrid-columnSeparator": {
          display: "none",
        },
        "& .MuiDataGrid-toolbarContainer": {
          marginBlock: "10px",
          "& .MuiInputBase-root": {
            border: "1px solid rgba(0,0,0,0.23)",
            borderRadius: "4px",
            padding: "4px",
            "&:before": {
              borderBottom: "none !important",
            },
            "&:after": {
              display: "none !important",
            },
            "&:hover": {
              "&:before": {
                borderBottom: "none !important",
              },
            },
          },
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
      />
    </Box>
  );
};

export const DataGridLoader = ({ columns }: LoaderProps) => {
  columns = columns.map((item) => {
    return { ...item, renderCell: () => <Skeleton width="70%" /> };
  });
  const rows = [...Array(10)].map((item, index) => ({ id: index }));

  return (
    <>
      <CustomTable columns={columns} rows={rows} />
    </>
  );
};