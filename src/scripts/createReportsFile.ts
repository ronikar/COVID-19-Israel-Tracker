import reports from '../data/reports.json';

const JSON_RELATIVE_PATH  = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')? "data/reports.json": "reports.json";

export async function createReportFile(fiename?: string, from?: Date, to?:Date){
    return reports;
    // const res = await fetch(JSON_RELATIVE_PATH,{
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //       }
    // });
    // return res.text();
}