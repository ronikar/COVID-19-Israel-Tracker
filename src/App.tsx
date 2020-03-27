import './App.css';
import './Loader.css';

import React, { useState, useEffect, Fragment } from 'react';
import moment from "moment";

import { getIsraelCovid19Reports } from './providers/getIsraelCovid19Data';
import { CovidDailyStatus } from './DailyStatus';
import { CasesStatistics } from './CasesStatistics';
import covid19 from './react-app-env';
import { ConfirmedCasesStatistics } from './ConfirmedCasesStatistics';
import { DeathCasesStatistics } from './DeathCasesStatistics';

function App() {
  const [reports, setReports] = useState([] as covid19.DailyReport[]);
  const dailyReport = reports[reports.length - 1];
  
  useEffect(() => { getIsraelCovid19Reports().then(data => setReports(data)) }, []);

  return <div className="covid-19-app">
    <header className="app-header">
      <h1>מגפת הקורונה בישראל</h1>
      {dailyReport && <div className="last-update">נכון לתאריך {moment(dailyReport.date).format("DD.MM.YYYY")}</div>}
    </header>
    {reports.length === 0 ? <Loader /> :
      <Fragment>
        <CovidDailyStatus dailyReport={dailyReport} />
        <CasesStatistics dailyReport={dailyReport}/>
        <ConfirmedCasesStatistics reports={reports}/>
        <DeathCasesStatistics reports={reports}/>
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
