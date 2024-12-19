import { useState } from "react";
import { CustomTable } from "src/components/ui";
import { useFetchUsers } from "./api/fetch-users";
import { useColumns } from "./columns";
import { Box, Button } from "@mui/material";
import { ActiveModal, IUser } from "@libs/types";
import { UserFormModal } from "./user-form-modal";
import { useForm } from "react-hook-form";
import {
  CreateUserInput,
  createUserSchema,
  defaultCreateUserFields,
} from "./api/create-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { UpdateUserInput, updateUserSchema } from "./api/update-user";

export const UserPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useFetchUsers(page);
  const [activeModal, setActiveModal] = useState<ActiveModal>("none");
  const isEditMode = activeModal === "edit";
  const methods = useForm<CreateUserInput | UpdateUserInput>({
    mode: "onBlur",
    defaultValues: defaultCreateUserFields,
    resolver: zodResolver(isEditMode ? updateUserSchema : createUserSchema),
  });

  const handleEdit = ({ row }: GridRenderCellParams<IUser, any>) => {
    methods.reset({
      first_name: row.first_name,
      last_name: row.last_name,
      email: row.email,
      phone: row.phone,
      gender: row.gender,
      dob: row.dob.toString(),
      address: row.address,
      id: row.id,
    });
    setActiveModal("edit");
  };

  const columns = useColumns({ handleEdit });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          sx={{ marginLeft: "auto" }}
          variant="contained"
          onClick={() => setActiveModal("add")}
        >
          Add
        </Button>
      </Box>

      <CustomTable
        rows={data?.data || []}
        columns={columns}
        rowCount={data?.meta.itemCount}
        setPage={setPage}
        isFetching={isLoading}
      />
      <UserFormModal
        open={activeModal === "add" || activeModal === "edit"}
        onClose={() => setActiveModal("none")}
        methods={methods}
        isEditMode={isEditMode}
      />
    </>
  );
};
