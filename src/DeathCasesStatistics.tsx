import "./DeathCasesStatistics.css";

import React, { useMemo } from "react";
import covid19 from "./react-app-env";

import { LineChartComponent } from "./utils/LineChartComponent";
import { BarChartComponent } from "./utils/BarChartComponent";

interface Props {
    reports: covid19.DailyReport[]
}

export function DeathCasesStatistics({ reports }: Props) {
    const totalLineDataKeys = useMemo(() => [{ id: "totalDeaths", color: "#ba2525" }], []);
    const dailyBarDataKeys = useMemo(() => [{ id: "dailyDeaths", color: "#ba2525" }], []);

    return <section className="death-cases-panel">
        <h2>סטטיסטיקות מתקדמות על מספר המתים</h2>
        <div className="charts">
            <LineChartComponent title="מספר נפטרים כולל" data={reports} lineDataKeys={totalLineDataKeys} />
            <BarChartComponent title="מספר נפטרים יומי" data={reports} barDataKeys={dailyBarDataKeys} />
        </div>
    </section>
}