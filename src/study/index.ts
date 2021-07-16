import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import './index.scss'

const el = document.querySelector('#editor') as HTMLDivElement;

const editor = new Editor({
    el,
    height: '600px',
    initialEditType: 'markdown',
    previewStyle: 'tab',
    events: {
        load(){
            console.log('load editor')
        }
    },
    hideModeSwitch: true
   
});

Editor.setLanguage('ko-kr', require('@toast-ui/editor/dist/i18n/ko-kr.js')) // 이거 왜 안되는지..

editor.getMarkdown();