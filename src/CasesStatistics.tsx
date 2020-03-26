import "./CasesStatistics.css";

import React from "react";
import covid19 from "./react-app-env";

interface Props {
    dailyReport: covid19.DailyReport
}

export function CasesStatistics({ dailyReport }: Props) {
    const { totalDeaths, totalRecovered } = dailyReport;
    return <section className="active-close-statistics">
        <h2>מקרים פתוחים וסגורים בארץ</h2>
        <div className="cases-panel">
            <ActiveCasesCube {...dailyReport} />
            <CloseCasesCube title="מספר החולים שנפטרו" value={totalDeaths} {...dailyReport} />
            <CloseCasesCube title="מספר החולים שהחלימו" value={totalRecovered} {...dailyReport} />
        </div>
    </section>
}

interface ActiveCasesCubeProps {
    activeCases: number;
    totalConfirmed: number;
}

function ActiveCasesCube({ activeCases, totalConfirmed }: ActiveCasesCubeProps) {

    const ratio = activeCases / totalConfirmed * 100;
    return <div className="active-cases-cube">
        <h3>מספר חולים פעילים</h3>
        <div className="value">{activeCases}</div>
        <div className="ratio"><span>{ratio.toFixed(1)}</span>מבין כלל המקרים </div>
    </div>
}

interface CloseCasesCubeProps {
    title: string;
    value: number;
    closeCases: number;
    totalConfirmed: number;
}

function CloseCasesCube({ title, value, closeCases, totalConfirmed }: CloseCasesCubeProps) {
    const closeRatio = value / closeCases * 100;
    const totalRatio = value / totalConfirmed * 100;

    return <div className="close-cases-cube">
        <h3>{title}</h3>
        <div className="value">{value}</div>
        <div className="ratio"><span>{closeRatio.toFixed(1)}</span> מבין המקרים הסגורים</div>
        <div className="ratio"><span>{totalRatio.toFixed(1)}</span> מבין כלל הנדבקים</div>
    </div>
}
