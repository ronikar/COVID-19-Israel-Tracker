import moment from "moment";

const criticalCasesDataStartDate = moment("28.04.2020", "DD.MM.YYYY");
const criticalCasesData = [117];

export function getCriticalCases(date: Date): number | null {
    const index = moment(date).diff(criticalCasesDataStartDate, "days");
    return index < 0 ? null : criticalCasesData[index];
}