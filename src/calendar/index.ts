import "tui-calendar/dist/tui-calendar.css";
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import { Toast } from 'bootstrap';

import './index.scss';
import { init as initCalendar, crudSchdule } from './calendar'
import { changeViewEvent, addBtnSchedule, updateCurrentDate } from './basic'

const toast = new Toast('.toast', {
    autohide: true,
    animation: true,
    delay: 3000
})

const calendar = initCalendar();
const controlCalendar = crudSchdule(calendar);
updateCurrentDate(calendar)
changeViewEvent(calendar);
addBtnSchedule(calendar);

calendar.on({
    beforeCreateSchedule(scheduleData) {
        controlCalendar.createSchedule(scheduleData);
    },
    afterRenderSchedule(e) {
        console.log(e)
        toast.show();
        updateCurrentDate(calendar)
    },
    beforeUpdateSchedule(e){

    },
    beforeDeleteSchedule(e){

    }
})