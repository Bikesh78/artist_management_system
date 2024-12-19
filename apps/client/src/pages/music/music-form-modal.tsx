import { Box, Button, CircularProgress } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import { CustomInput, CustomModal, CustomSelect } from "src/components/ui";
import {
  CreateMusicInput,
  defaultCreateMusicFields,
  useCreateMusic,
} from "./api/create-music";
import { UpdateMusicInput, useUpdateMusic } from "./api/update-music";
import { useParams } from "react-router";

interface Props {
  open: boolean;
  onClose: () => void;
  methods: UseFormReturn<CreateMusicInput | UpdateMusicInput>;
  isEditMode: boolean;
}

export const MusicFormModal: React.FC<Props> = ({
  open,
  onClose,
  methods,
  isEditMode,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = methods;
  const { artistId } = useParams();
  const { mutate: createMusic, isPending } = useCreateMusic();
  const { mutate: updateMusic, isPending: updatePending } = useUpdateMusic();

  const handleClose = () => {
    reset(defaultCreateMusicFields);
    onClose();
  };

  const submitHandler = (data: CreateMusicInput | UpdateMusicInput) => {
    if (artistId) {
      data.artist_id = Number(artistId);
    }
    if (isEditMode) {
      updateMusic(data as UpdateMusicInput, {
        onSuccess: () => {
          handleClose();
        },
      });
      return;
    }
    createMusic(data as CreateMusicInput, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  return (
    <CustomModal
      modalTitle={isEditMode ? "Edit Music" : "Add Music"}
      open={open}
      handleClose={handleClose}
      width="500px"
      footer={
        <>
          <Button type="submit" variant="contained" form="music-form">
            {isPending || updatePending ? (
              <CircularProgress color="inherit" size={24} />
            ) : isEditMode ? (
              "Update"
            ) : (
              "Add"
            )}
          </Button>
          <Button
            type="button"
            color="error"
            variant="contained"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </>
      }
    >
      <Box
        component={"form"}
        sx={{ ".form-container + .form-container": { mt: "10px" } }}
        onSubmit={handleSubmit(submitHandler)}
        id="music-form"
      >
        <Box className="form-container">
          <CustomInput
            name="title"
            title="Title"
            placeholder="Title"
            control={control}
            error={errors.title}
            required
          />
        </Box>

        <Box className="form-container">
          <CustomInput
            name="album_name"
            title="Album Name"
            placeholder="Album Name"
            control={control}
            error={errors.album_name}
            required
          />
        </Box>

        <Box className="form-container">
          <CustomSelect
            name="genre"
            title="Genre"
            data={[
              { value: "rnb", label: "R&B" },
              { value: "country", label: "Country" },
              { value: "rock", label: "Rock" },
              { value: "classic", label: "Classic" },
              { value: "jazz", label: "Jazz" },
            ]}
            control={control}
            error={errors.genre}
            hideLegend
            required
          />
        </Box>
      </Box>
    </CustomModal>
  );
};
