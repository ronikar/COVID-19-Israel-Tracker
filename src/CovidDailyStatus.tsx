import React, { useState, useEffect } from 'react';
import { DailyReport } from "./react-app-env";

interface Props {
  todayItem: DailyReport
}

export function CovidDailyStatus({ todayItem }: Props) {
  const { totalConfirmed, totalDeaths, totalRecovered, dailyConfirmed, dailyDeaths, dailyRecovered } = todayItem;

  return <section className="daily-status" >
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
    <div className="daily-number" > {daily} ביממה האחרונה </div>
  </div>;
}
