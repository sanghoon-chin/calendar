import './index.scss';
// import '../common/common.scss';
// import '../common/sidenav.scss';
// import '../common/toast.scss';
// import '../common/main.scss'
import { Toast } from 'bootstrap';


const $: typeof document.querySelector = document.querySelector.bind(document);
const $$: typeof document.querySelectorAll = document.querySelectorAll.bind(document);
const menu_word = $('#menu_word') as HTMLDivElement;

let sidebar = $('.nav') as HTMLUListElement
let menuBtn = $('#menuBtn') as HTMLLIElement

menuBtn.addEventListener('click',()=>{
    sidebar.classList.toggle('fullpage')
})