import moment from "moment";

const criticalCasesDataStartDate = moment("13.03.2020", "DD.MM.YYYY");
const criticalCasesData = [3, 2, 2, 4, 5, 6, 6, 10, 15, 18, 29, 34, 39, 46, 49, 54, 66];

export function getCriticalCases(date: Date): number {
    const index = criticalCasesDataStartDate.diff(date, "days");
    return criticalCasesData[index] || 0;
}