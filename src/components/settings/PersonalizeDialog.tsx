import {
  Box,
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  SxProps,
  Theme,
} from "@mui/material";
import {
  Close as CloseIcon,
  ArrowBackIosNew as BackIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import OptionsList from "./OptionsList";
import AppearanceSettings from "./AppearanceSettings";

interface PersonalizeModalProps {
  open: boolean;
  onClose: () => void;
}

const PersonalizeDialog = ({ open, onClose }: PersonalizeModalProps) => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<"options" | "appearance">("options");

  const handleClose = () => {
    onClose();
    setTab("options");
  };

  return (
    <Dialog
      PaperProps={{
        sx: DialogSx,
      }}
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={DialogTitleSx}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {tab === "appearance" && (
            <IconButton onClick={() => setTab("options")}>
              <BackIcon />
            </IconButton>
          )}
          {t(tab === "options" ? "個性化設定" : "外觀")}
        </Box>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      {tab === "options" ? (
        <OptionsList goToAppearance={() => setTab("appearance")} />
      ) : (
        <AppearanceSettings />
      )}
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
