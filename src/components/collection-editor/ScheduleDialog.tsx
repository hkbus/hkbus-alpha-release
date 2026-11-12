import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import CollectionSchedule from "../layout/collections/CollectionSchedule";
import { DaySchedule } from "../../@types/types";

interface Props {
  open: boolean;
  name: string;
  schedules: DaySchedule[];
  onChange: (schedules: DaySchedule[]) => void;
  onClose: () => void;
}

const ScheduleDialog = ({
  open,
  name,
  schedules,
  onChange,
  onClose,
}: Props) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        {t("顯示時間")} · {name}
      </DialogTitle>
      <DialogContent>
        <CollectionSchedule schedules={schedules} onChange={onChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("完成")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleDialog;
