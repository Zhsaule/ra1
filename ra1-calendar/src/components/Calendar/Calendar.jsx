import PropTypes from 'prop-types';
import './main.css';

function Calendar({ date }) {
  const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const monthNamesGenitive = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
  const dayOfWeekNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

  const currentDay = date.getDate();
  const currentWeekDay = date.getDay();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const prevMonthDaysToShow = (firstDayOfWeek + 6) % 7;
  const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1);
  const prevMonthStart = prevMonthDays - prevMonthDaysToShow + 1;

  const totalCells = Math.ceil((prevMonthDaysToShow + daysInMonth) / 7) * 7;
  const nextMonthDaysToShow = totalCells - (prevMonthDaysToShow + daysInMonth);

  const calendarDays = [];
  for (let i = prevMonthStart; i <= prevMonthDays; i++) {
    calendarDays.push({ day: i, month: 'prev' });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, month: 'current' });
  }
  for (let i = 1; i <= nextMonthDaysToShow; i++) {
    calendarDays.push({ day: i, month: 'next' });
  }

  const renderCalendarDays = () => {
    return calendarDays.map((day, index) => {
      const dayClass = day.month === 'current' ? (day.day === currentDay ? 'ui-datepicker-today' : '') : 'ui-datepicker-other-month';
      return <td key={index} className={dayClass}>{day.day}</td>;
    });
  };

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{dayOfWeekNames[currentWeekDay]}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{currentDay}</div>
          <div className="ui-datepicker-material-month">{monthNamesGenitive[currentMonth]}</div>
          <div className="ui-datepicker-material-year">{currentYear}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{monthNames[currentMonth]}</span>&nbsp;<span className="ui-datepicker-year">{currentYear}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <thead>
          <tr>{dayNames.map(dayName => <th key={dayName}>{dayName}</th>)}</tr>
        </thead>
        <tbody>
          {Array.from({ length: totalCells / 7 }, (_, weekIndex) => (
            <tr key={weekIndex}>{renderCalendarDays().slice(weekIndex * 7, (weekIndex + 1) * 7)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired, // Указывает, что date должен быть экземпляром Date и является обязательным
};

export default Calendar;
