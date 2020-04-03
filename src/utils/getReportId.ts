import moment from "moment";

export function getReportId(date:Date){
    return moment(date).format("DD/MM/YYYY");
}