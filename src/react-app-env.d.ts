/// <reference types="react-scripts" />

export interface Dictionary<T> {
    [key: string]: T
}



export interface DailyReport {
    date: Date;
    dailyConfirmed: number;
    dailyRecovered: number;
    dailyDeaths: number;
    totalConfirmed: number;
    totalRecovered: number;
    totalDeaths: number;
    activeCases: number;
    closeCases: number;
}