import { Box, SxProps, Theme, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import AppearanceSettings from "../components/settings/AppearanceSettings";

const AppearancePage = () => {
  const { t } = useTranslation();
  return (
    <Box sx={rootSx}>
      <Typography variant="h6" sx={{ textAlign: "center", my: 1 }}>
        {t("外觀")}
      </Typography>
      <AppearanceSettings />
    </Box>
  );
};

export default AppearancePage;

const rootSx: SxProps<Theme> = { flex: 1, overflowY: "auto" };
