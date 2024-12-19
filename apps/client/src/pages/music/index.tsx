import { useState } from "react";
import { CustomTable } from "src/components/ui";
import { useFetchMusics } from "./api/fetch-music";
import { useColumns } from "./columns";
import { Box, Button } from "@mui/material";
import { ActiveModal, IMusic } from "@libs/types";
import { MusicFormModal } from "./music-form-modal";
import { useForm } from "react-hook-form";
import {
  CreateMusicInput,
  createMusicSchema,
  defaultCreateMusicFields,
} from "./api/create-music";
import { zodResolver } from "@hookform/resolvers/zod";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { UpdateMusicInput, updateMusicSchema } from "./api/update-music";
import { ConfirmationModal } from "src/components/ui/confirmation-modal";
import { useDeleteMusic } from "./api/delete-music";

export const MusicPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useFetchMusics(page);
  const [activeModal, setActiveModal] = useState<ActiveModal>("none");
  const [modalData, setModalData] = useState<IMusic | null>(null);
  const isEditMode = activeModal === "edit";
  const methods = useForm<CreateMusicInput | UpdateMusicInput>({
    mode: "onBlur",
    defaultValues: defaultCreateMusicFields,
    resolver: zodResolver(isEditMode ? updateMusicSchema : createMusicSchema),
  });
  const { mutate: deleteMusic, isPending: isDeleting } = useDeleteMusic();

  const handleEdit = ({ row }: GridRenderCellParams<IMusic, any>) => {
    setModalData(row);
    methods.reset({
      title: row.title,
      album_name: row.album_name,
      genre: row.genre,
      artist_id: row.artist_id,
      id: row.id,
    });
    setActiveModal("edit");
  };

  const handleDelete = ({ row }: GridRenderCellParams<IMusic, any>) => {
    setModalData(row);
    setActiveModal("delete");
  };
  const onClose = () => {
    setModalData(null);
    setActiveModal("none");
  };

  const columns = useColumns({ handleEdit, handleDelete });

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
      <MusicFormModal
        open={activeModal === "add" || activeModal === "edit"}
        onClose={onClose}
        methods={methods}
        isEditMode={isEditMode}
      />

      <ConfirmationModal
        open={activeModal === "delete"}
        onClose={onClose}
        title="Do you really want to delete this data?"
        isLoading={isDeleting}
        handleAction={() => deleteMusic(modalData!.id)}
      />
    </>
  );
};
