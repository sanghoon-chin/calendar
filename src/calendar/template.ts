import {ITemplateConfig} from 'tui-calendar'

export const templates: ITemplateConfig = {
    monthDayname(dayname) {
        return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
    },
    milestone(schedule) {
        return '<span style="color:red;"><i class="fa fa-flag"></i> ' + schedule.title + '</span>';
    },
    milestoneTitle() {
        return '목표';
    },
    task(schedule) {
        return '&nbsp;&nbsp;#' + schedule.title;
    },
    taskTitle() {
        return '<label><input type="checkbox" />Task</label>';
    },
    allday(schedule) {
        return schedule.title + ' <i class="fa fa-refresh"></i>';
    },
    alldayTitle() {
        return '하루 종일';
    },
    time(schedule) {
        return schedule.title + ' <i class="fa fa-refresh"></i>' + schedule.start;
    },
    popupIsAllDay() {
        return '하루 종일';
    },
    popupStateFree() {
        return '못했음';
    },
    popupStateBusy() {
        return '했음';
    },
    titlePlaceholder() {
        return '일정명';
    },
    locationPlaceholder() {
        return '위치';
    },
    startDatePlaceholder() {
        return 'Start date';
    },
    endDatePlaceholder() {
        return 'End date';
    },
    popupSave() {
        return '일정 추가';
    },
    popupUpdate() {
        return '일정 수정';
    },
    // popupDetailDate(isAllDay, start, end) {
    //     var isSameDate = moment(start).isSame(end);
    //     var endFormat = (isSameDate ? '' : 'YYYY.MM.DD ') + 'hh:mm a';

    //     if (isAllDay) {
    //         return moment(start).format('YYYY.MM.DD') + (isSameDate ? '' : ' - ' + moment(end).format('YYYY.MM.DD'));
    //     }

    //     return (moment(start).format('YYYY.MM.DD hh:mm a') + ' - ' + moment(end).format(endFormat));
    // },
    popupDetailLocation(schedule) {
        return '장소 : ' + schedule.location;
    },
    popupDetailUser(schedule) {
        return '사용자 : ' + (schedule.attendees || []).join(', ');
    },
    popupDetailState(schedule) {
        return 'State : ' + schedule.state || 'Busy';
    },
    popupDetailRepeat(schedule) {
        return 'Repeat : ' + schedule.recurrenceRule;
    },
    popupDetailBody(schedule) {
        return 'Body : ' + schedule.body;
    },
    popupEdit() {
        return 'Edit';
    },
    popupDelete() {
        return 'Delete';
    }
}