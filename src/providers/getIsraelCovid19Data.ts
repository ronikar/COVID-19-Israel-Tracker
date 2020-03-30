import moment from "moment";
import covid19 from "../react-app-env";
//import { isNumber } from "util";

// const DATE_FORMAT = "YYYY-M-D"
// const ISRAEL_KEY = "Israel";

export interface DailyReportData {
    date: string;
    confirmed: number;
    deaths: number;
    recovered: number
}
const DATE_FORMAT = "DD.MM.YYYY";
const startDate = moment("20.02.2020", DATE_FORMAT).toDate();

const confirmedCasesReports = [0, 1, 1, 2, 2, 2, 2, 3, 7, 7, 10, 12, 12, 15, 17, 21, 25, 39, 50, 75, 97, 109, 143, 193, 213, 298, 337, 433, 677, 705, 883, 1071, 1442, 1930, 2369, 2693, 3035, 3619, 4247, 4347]
const activeCasesReports = [0, 1, 1, 2, 2, 2, 2, 3, 6, 6, 9, 11, 11, 14, 15, 19, 22, 36, 46, 71, 93, 105, 139, 189, 209, 294, 326, 422, 663, 689, 846, 1033, 1400, 1874, 2306, 2617, 2944, 3518, 4100, 4197];
const totalDeathsReports = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 3, 5, 8, 12, 12, 15, 16];

const criticalCasesDataStartDate = moment("13.03.2020", DATE_FORMAT).toDate();
const criticalCasesData = [3, 2, 2, 4, 5, 6, 6, 10, 15, 18, 29, 34, 39, 46, 49, 54, 74, 80];

//TODO: look for reliable dataset service
export async function getIsraelCovid19Reports() {
    const reports: covid19.DailyReport[] = [];

    for (let index = 0; index < confirmedCasesReports.length; index++) {
        const date = getDate(startDate, index);
        const id = moment(date).format("DD/MM");

        const totalConfirmed = confirmedCasesReports[index];
        const totalDeaths = totalDeathsReports[index];
        const activeCases = activeCasesReports[index];

        const closeCases = totalConfirmed - activeCases;
        const totalRecovered = closeCases - totalDeaths;

        const isFirstItem = index === 0;
        const dailyConfirmed = isFirstItem ? totalConfirmed : totalConfirmed - reports[index - 1].totalConfirmed;
        const dailyRecovered = isFirstItem ? totalRecovered : totalRecovered - reports[index - 1].totalRecovered;
        const dailyDeaths = isFirstItem ? totalDeaths : totalDeaths - reports[index - 1].totalDeaths;

        let report: covid19.DailyReport = { id, date, totalConfirmed, totalDeaths, totalRecovered, activeCases, closeCases, dailyConfirmed, dailyDeaths, dailyRecovered };

        const cirticalIndex = getDiffInDays(date, criticalCasesDataStartDate);

        if (cirticalIndex >= 0) {
            const criticalCases = criticalCasesData[cirticalIndex];
            report = {
                ...report,
                criticalCases,
                mildConditionCases: activeCases - criticalCases
            }
        }

        reports.push(report);
    }

    return Promise.resolve(reports);
}

function getDate(date: Date, additionalDays: number) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + additionalDays);
    return newDate;
}

function getDiffInDays(first: Date, second: Date) {
    return moment(first).diff(moment(second), "days");
}

// export async function getIsraelCovid19Data(): Promise<DailyReport[]> {
//     try {
//         const res = await fetch("https://pomber.github.io/covid19/timeseries.json");
//         const data = await res.json() as Dictionary<DailyReportData[]>;
//         return data[ISRAEL_KEY].map(_convertToDailyData);
//     } catch (e) {
//         console.log(e);
//         return [];
//     }
// }

// function _convertToDailyData(data: DailyReportData, index: number, array: DailyReportData[]) {
//     const { recovered, deaths: totalDeaths, confirmed: totalConfirmed, date } = data;
//     const totalRecovered = isNumber(recovered) ? recovered : array[index - 1]?.recovered; // recoverd can be null when the number of recovered doen't exist
//     const closeCases = totalRecovered + totalDeaths;
//     const activeCases = totalConfirmed - closeCases;

//     const isFirstItem = index === 0;
//     const dailyConfirmed = isFirstItem ? totalConfirmed : totalConfirmed - array[index - 1].confirmed;
//     const dailyRecovered = isFirstItem ? totalRecovered : totalRecovered - array[index - 1].recovered;
//     const dailyDeaths = isFirstItem ? totalDeaths : totalDeaths - array[index - 1].deaths;

//     return {
//         date: moment(date, DATE_FORMAT).toDate(),
//         totalConfirmed,
//         totalRecovered,
//         totalDeaths,
//         dailyConfirmed,
//         dailyRecovered,
//         dailyDeaths,
//         closeCases,
//         activeCases
//     };
// }