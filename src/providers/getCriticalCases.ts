import moment from "moment";

const criticalCasesDataStartDate = moment("13.03.2020", "DD.MM.YYYY");
const criticalCasesData = [3, 2, 2, 4, 5, 6, 6, 10, 15, 18, 29, 34, 39, 46, 49, 54, 74, 79, 94, 95, 108, 113, 126, 139, 140, 159, 147, 166, 167, 167];

export function getCriticalCases(date: Date): number | null {
    const index = moment(date).diff(criticalCasesDataStartDate, "days");
    return index < 0 ? null : criticalCasesData[index];
}