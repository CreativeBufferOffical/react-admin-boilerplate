import moment from 'moment';

export function monthsSince(date) {
  if (!date) return 'None';
  return `${moment(date).diff(moment(), 'months') * -1} months ago`;
}

export function timeSince(date) {
  if (!date) return 'None';
  return moment(date).fromNow();
}

// takes months on a 0-based index
export function firstOfMonth(year, month) {
  return new Date(year, month);
}

// takes months on a 0-based index
export function lastOfMonth(year, month) {
  if (month === 11) return new Date(firstOfMonth(year + 1, 0) - 1);
  return new Date(firstOfMonth(year, month + 1) - 1);
}

export function sameDay(date1, date2) {
  if (!date1 || !date2) return false;
  const d1 = moment.utc(date1).local();
  const d2 = moment.utc(date2).local();
  return d1.isSame(d2, 'date');
}

// return day number on 1-based index
export function getDayNumber(date) {
  return moment(date).date();
}

export function formatDateMMYYYY(date) {
  if (date) return moment(date).format('MM/YYYY');
  return '--';
}

export function formatDateMMDDYYYY(date) {
  if (date) return moment(date).format('MM/DD/YYYY');
  return '--';
}

export function formatDateHHMM(date) {
  if (date) return moment(date).format('hh:mm a');
  return '--';
}

export function monthName(month) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return monthNames[month - 1];
}

export function getTimePeriodFromGraphSelection(monthSelection) {
  return {
    start: moment
      .utc()
      .subtract(monthSelection, 'months')
      .startOf('month')
      .toDate(),
    end: moment
      .utc()
      .subtract(1, 'months')
      .endOf('month')
      .toDate(),
  };
}

export function getTimezoneOffsetDate(date) {
  return new Date(date - date.getTimezoneOffset() * 60000);
}

export const getHoursBetweenDates = (dateBefore, dateAfter) =>
  (new Date(`${dateAfter}`).getTime() - new Date(`${dateBefore}`).getTime()) /
  1000 /
  60 /
  60;
