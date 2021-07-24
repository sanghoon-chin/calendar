import './index.scss';
import '../common/common.scss';
import '../common/sidenav.scss';
import '../common/toast.scss';
import { Toast } from 'bootstrap';

const $: typeof document.querySelector = document.querySelector.bind(document);
const $$: typeof document.querySelectorAll = document.querySelectorAll.bind(document);
const menu_word = $('#menu_word') as HTMLDivElement;
// console.log(document.querySelectorAll('i'))
// const btnPlace = $('#btn-place') as HTMLDivElement;

// btnPlace.addEventListener('click', (e:MouseEvent) => {
//     const btn = e.target as HTMLButtonElement;
//     if(btn.nodeName === 'BUTTON'){
//         if(btn.id === 'memorize'){

//         } else if(btn.id === 'test'){

//         }
//     }
// })

let stTime = 0
let endTime: number
let timerStart: number
let min: string
let sec: string
let milisec: string
let startBtn = $('#testStartBtn') as HTMLButtonElement
let stopBtn = $('#testStopBtn') as HTMLButtonElement
let recordList = $('#testRecordList') as HTMLOListElement
let recordListSingle = $('#testRecordSingle') as HTMLDivElement
startBtn.addEventListener('click', function () {
    // RECORD
    if (this.innerText == 'RECORD' && milisec) {
        console.log(min, sec, milisec)
        let li = document.createElement('li')
        let span = document.createElement('span')
        let time = min + ' : ' + sec + ' : ' + milisec
        span.innerHTML = time
        li.innerText = time
        if (!recordList.firstChild) {
            recordListSingle.append(span)
            recordList.append(li)
            console.log(li.innerHTML)
        } else {
            recordList.insertBefore(li, recordList.firstChild)
            recordListSingle.innerHTML = ''
            recordListSingle.append(span)
            console.log(min,sec,milisec)
        }
        return false
    }
    this.innerText = 'RECORD'
    if (!stTime) {
        stTime = Date.now() // 최초 START
    } else {
        stopBtn.innerText = 'STOP'
        stTime += (Date.now() - endTime) // RESTART
    }
    timerStart = setInterval(function () {
        let nowTime = new Date(Date.now() - stTime);
        min = addZero(nowTime.getMinutes());
        sec = addZero(nowTime.getSeconds());
        milisec = addZero(Math.floor(nowTime.getMilliseconds() / 10));
        ($('#postTestMin') as HTMLSpanElement).innerText = min;
        ($('#postTestSec') as HTMLSpanElement).innerText = sec;
        ($('#postTestMilisec') as HTMLSpanElement).innerText = milisec
    }, 10)
})
stopBtn.addEventListener('click', function () {
    if (timerStart) {
        clearInterval(timerStart) // STOP
        if (this.innerText == 'STOP') {
            endTime = Date.now()
            this.innerText = 'RESET'
            startBtn.innerText = 'RESTART'
        } else { // RESET
            stTime = 0
            min = '0'
            sec = '0'
            milisec = '0';
            ($('#postTestMin') as HTMLSpanElement).innerText = '00';
            ($('#postTestSec') as HTMLSpanElement).innerText = '00';
            ($('#postTestMilisec') as HTMLSpanElement).innerText = '00';
            startBtn.innerText = 'START'
            this.innerText = 'STOP'
            timerStart = 0
            recordList.innerHTML = ''
        }
    }
})
function addZero(num: number) {
    return (num < 10 ? '0' + num : '' + num)
}


// listBtn.addEventListener('click', e => {
//     let title = listname.value
//     createList(title)
// })

// let lists = []
// let listNum = 0

// let createList = (name: string) => {
//     let a = check(name)
//     console.log(a)
//     if(a==false){
//         return false
//     }
//     let collapse = 'flush-collapse'
//     let heading = 'flush-heading'
//     let t = $('#list') as HTMLTemplateElement
//     let container = $('#accordionFlushExample') as HTMLDivElement
//     let clone = document.importNode(t.content,true)


//     let h3 = clone.querySelector('.accordion-header') as HTMLHeadElement
//     h3.id = heading+listNum
//     let btn = clone.querySelector('.accordion-button') as HTMLButtonElement
//     btn.dataset.bsTarget = '#'+collapse+listNum
//     let collapse_tag = clone.querySelector('.accordion-collapse') as HTMLDivElement
//     collapse_tag.id = collapse+listNum
//     btn.innerHTML = name



//     console.log(clone)
//     wordSetting(clone)
//     container.appendChild(clone)
//     listNum++
// }

// function check(name: string){
//     let namesTag = $$('.accordion-button')
//     for(let i = 0;i<namesTag.length;i++){
//         let small = $('small') as HTMLElement
//         small.innerHTML = '리스트 이름 에러'
//         let toastBody = $('.toast-body') as HTMLDivElement
//         if(name == namesTag[i].innerHTML){
//             let toastBody = $('.toast-body') as HTMLDivElement
//                 toastBody.innerHTML = '중복된 이름입니다'
//                 let small = $('small') as HTMLElement
//                 small.innerHTML = '리스트 이름 에러'
//                 new Toast('.toast', {
//                     autohide: true,
//                     delay: 3000,
//                     animation: true
//                 }).show()
//             return false
//         }else if(name == ''){
//             // toastBody.innerHTML = '이름을 입력해주세요'
//             // console.log('이름없음')
//             // getToast().show()
//             let toastBody = $('.toast-body') as HTMLDivElement
//                 toastBody.innerHTML = '이름을 입력해주세요'
//                 let small = $('small') as HTMLElement
//                 small.innerHTML = '리스트 이름 에러'
//                 new Toast('.toast', {
//                     autohide: true,
//                     delay: 3000,
//                     animation: true
//                 }).show()
//             return false
//         }
//     }
// }


// wordSetting($('.accordion-item') as HTMLDivElement)

// function wordSetting(a: DocumentFragment | HTMLDivElement){
//     let addPrepare = a.querySelector('#add_prepare') as HTMLButtonElement
//     let wordAddCon = a.querySelector('#word-add-container') as HTMLDivElement
//     let wordInp = a.querySelectorAll('.word_input')[0] as HTMLInputElement
//     let meanInp = a.querySelectorAll('.word_input')[1] as HTMLInputElement

//     addPrepare.addEventListener('click',()=>{
//         addPrepare.classList.add('none')
//         wordAddCon.classList.remove('none')
//     })

//     wordInp.addEventListener('input', (e)=>{
//         console.log(wordInp.value)
//         get_means(wordInp.value)
//         .then(res =>{
//                 console.log(res)
//                 let mean = res.message.result.translatedText
//                 meanInp.value = mean
//             })
//     })

//     console.log(wordAddCon.querySelectorAll('button'))

//     wordAddCon.addEventListener('click',(e : MouseEvent)=>{
//         let btn = e.target as HTMLButtonElement
//         if(btn.id == 'add_w'){
//             let a = addPrepare.parentElement as HTMLDivElement
//             let mainCon = a.querySelector('.contents') as HTMLDivElement

//             let word = wordInp.value
//             let mean = meanInp.value

//             if(word == '' || mean == ''){
//                 let toastBody = $('.toast-body') as HTMLDivElement
//                 toastBody.innerHTML = '단어를 입력해주세요'
//                 let small = $('small') as HTMLElement
//                 small.innerHTML = '단어 이름 에러'
//                 new Toast('.toast', {
//                     autohide: true,
//                     delay: 3000,
//                     animation: true
//                 }).show()
//                 return false
//             }

//             let container = document.createElement('div')
//             let wordBox = document.createElement('div')
//             let meanBox = document.createElement('div')

//             wordBox.innerHTML = word
//             meanBox.innerHTML = mean

//             container.appendChild(wordBox)
//             container.appendChild(meanBox)

//             mainCon.appendChild(container)

//             wordInp.value = ''
//             meanInp.value = ''

//         }else if(btn.id == 'add_c'){
//             wordInp.value = ''
//             meanInp.value = ''
//             addPrepare.classList.toggle('none')
//             wordAddCon.classList.toggle('none')
//         }

//     })//추가

// }

// function get_means(word: string){
//     const params = {
//         source: 'en',
//         target: 'ko',
//         text: word
//     }
//     console.log(params)
//     const requestURL = "https://openapi.naver.com/v1/papago/n2mt"

//     return fetch(requestURL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json; charset=UTF-8',
//             "X-Naver-Client-Id": '33CMJazntzS4HK_vxG0F',
//             "X-Naver-Client-Secret": '778nq6zRVT'
//         },
//         body: JSON.stringify(params)
//     }).then(res => res.json())
// }

// const getToast = () => {
//     console.log('akdlj')
//     const toast = $('.toast') as HTMLDivElement;
//     const options = {
//         autohide: false
//     }
//     return new Toast(toast, options)
// }

let menuBtn = $('#sidebar') as HTMLButtonElement
let aside = $('aside') as HTMLElement
menuBtn.addEventListener('click', e => {
    aside.classList.toggle('width')
})
// const toastBtn = document.querySelector('#toast-btn') as HTMLButtonElement;

// // toastBtn.addEventListener('click', e => {
// //     new Toast('.toast', {
// //         autohide: true,
// //         delay: 3000,
// //         animation: true
// //     }).show()
// // })