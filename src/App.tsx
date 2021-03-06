import './App.css';
import './Loader.css';

import React, { useState, useEffect, Fragment } from 'react';
import moment from "moment";

import covid19 from './react-app-env';
import { getReports } from './providers/getIsraelReports';
import { CovidDailyStatus } from './DailyStatus';
import { CasesStatistics } from './CasesStatistics';
import { ConfirmedCasesStatistics } from './ConfirmedCasesStatistics';
import { DeathCasesStatistics } from './DeathCasesStatistics';
//import { DownloadComponent } from './utils/DownloadComponent';

function App() {
  const [reports, setReports] = useState([] as covid19.DailyReport[]);
  const dailyReport = reports[reports.length - 1];

  useEffect(() => { getReports().then(data => setReports(data)) }, []);

  return <div className="covid-19-app">
    <header className="app-header">
      <h1>מגפת הקורונה בישראל</h1>
      {dailyReport && <div className="last-update">עדכון אחרון:  {moment(dailyReport.date).format("DD.MM.YYYY")}</div>}
    </header>
    {reports.length === 0 ? <Loader /> :
      <Fragment>
        {/* <DownloadComponent filename="reports" data={reports}/> */}
        <CovidDailyStatus dailyReport={dailyReport} />
        <CasesStatistics dailyReport={dailyReport} />
        <ConfirmedCasesStatistics reports={reports} />
        <DeathCasesStatistics reports={reports} />
      </Fragment>}
    <footer>
      <p>נוצר ע"י רוני קרילקאר</p>
      <div>המידע מוזן כרגע באופן ידני ולכן עדכניות המידע תלויה בעיקר בי :)</div>
    </footer>
  </div>;
}

function Loader() {
  return <div className="loader-wrapper"><div className="loader"></div></div>
}

export default App;
