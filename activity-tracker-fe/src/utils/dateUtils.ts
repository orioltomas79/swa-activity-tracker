import {
  compareAsc as _compareAsc,
  compareDesc as _compareDesc,
  parseISO,
} from "date-fns";
export const DATE_FORMAT_DD_MMM_YYYY = "dd MMM yyyy";
export const DATE_FORMAT_YYYY_TO_SS = `yyyy-MM-dd HH.mm.ss`;

export const sortAsc = (dateLeft: string | null, dateRight: string | null) => {
  return _compareAsc(
    !!dateLeft ? parseISO(dateLeft) : 0,
    !!dateRight ? parseISO(dateRight) : 0
  );
};

export const sortDesc = (dateLeft: string | null, dateRight: string | null) => {
  return _compareDesc(
    !!dateLeft ? parseISO(dateLeft) : 0,
    !!dateRight ? parseISO(dateRight) : 0
  );
};
