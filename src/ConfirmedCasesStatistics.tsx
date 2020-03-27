import "./ConfirmedCasesStatistics.css";

import React, { useMemo } from "react";
import covid19 from "./react-app-env";

import { LineChartComponent } from "./utils/LineChartComponent";
import { BarChartComponent } from "./utils/BarChartComponent";

interface Props {
    reports: covid19.DailyReport[]
}

export function ConfirmedCasesStatistics({ reports }: Props) {
    const totalLineDataKeys = useMemo(() => [{ id: "totalConfirmed", color: "#8884d8" }], []);
    const dailyBarDataKeys = useMemo(() => [{ id: "dailyConfirmed", color: "#8884d8" }], []);
    const activeLineDataKeys = useMemo(() => [{ id: "activeCases", color: "#8884d8" }], []);
    const criticalLineDataKeys = useMemo(() => [{ id: "criticalCases", color: "#c1bc08" }, { id: "mildConditionCases", color: "#8884d8" }], []);

    const reportsWithCriticalCases = useMemo(() => reports.filter(_ => !!_.criticalCases), [reports]);

    return <section className="confirmed-cases-panel">
        <h2>סטטיסטיקות מתקדמות על מספר הנדבקים</h2>
        <div className="charts">
            <LineChartComponent title="מספר נדבקים כולל" data={reports} lineDataKeys={totalLineDataKeys} />
            <BarChartComponent title="מספר נדבקים יומי" data={reports} barDataKeys={dailyBarDataKeys} />
            <LineChartComponent title="מספר חולים פעילים" data={reports} lineDataKeys={activeLineDataKeys} />
            <LineChartComponent title="חולים לפי מצב רפואי" data={reportsWithCriticalCases} lineDataKeys={criticalLineDataKeys} />
        </div>
    </section>
}