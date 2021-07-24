import { Toast } from 'bootstrap';

import './index.scss';
import { init as initCalendar, crudSchdule } from './calendar'
import { changeViewEvent, addBtnSchedule, updateCurrentDate } from './basic'

import {ISchedule, TZDate} from 'tui-calendar' 

const toast = new Toast('.toast', {
    autohide: true,
    animation: true,
    delay: 3000
})

const calendar = initCalendar();
const controlCalendar = crudSchdule(calendar);

const checkDB = () => {
    const schedules:ISchedule[] = JSON.parse(localStorage.getItem('data') as string) || [];
    calendar.createSchedules(schedules);
}

updateCurrentDate(calendar)
changeViewEvent(calendar);
addBtnSchedule(calendar);
checkDB();

calendar.on({
    beforeCreateSchedule(scheduleData) {
        controlCalendar.createSchedule(scheduleData);
    },
    afterRenderSchedule(e) {
        toast.show();
        updateCurrentDate(calendar)
    },
    beforeUpdateSchedule(e){
        controlCalendar.updateSchedule(e)
    },
    beforeDeleteSchedule(e){
        controlCalendar.deleteSchedule(e)
    }
})