import * as React from 'react';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { Dialog } from '@mui/material';
import DatePicker from "react-datepicker";
import { subDays } from 'date-fns';
import { useQueryClient } from 'react-query'

import "react-datepicker/dist/react-datepicker.css";
import { DialogBoxPadding, PaddingButton, StyledListbox, StyledMenuItem, TriggerButton } from '../../styles';

export default function MenuIntroduction({ startDate, endDate, setStartDate, setEndDate, setDateChanged }) {
  const [selectedDateRange, setSelectedDateRange] = React.useState("last_24_hours")
  const [openDateRangeSelector, setOpenDateRangeSelector] = React.useState(false);
  const [interimStartDate, setInterimStartDate] = React.useState(new Date())
  const [interimEndDate, setInterimEndDate] = React.useState(null)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const queryClient = useQueryClient();

  const getButtonTitleBySelectedRange = (menuItem) => {
    if (menuItem === "last_24_hours") {
      return 'Last 24 Hours'
    } else if (menuItem === "last_7_days") {
      return "Last 7 Days"
    } else {
      return "Custom"
    }
  }

  const createHandleMenuClick = (menuItem) => {
    setSelectedDateRange(menuItem);
    setAnchorEl(null);
  };

  const handleDateChange = () => {
    setStartDate(interimEndDate)
    setEndDate(interimStartDate)
    setOpenDateRangeSelector(false);
    setSelectedDateRange("custom");
  }

  const dateChangeHandler = (dates) => {
    const [start, end] = dates;
    setInterimEndDate(end)
    setInterimStartDate(start)
  }

  React.useEffect(() => {
    if (selectedDateRange === "last_24_hours") {
      setStartDate(new Date())
      setEndDate(subDays(new Date(), 1))
    } else if (selectedDateRange === "last_7_days") {
      setStartDate(new Date())
      setEndDate(subDays(new Date(), 7))
    } else {
      setOpenDateRangeSelector(true);
    }

    queryClient.invalidateQueries(['dataInsites'])

  }, [selectedDateRange, queryClient, setSelectedDateRange, setEndDate, setStartDate])

  return (
    <Dropdown open={isMenuOpen}>
      <TriggerButton onClick={(event) => {setAnchorEl(event.target)}}>{getButtonTitleBySelectedRange(selectedDateRange) + "   ↓"}</TriggerButton>
      <Menu slots={{ listbox: StyledListbox }} style={{ zIndex: 100 }}>
        <StyledMenuItem onClick={() => createHandleMenuClick('last_24_hours')}>
          24 Hours
        </StyledMenuItem>
        <StyledMenuItem onClick={() => createHandleMenuClick('last_7_days')}>
          7 Days
        </StyledMenuItem>
        <StyledMenuItem onClick={() => createHandleMenuClick('custom')}>
          Custom
        </StyledMenuItem>
      </Menu>
      <Dialog open={openDateRangeSelector} onClose={() => setOpenDateRangeSelector(false)} fullWidth={true}>
        <DialogBoxPadding>
          <DatePicker
            selected={interimStartDate}
            onChange={dateChangeHandler}
            startDate={interimStartDate}
            endDate={interimEndDate}
            selectsRange
            inline
            monthsShown={2}
            maxDate={new Date()}
          />
          <PaddingButton>
            <TriggerButton onClick={handleDateChange}>Apply</TriggerButton>
          </PaddingButton>
        </DialogBoxPadding>
      </Dialog>
    </Dropdown>
  );
}
