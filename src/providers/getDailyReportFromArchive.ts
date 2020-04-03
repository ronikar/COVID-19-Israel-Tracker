import covid19 from "../react-app-env";
import { getReportId } from "../utils/getReportId";

import ARCHIVE_REPORTS from "../data/reports.json";

const REPORTS_MAP = new Map<string, covid19.DailyReport>();

const REPORTS = ARCHIVE_REPORTS.map(report => ({...report, date: new Date(report.date)}));

REPORTS.forEach(report => REPORTS_MAP.set(report.id, report));

export function getDailyReportFromArchive(date: Date) {
    return REPORTS_MAP.get(getReportId(date))
}