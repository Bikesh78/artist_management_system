import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";
import { ActionButton } from "src/components/ui";
import { IMusic } from "@libs/types";

interface Props {
  handleEdit: (params: GridRenderCellParams<IMusic, any>) => void;
  handleDelete: (params: GridRenderCellParams<IMusic, any>) => void;
}

export const useColumns = ({ handleEdit, handleDelete }: Props) => {
  const columns: GridColDef[] = useMemo(() => {
    return [
      {
        flex: 1,
        field: "title",
        headerName: "Title",
      },
      {
        flex: 1,
        field: "album_name",
        headerName: "Album Name",
      },
      {
        flex: 1,
        field: "genre",
        headerName: "Genre",
      },
      {
        flex: 0.5,
        field: "action",
        headerName: "Action",
        sortable: false,
        renderCell: (params: GridRenderCellParams<IMusic, any>) => {
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
