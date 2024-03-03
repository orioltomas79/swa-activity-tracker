import { format } from "date-fns";

interface DayLabelProps {
  date: string;
}

function getMonthName(inputDate: string): string {
  const parsedDate = new Date(inputDate);
  return format(parsedDate, "MMM");
}

function getDayNumber(inputDate: string): number {
  const parsedDate = new Date(inputDate);
  return parsedDate.getDate();
}

const DayLabel = (props: DayLabelProps) => {
  return (
    <table>
      <tr>
        <td>{getMonthName(props.date)}</td>
      </tr>
      <tr>
        <td>{getDayNumber(props.date)}</td>
      </tr>
    </table>
  );
};
export default DayLabel;
