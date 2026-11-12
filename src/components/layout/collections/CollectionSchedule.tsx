import { useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Switch,
  FormControlLabel,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker as TimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Add as AddIcon,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import CollectionContext from "../../../CollectionContext";
import { DaySchedule } from "../../../@types/types";

type Time = DaySchedule["start"];

// Mon–Sun then public holiday (-1); 0 is Sunday in the stored data
const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0, -1];
const WEEKDAYS = [1, 2, 3, 4, 5];
const ALL_DAY: [Time, Time] = [
  { hour: 0, minute: 0 },
  { hour: 23, minute: 59 },
];
const DEFAULT_SLOT: [Time, Time] = [
  { hour: 7, minute: 0 },
  { hour: 9, minute: 0 },
];

// ponytail: slots are grouped by identical times; stored data stays one entry per day
interface Slot {
  start: Time;
  end: Time;
  days: number[];
}

const timeKey = (s: { start: Time; end: Time }) =>
  `${s.start.hour}:${s.start.minute}-${s.end.hour}:${s.end.minute}`;
const sameTime = (a: Time, b: Time) =>
  a.hour === b.hour && a.minute === b.minute;
const isAllDay = (s: Slot) =>
  sameTime(s.start, ALL_DAY[0]) && sameTime(s.end, ALL_DAY[1]);
const fmt = ({ hour, minute }: Time) =>
  `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
const toDayjs = ({ hour, minute }: Time) => dayjs().hour(hour).minute(minute);
const expand = (slot: Slot): DaySchedule[] =>
  slot.days.map((day) => ({ day, start: slot.start, end: slot.end }));

const CollectionSchedule = () => {
  const { t } = useTranslation();
  const { collections, collectionIdx, setCollectionSchedules } =
    useContext(CollectionContext);

  const schedules = useMemo(
    () =>
      collectionIdx !== null && collectionIdx >= 0
        ? collections[collectionIdx]?.schedules ?? []
        : [],
    [collections, collectionIdx]
  );

  const slots: Slot[] = useMemo(() => {
    const map = new Map<string, Slot>();
    schedules.forEach((s) => {
      const k = timeKey(s);
      if (!map.has(k)) map.set(k, { start: s.start, end: s.end, days: [] });
      map.get(k)!.days.push(s.day);
    });
    return [...map.values()];
  }, [schedules]);

  if (collectionIdx === null || collectionIdx < 0) {
    return null;
  }

  // replace one slot (or remove it when next is null), keeping the others in order
  const replaceSlot = (slot: Slot, next: Slot | null) => {
    const k = timeKey(slot);
    const out: DaySchedule[] = [];
    let placed = false;
    schedules.forEach((s) => {
      if (timeKey(s) !== k) out.push(s);
      else if (!placed && next) {
        out.push(...expand(next));
        placed = true;
      }
    });
    setCollectionSchedules(out);
  };

  const toggleDay = (slot: Slot, day: number) => {
    const has = slot.days.includes(day);
    if (has && slot.days.length === 1) return; // delete the slot instead
    replaceSlot(slot, {
      ...slot,
      days: has ? slot.days.filter((d) => d !== day) : [...slot.days, day],
    });
  };

  const label = (d: number) =>
    d === -1 ? t("public-holiday") : t(`weekday-${d}`);

  const summary = (slot: Slot) => {
    const picked = DAY_ORDER.filter((d) => slot.days.includes(d));
    const parts: string[] = [];
    for (let i = 0; i < picked.length; ) {
      let j = i;
      while (
        j + 1 < picked.length &&
        picked[j + 1] !== -1 &&
        DAY_ORDER.indexOf(picked[j + 1]) === DAY_ORDER.indexOf(picked[j]) + 1
      )
        j++;
      if (j - i >= 2) parts.push(`${label(picked[i])}–${label(picked[j])}`);
      else picked.slice(i, j + 1).forEach((d) => parts.push(label(d)));
      i = j + 1;
    }
    return `${parts.join(", ")} · ${
      isAllDay(slot) ? t("全日") : `${fmt(slot.start)}–${fmt(slot.end)}`
    }`;
  };

  const addSlot = () => {
    // pick default times not already used, so the new card doesn't merge into another
    const taken = new Set(schedules.map(timeKey));
    const [start] = DEFAULT_SLOT;
    let end = DEFAULT_SLOT[1];
    while (taken.has(timeKey({ start, end }))) {
      end = { hour: end.hour, minute: (end.minute + 1) % 60 };
    }
    setCollectionSchedules([
      ...schedules,
      ...expand({ start, end, days: WEEKDAYS }),
    ]);
  };

  const onPick = (slot: Slot, which: "start" | "end") => (v: Dayjs | null) => {
    if (!v?.isValid()) return;
    const time = { hour: v.hour(), minute: v.minute() };
    replaceSlot(slot, { ...slot, [which]: time });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={rootSx}>
        {slots.length === 0 && (
          <Typography sx={{ mt: 3 }} fontWeight={700} textAlign="center">
            {t("missing_schedule")}
          </Typography>
        )}
        {slots.map((slot) => (
          <Paper key={timeKey(slot)} variant="outlined" sx={cardSx}>
            <Box sx={headerSx}>
              <Typography variant="subtitle2" sx={{ flex: 1 }}>
                {summary(slot)}
              </Typography>
              <IconButton
                size="small"
                aria-label={t("刪除")}
                onClick={() => replaceSlot(slot, null)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            <Box sx={chipsSx}>
              {DAY_ORDER.map((d) => (
                <Chip
                  key={d}
                  size="small"
                  label={label(d)}
                  color={slot.days.includes(d) ? "primary" : "default"}
                  variant={slot.days.includes(d) ? "filled" : "outlined"}
                  onClick={() => toggleDay(slot, d)}
                />
              ))}
            </Box>
            <Box sx={timeRowSx}>
              <TimePicker
                disabled={isAllDay(slot)}
                sx={{ flex: 1 }}
                slotProps={{
                  textField: { size: "small", variant: "standard" },
                }}
                value={toDayjs(slot.start)}
                onChange={onPick(slot, "start")}
              />
              –
              <TimePicker
                disabled={isAllDay(slot)}
                sx={{ flex: 1 }}
                slotProps={{
                  textField: { size: "small", variant: "standard" },
                }}
                value={toDayjs(slot.end)}
                onChange={onPick(slot, "end")}
              />
              <FormControlLabel
                sx={{ mr: 0, ml: 1 }}
                label={t("全日")}
                control={
                  <Switch
                    size="small"
                    checked={isAllDay(slot)}
                    onChange={(_, on) => {
                      const [start, end] = on ? ALL_DAY : DEFAULT_SLOT;
                      replaceSlot(slot, { ...slot, start, end });
                    }}
                  />
                }
              />
            </Box>
          </Paper>
        ))}
        <Button startIcon={<AddIcon />} onClick={addSlot}>
          {t("add-time-slot")}
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default CollectionSchedule;

const rootSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  gap: 1.5,
};

const cardSx: SxProps<Theme> = {
  p: 1.5,
  display: "flex",
  flexDirection: "column",
  gap: 1,
};

const headerSx: SxProps<Theme> = { display: "flex", alignItems: "center" };

const chipsSx: SxProps<Theme> = { display: "flex", flexWrap: "wrap", gap: 0.5 };

const timeRowSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 0.5,
};
