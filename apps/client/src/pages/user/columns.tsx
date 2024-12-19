import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";
import { ActionButton } from "src/components/ui";
import dayjs from "dayjs";
import { IUser } from "@libs/types";

interface Props {
  handleEdit: (params: GridRenderCellParams<IUser, any>) => void;
}

export const useColumns = ({ handleEdit }: Props) => {
  const columns: GridColDef[] = useMemo(() => {
    return [
      {
        flex: 1,
        field: "first_name",
        headerName: "First Name",
      },
      {
        flex: 1,
        field: "last_name",
        headerName: "Last Name",
      },
      {
        flex: 1,
        field: "email",
        headerName: "Email",
      },
      {
        flex: 1,
        field: "gender",
        headerName: "Gender",
        renderCell: (params: GridRenderCellParams<IUser, any>) => {
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
        field: "phone",
        headerName: "Phone",
      },
      {
        flex: 1,
        field: "address",
        headerName: "Address",
      },
      {
        flex: 1,
        field: "dob",
        headerName: "Date of Birth",
        renderCell: (params: GridRenderCellParams<IUser, Date>) => {
          return <>{dayjs(params?.value).format("D MMM, YYYY")} </>;
        },
      },
      {
        flex: 0.5,
        field: "action",
        headerName: "Action",
        sortable: false,
        renderCell: (params: GridRenderCellParams<IUser, any>) => {
          return (
            <>
              <ActionButton
                handleEdit={() => handleEdit(params)}
                handleDelete={() => console.log("deleteModal", params?.row)}
              />
            </>
          );
        },
      },
    ];
  }, []);

  return columns;
};
