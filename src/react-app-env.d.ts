/// <reference types="react-scripts" />

declare namespace covid19{
    interface Dictionary<T> {
        [key: string]: T
    }
    interface DailyReport {
        id: string;
        date: Date;
        dailyConfirmed: number;
        dailyRecovered: number;
        dailyDeaths: number;
        totalConfirmed: number;
        totalRecovered: number;
        totalDeaths: number;
        activeCases: number;
        closeCases: number;
        criticalCases?: number;
        mildConditionCases?: number;
    }
}

export default covid19;