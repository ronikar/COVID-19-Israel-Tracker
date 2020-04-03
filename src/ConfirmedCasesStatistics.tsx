import "./ConfirmedCasesStatistics.css";

import React, { useMemo } from "react";
import covid19 from "./react-app-env";

import { LineChartComponent } from "./utils/LineChartComponent";
import { BarChartComponent } from "./utils/BarChartComponent";
import { TooltipFormatter } from "recharts";

interface Props {
    reports: covid19.DailyReport[]
}

const TOTAL_LINE_DATA_KEYS = [{ id: "totalConfirmed", color: "#8884d8" }];
const DAILY_BAR_DATA_KEYS = [{ id: "dailyConfirmed", color: "#8884d8" }];
const ACTIVE_LINE_DATA_KEYS = [{ id: "activeCases", color: "#8884d8" }];
const CRITICAL_LINE_DATA_KEYS = [{ id: "criticalCases", color: "#c1bc08" }];

export function ConfirmedCasesStatistics({ reports }: Props) {
    const criticalPercentageLineDataKeys = useMemo(() => [{ id: "percentage", color: "#c1bc08" }], []);

    const reportsWithCriticalCases = useMemo(() => reports.filter(_ => !!_.criticalCases), [reports]);
    const criticalCasesPercentage = useMemo(() => reportsWithCriticalCases.map(report =>
        ({ percentage: (report.criticalCases || 0) * 100 / report.activeCases })), [reportsWithCriticalCases]);

    const percentageFormmater: TooltipFormatter = (value, _, __) => `${(value as number).toFixed(2)}%`;

    return <section className="confirmed-cases-panel">
        <h2>סטטיסטיקות מתקדמות על מספר הנדבקים</h2>
        <div className="charts">
            <LineChartComponent title="מספר נדבקים כולל" data={reports} lineDataKeys={TOTAL_LINE_DATA_KEYS} />
            <BarChartComponent title="מספר נדבקים יומי" data={reports} barDataKeys={DAILY_BAR_DATA_KEYS} />
            <LineChartComponent title="מספר חולים פעילים" data={reports} lineDataKeys={ACTIVE_LINE_DATA_KEYS} />
            <LineChartComponent title="חולים במצב קשה" data={reportsWithCriticalCases} lineDataKeys={CRITICAL_LINE_DATA_KEYS} />
            <LineChartComponent title="אחוז החולים במצב קשה מבין כלל החולים" data={criticalCasesPercentage} lineDataKeys={criticalPercentageLineDataKeys} formatter={percentageFormmater} />
        </div>
    </section>
}