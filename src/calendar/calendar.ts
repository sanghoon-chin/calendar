import Calendar, { TZDate } from 'tui-calendar';
import type { ISchedule, ICalendarInfo, IEventObject, IEventScheduleObject } from 'tui-calendar';
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
    let schedules: ISchedule[] = [];
    
    const createSchedule = (data: ISchedule) => {
        calendar.clear();
        // map reduce 함수 공부하기
        const id = schedules.map(v => Number(v.id)).reduce((id, v) => Math.max(id, v), 0) + 1;
        const {title, location, state, raw, start, end, isAllDay, calendarId} = data;
        
        const sche:ISchedule = {
            id: String(id),
            calendarId,
            title,
            location,
            state,
            category: isAllDay ? 'allday' : 'time',
            start: (start as TZDate).toDate(),
            end: (end as TZDate).toDate(),
            isAllDay,
            dueDateClass: ''
        };

        schedules.push(sche);
        let d:ISchedule[]|string|null = localStorage.getItem('data')
        if(d == null){
            localStorage.setItem('data', JSON.stringify(schedules));
        } else{
            d = JSON.parse(d as string) as ISchedule[];
            d.push(sche);
            localStorage.setItem('data', JSON.stringify(d));
        }
        calendar.createSchedules(schedules);
    }

    const updateSchedule = (data: IEventObject) => {
        calendar.updateSchedule(data.schedule.id as string, data.schedule.calendarId as string, {
            title: data.changes?.title, //뭘로 바꿀건지
            start: data.changes?.start,
            end: data.changes?.end,
            category: 'time'
        });
        console.log(data)
        let idx = schedules.findIndex((item,idx) =>{
            return item.id == data.schedule.id
        })
        if(data.changes?.location){
            schedules[idx].location = data.changes?.location
        }
        if(data.changes?.state){
            schedules[idx].state = data.changes?.state
        }
        if(data.changes?.isAllDay){
            schedules[idx].isAllDay = data.changes?.isAllDay
        }
        if(data.changes?.title){
            schedules[idx].title = data.changes?.title
        }
        if(data.changes?.start){
            schedules[idx].start = data.changes?.start
        }
        if(data.changes?.end){
            schedules[idx].end = data.changes?.end
        }
        console.log(schedules)
        // localStorage.clear()    // array splice
        localStorage.setItem('data',JSON.stringify(schedules))  
        // schedules = JSON.parse(localStorage.getItem('data') as string)
        // update 로직에서는 로컬스토리지(디비) 저장만 하면 끝!
        
        // console.log(schedules)
        
    }

    const deleteSchedule = (data: IEventScheduleObject) => {
        calendar.deleteSchedule(data.schedule.id as string, data.schedule.calendarId as string)
        
        let idx = schedules.findIndex((item,idx) =>{
            return item.id == data.schedule.id
        })
        
        schedules.splice(idx,1)
        localStorage.clear()
        localStorage.setItem('data',JSON.stringify(schedules))
        console.log(schedules)
        console.log(JSON.parse(localStorage.getItem('data') as string))
        
    }


    return {
        createSchedule,
        updateSchedule,
        deleteSchedule
    }
}