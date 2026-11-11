import {
  Box,
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  SxProps,
  Theme,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import OptionsList from "./OptionsList";
import useLanguage from "../../hooks/useTranslation";

interface PersonalizeModalProps {
  open: boolean;
  onClose: () => void;
}

const PersonalizeDialog = ({ open, onClose }: PersonalizeModalProps) => {
  const { t } = useTranslation();
  const language = useLanguage();
  const navigate = useNavigate();

  return (
    <Dialog
      PaperProps={{
        sx: DialogSx,
      }}
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={DialogTitleSx}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {t("個性化設定")}
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <OptionsList
        goToAppearance={() => {
          onClose();
          navigate(`/${language}/appearance`);
        }}
      />
    </Dialog>
  );
};

export default PersonalizeDialog;

const DialogSx: SxProps<Theme> = {
  height: "100%",
};

const DialogTitleSx: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
};
