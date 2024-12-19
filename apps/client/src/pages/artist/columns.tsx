import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";
import { ActionButton } from "src/components/ui";
import dayjs from "dayjs";
import { IArtist } from "@libs/types";

interface Props {
  handleEdit: (params: GridRenderCellParams<IArtist, any>) => void;
  handleDelete: (params: GridRenderCellParams<IArtist, any>) => void;
}

export const useColumns = ({ handleEdit, handleDelete }: Props) => {
  const columns: GridColDef[] = useMemo(() => {
    return [
      {
        flex: 1,
        field: "name",
        headerName: "Name",
      },
      {
        flex: 1,
        field: "address",
        headerName: "Address",
      },
      {
        flex: 1,
        field: "gender",
        headerName: "Gender",
        renderCell: (params: GridRenderCellParams<IArtist, any>) => {
          return (
            <>
              {params.value === "m"
                ? "Male"
                : params.value === "f"
                  ? "Female"
                  : "Other"}
            </>
          );
        },
      },
      {
        flex: 1,
        field: "dob",
        headerName: "Date of Birth",
        renderCell: (params: GridRenderCellParams<IArtist, Date>) => {
          return <>{dayjs(params?.value).format("D MMM, YYYY")} </>;
        },
      },
      {
        flex: 1,
        field: "first_release_year",
        headerName: "First Release Year",
      },
      {
        flex: 1,
        field: "no_of_albums_released",
        headerName: "Albums Released",
      },
      {
        flex: 0.5,
        field: "action",
        headerName: "Action",
        sortable: false,
        renderCell: (params: GridRenderCellParams<IArtist, any>) => {
          return (
            <>
              <ActionButton
                handleEdit={() => handleEdit(params)}
                handleDelete={() => handleDelete(params)}
              />
            </>
          );
        },
      },
    ];
  }, []);

  return columns;
};
