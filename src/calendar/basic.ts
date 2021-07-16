import Calendar from "tui-calendar";

export const changeViewEvent = (calendar: Calendar) => {
    const container = document.querySelector('.view-container') as HTMLUListElement;
    let prevTar = document.querySelector('li[data-view="month"]') as HTMLLIElement;
    container.addEventListener('click', (e:MouseEvent) => {
        const tar = e.target as HTMLElement;
        if(tar.nodeName === 'LI'){
            const currView = tar.dataset.view as string;
            if(prevTar){
                (prevTar as HTMLLIElement).classList.remove('active');
            }
            tar.classList.add('active');
            calendar.changeView(currView)
            prevTar = tar as HTMLLIElement;
        }
    })
}

export const addBtnSchedule = (calendar: Calendar) => {
    const container = document.querySelector('#btn-container') as HTMLDivElement;
    container.addEventListener('click', (e) => {
        const tar = e.target as HTMLElement;
        if(tar.dataset.type === 'prev'){
            calendar.prev()
        } else if (tar.dataset.type === 'next'){
            calendar.next()
        } else if(tar.dataset.type === 'today'){
            calendar.today();
        }
        updateCurrentDate(calendar)
    })
}

export const updateCurrentDate = (calendar: Calendar) => {
    const currentDateEl = document.querySelector('#current-date') as HTMLDivElement;
    const year = calendar.getDate().toDate().getFullYear();
    const month = calendar.getDate().toDate().getMonth();
    currentDateEl.innerHTML = `${year}년 ${month + 1}월`;
}