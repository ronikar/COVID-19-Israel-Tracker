import moment from "moment";
import covid19 from "../react-app-env";
import { getCriticalCases } from "./getCriticalCases";
import { isNumber } from "util";
import { getReportId } from "../utils/getReportId";
import { getDailyReportFromArchive } from "./getDailyReportFromArchive";
import { getTodayReport, getDailyReport } from "./getDailyReport";
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
const START_DATE = moment("20.02.2020", DATE_FORMAT).toDate();

export async function getReports(): Promise<covid19.DailyReport[]> {
    const reports: covid19.DailyReport[] = [];

    const currentDate = START_DATE;
    while (!_isToday(currentDate)) {
        const report = getDailyReportFromArchive(currentDate);

        if (report) reports.push(report)
        else {
            const basicReport = await getDailyReport(currentDate);
            reports.push(_createDailyReport(basicReport, reports[reports.length - 1]));
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }

    const todayBasicReport = await getTodayReport();

    reports.push(_createDailyReport(todayBasicReport, reports[reports.length - 1]));

    return reports;
}

function _createDailyReport(basicReport: covid19.mathdro.DailyReport, previousReport: covid19.DailyReport) {
    const { confirmed: totalConfirmed,
        deaths: totalDeaths
        , recovered: totalRecovered
        , active: activeCases,
        lastUpdate: date } = basicReport;

    const id = getReportId(date);

    const dailyConfirmed = totalConfirmed - previousReport.totalConfirmed;
    const dailyRecovered = totalRecovered - previousReport.totalRecovered;
    const dailyDeaths = totalDeaths - previousReport.totalDeaths;

    const closeCases = totalConfirmed - activeCases;

    let report: covid19.DailyReport = { id, date, totalConfirmed, totalDeaths, totalRecovered, activeCases, closeCases, dailyConfirmed, dailyDeaths, dailyRecovered };

    const criticalCases = getCriticalCases(date);

    if (isNumber(criticalCases)) {
        report = {
            ...report,
            criticalCases,
            mildConditionCases: activeCases - criticalCases
        }
    }
    console.log(basicReport);
    console.log(report);
    return report;
}

function _isToday(date: Date) {
    return _getDiffInDays(new Date(), date) === 0;
}

function _getDiffInDays(first: Date, second: Date) {
    return moment(first).diff(moment(second), "days");
}