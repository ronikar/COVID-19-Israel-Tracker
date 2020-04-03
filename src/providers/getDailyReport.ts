import covid19 from "../react-app-env";
import moment from "moment";
import { isNumber } from "util";

export async function getTodayReport(): Promise<covid19.mathdro.DailyReport> {
    const res = await fetch(`https://covid19.mathdro.id/api/countries/israel`);
    const reportData = await res.json();

    const confirmed = reportData.confirmed.value;
    const deaths = reportData.deaths.value;
    const recovered = reportData.recovered.value;
    const lastUpdate = new Date(reportData.lastUpdate);

    return { confirmed, deaths, recovered, active: confirmed - (deaths + recovered), lastUpdate };
}

export async function getDailyReport(date: Date): Promise<covid19.mathdro.DailyReport> {
    const res = await fetch(`https://covid19.mathdro.id/api/daily/${moment(date).format("M-D-YYYY")}`);
    const globalReport = await res.json();
    const data = globalReport.find((_: any) => _.countryRegion === "Israel");

    const confirmed = parseInt(data?.confirmed);
    const deaths = parseInt(data?.deaths);
    const recovered = parseInt(data?.recovered);
    const active = isNumber(data?.active) ? parseInt(data.active) : confirmed - (deaths + recovered);

    return { lastUpdate: date, confirmed, deaths, recovered, active };
}