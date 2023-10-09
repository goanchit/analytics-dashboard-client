import React from 'react';
import { Grid } from '@mui/material';
import CustomCard from './components/Card';
import Chart from './components/Chart';
import StickyHeadTable from './components/Table';
import MenuIntroduction from './components/Dropdown';
import {useQuery} from 'react-query';
import { getCurrentInsites } from './queries/api';
import { subDays } from 'date-fns';
import { DropDownHolder } from './styles';

function App() {
  const [startDate, setStartDate] = React.useState(new Date())
  const [endDate, setEndDate] = React.useState(subDays(new Date(), 1))
  const [dateChanged, setDateChanged] = React.useState(false);

  const { data, isLoading: dataInsitesLoader } = useQuery(["dataInsites", startDate, endDate], () => getCurrentInsites(startDate, endDate))

  return (
    <>
        <Grid container height={'100vh'} p={2} spacing={2} direction={"column"}>
          <Grid item container xs={1} spacing={2}>
            <Grid item xs={6} md={3}>
              <CustomCard title={`Total No of Unique Visitors: ${dataInsitesLoader ? "-": data?.unique_users}`}></CustomCard>
            </Grid>
            <Grid item xs={6} md={3}>
              <CustomCard title={`Total No of Calls: ${dataInsitesLoader ? "-": data?.total_visitors}`}></CustomCard>
            </Grid>
            <Grid item xs={6} md={3}>
              <CustomCard title={`Total No of Failures: ${dataInsitesLoader ? "-": data?.failure_count}`}></CustomCard>
            </Grid>
            <Grid item xs={6} md={3}>
              <DropDownHolder><MenuIntroduction startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} setDateChanged={setDateChanged} /></DropDownHolder>
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item xs={12}>
              <Chart chartdata={dataInsitesLoader ? {} : data} chartDataLoader={dataInsitesLoader} />
            </Grid>
            <Grid item xs={12}>
              <StickyHeadTable startDate={startDate} endDate={endDate} dateChanged={dateChanged} setDateChanged={setDateChanged}/>
            </Grid>
          </Grid>
        </Grid>
    </>
  );
}

export default App;
