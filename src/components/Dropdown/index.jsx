import * as React from 'react';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { Dialog } from '@mui/material';
import DatePicker from "react-datepicker";
import { subDays } from 'date-fns';
import { useQueryClient } from 'react-query'

import "react-datepicker/dist/react-datepicker.css";
import { DialogBoxPadding, PaddingButton } from '../../styles';

export default function MenuIntroduction({ startDate, endDate, setStartDate, setEndDate, setDateChanged, setSelectedDateRange, selectedDateRange}) {
  const [openDateRangeSelector, setOpenDateRangeSelector] = React.useState(false);
  const [intrimStartDate, setIntrimStartDate] = React.useState(new Date())
  const [intrimEndDate, setIntrimEndDate] = React.useState(null)

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
    setSelectedDateRange(menuItem)
    setAnchorEl(null);
  };

  const handleDateChange = () => {
    setStartDate(intrimEndDate)
    setEndDate(intrimStartDate)
    setOpenDateRangeSelector(false);
    setSelectedDateRange("custom");
  }

  const dateChangeHandler = (dates) => {
    const [start, end] = dates;
    setIntrimEndDate(end)
    setIntrimStartDate(start)
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
    queryClient.invalidateQueries({queryKey: ["logs"]})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDateRange])

  return (
    <Dropdown open={isMenuOpen} defaultOpen={true}>
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
            selected={intrimStartDate}
            onChange={dateChangeHandler}
            startDate={intrimStartDate}
            endDate={intrimEndDate}
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

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  z-index: 1;
  `,
);

const StyledMenuItem = styled(MenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &.${menuItemClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const TriggerButton = styled(MenuButton)(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  width: 10rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  border-radius: 12px;
  padding: 8px 14px;
  line-height: 1.5;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:focus-visible {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }
  `,
);
