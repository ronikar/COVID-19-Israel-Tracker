import "./ConfirmedCasesStatistics.css";

import React from "react";
import covid19 from "./react-app-env";

import { LineChartComponent } from "./utils/LineChartComponent";
import { BarChartComponent } from "./utils/BarChartComponent";

interface Props {
    reports: covid19.DailyReport[]
}

export function ConfirmedCasesStatistics({ reports }: Props) {
    const totalLineDataKeys = [{ id: "totalConfirmed", color: "#8884d8" }];
    const dailyBarDataKeys = [{ id: "dailyConfirmed", color: "#8884d8" }];
    const activeLineDataKeys = [{ id: "activeCases", color: "#8884d8" }];

    return <section className="confirmed-cases-panel">
        <h2>סטטיסטיקות מתקדמות על מספר הנדבקים</h2>
        <div className="charts">
            <LineChartComponent title="מספר נדבקים כולל" data={reports} lineDataKeys={totalLineDataKeys} />
            <BarChartComponent title="מספר נדבקים יומי" data={reports} barDataKeys={dailyBarDataKeys} />
            <LineChartComponent title="מספר חולים פעילים" data={reports} lineDataKeys={activeLineDataKeys} />
        </div>
    </section>
}