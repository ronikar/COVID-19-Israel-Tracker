
import moment from "moment";
import { isNumber } from "util";

interface DailyReportItem {
    confirmed: number;
    deaths: number;
    recovered: number;
    active: number;
    lastUpdate?: Date;
}

export async function getDailyReport(date: Date): Promise<DailyReportItem> {
    const diff = moment().diff(date, 'days');

    const res = await fetch(`https://covid19.mathdro.id/api/countries/israel`);
    const reportData = await res.json();

    const confirmed = reportData.confirmed.value;
    const deaths = reportData.deaths.value;
    const recovered = reportData.recovered.value;
    const lastUpdate = new Date(reportData.lastUpdate);

    return { confirmed, deaths, recovered, active: confirmed - (deaths + recovered), lastUpdate };
}

export async function getHistoricalDailyReport(date: Date):Promise<DailyReportItem> {
    const diff = moment().diff(date, 'days');

    const res = await fetch(`https://covid19.mathdro.id/api/daily/${moment(date).format("M-D-YYYY")}`);
    const globalReport = await res.json();
    const data = globalReport.find((_: any) => _.countryRegion === "Israel");

    const confirmed = parseInt(data?.confirmed);
    const deaths = parseInt(data?.deaths);
    const recovered = parseInt(data?.recovered);

    return { confirmed, deaths, recovered, active: isNumber(data?.active) ? data?.active : confirmed - (deaths + recovered) };
}


function getDailyReportFromLocalStorage(date: Date) {
    const value = localStorage.getItem(date.toISOString());
    return value && JSON.parse(value);
}

function saveDailyReportLocally(date: Date, report: DailyReportItem) {
    localStorage.setItem(date.toISOString(), JSON.stringify(report));
}

