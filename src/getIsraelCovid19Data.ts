import moment from "moment";
import { isNumber } from "util";
import { Dictionary, DailyReport } from "./react-app-env";

const DATE_FORMAT = "YYYY-M-D"
const ISRAEL_KEY = "Israel";

export interface DailyReportData {
    date: string;
    confirmed: number;
    deaths: number;
    recovered: number
}

export async function getIsraelCovid19Data(): Promise<DailyReport[]> {
    const res = await fetch("https://pomber.github.io/covid19/timeseries.json");
    const data = await res.json() as Dictionary<DailyReportData[]>;

    return data[ISRAEL_KEY].map(_convertToDailyData);
}

function _convertToDailyData(data: DailyReportData, index: number, array: DailyReportData[]) {
    const { recovered, deaths: totalDeaths, confirmed: totalConfirmed, date } = data;
    const totalRecovered = isNumber(recovered) ? recovered : array[index - 1]?.recovered; // recoverd can be null when the number of recovered doen't exist
    const closeCases = totalRecovered + totalDeaths;
    const activeCases = totalConfirmed - closeCases;

    const isFirstItem = index === 0;
    const dailyConfirmed = isFirstItem ? totalConfirmed : totalConfirmed - array[index - 1].confirmed;
    const dailyRecovered = isFirstItem ? totalRecovered : totalRecovered - array[index - 1].recovered;
    const dailyDeaths = isFirstItem ? totalDeaths : totalDeaths - array[index - 1].deaths;

    return {
        date: moment(date, DATE_FORMAT).toDate(),
        totalConfirmed,
        totalRecovered,
        totalDeaths,
        dailyConfirmed,
        dailyRecovered,
        dailyDeaths,
        closeCases,
        activeCases
    };
}