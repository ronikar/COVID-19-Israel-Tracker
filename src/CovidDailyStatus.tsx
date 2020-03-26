import "./CovidDailyStatus.css";

import React from 'react';
import covid19 from "./react-app-env";

interface Props {
  dailyReport: covid19.DailyReport
}

export function CovidDailyStatus({ dailyReport }: Props) {
  const { totalConfirmed, totalDeaths, totalRecovered, dailyConfirmed, dailyDeaths, dailyRecovered } = dailyReport;

  return < section className="daily-status" >
    <DailyStatusCube title={"מספר חולים מאומתים"} className="confirmed" total={totalConfirmed} daily={dailyConfirmed} />
    <DailyStatusCube title={"מספר המתים"} className="deaths" total={totalDeaths} daily={dailyDeaths} />
    <DailyStatusCube title={"מספר חולים שהבריאו"} className="recovered" total={totalRecovered} daily={dailyRecovered} />
  </section>;
}

interface DailyStatusCubeProps {
  title: string;
  className: string;
  total: number;
  daily: number;
}

function DailyStatusCube({ title, className, total, daily }: DailyStatusCubeProps) {
  const componentClassName = `cube ${className}`;

  return <div className={componentClassName}>
    <h3>{title} </h3>
    <div className="total-number"> {total} </div>
    <div className="daily-number"> {daily} ביממה האחרונה </div>
  </div>;
}