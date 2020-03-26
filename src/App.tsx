import './App.css';
import './Loader.css';

import React, { useState, useEffect, Fragment } from 'react';
import moment from "moment";

import { getIsraelCovid19Reports } from './getIsraelCovid19Data';
import { DailyReport } from './react-app-env';
import { CovidDailyStatus } from './CovidDailyStatus';
import { CasesStatistics } from './CasesStatistics';

function App() {
  const [covidData, setCovidData] = useState([] as DailyReport[]);
  const lastUpdate = covidData[covidData.length - 1];
  console.log(covidData);
  useEffect(() => { getIsraelCovid19Reports().then(data => setCovidData(data)) }, []);

  return <div className="covid-19-app">
    <header className="app-header">
      <h1>מפת קורונה ישראל</h1>
      {lastUpdate && <div className="last-update">נכון לתאריך {moment(lastUpdate.date).format("DD.MM.YYYY")}</div>}
    </header>
    {covidData.length === 0 ? <Loader /> :
      <Fragment>
        <CovidDailyStatus todayItem={covidData[covidData.length - 1]} />
        <CasesStatistics dailyReport={lastUpdate}/>
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
