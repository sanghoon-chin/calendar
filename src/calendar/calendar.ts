import Calendar from 'tui-calendar';
import type { ISchedule, ICalendarInfo } from 'tui-calendar';
import {templates} from './template';

const CALENDAR_ID = '1';
const CALENDAR_NAME = '내 공부 캘린더';

export const init = () => {
    const calendarInfo:ICalendarInfo = {
        id: CALENDAR_ID,
        name: CALENDAR_NAME
    }

    const calendar = new Calendar('#calendar', {
        defaultView: 'month',
        taskView: ['milestone', 'task'],
        scheduleView: ['allday', 'time'],
        useCreationPopup: true,
        useDetailPopup: true,
        template: templates,
        month: {
            daynames: ['일', '월', '화', '수', '목', '금', '토'],
            startDayOfWeek: 0,
            narrowWeekend: false
        },
        week: {
            daynames: ['일', '월', '화', '수', '목', '금', '토'],
            startDayOfWeek: 0,
            narrowWeekend: false
        },
        calendars: [calendarInfo]
    });
    return calendar
}


export const crudSchdule = (calendar: Calendar) => {
    const schedules: ISchedule[] = [];

    const createSchedule = (data: ISchedule) => {
        calendar.clear();
        console.log(data);
        const id = schedules.map(v => Number(v.id)).reduce((id, v) => Math.max(id, v), 0) + 1;
        const {title, location, state, raw, start, end, isAllDay, calendarId} = data;

        const sche:ISchedule = {
            id: String(id),
            calendarId,
            title,
            location,
            state,
            category: isAllDay ? 'allday' : 'time',
            start,
            end,
            isAllDay,
            dueDateClass: ''
        };

        schedules.push(sche);
        calendar.createSchedules(schedules);
    }

    const updateSchedule = () => {

    }

    const deleteSchedule = () => {

    }

    return {
        createSchedule,
        updateSchedule,
        deleteSchedule
    }
}
