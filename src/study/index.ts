import 'bootstrap';
import Editor from '@toast-ui/editor';
import './index.scss';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'; // 다크모드 지원

const el = document.querySelector('#editor') as HTMLDivElement;

const reWidgetRule = /\[(@\S+)\]\((\S+)\)/;

const editor = new Editor({
    el,
    height: '600px',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    initialValue: '여기에 입력한 데이터가 보여집니다',
    events: {
        load(){
            console.log('Editor ready!');
        },
        blur(){
            const data = editor.getMarkdown();
            console.log(data)   // 이런 식으로 데이터 가져올 수 있음
        }
    },
    hideModeSwitch: true,
    plugins: [colorSyntax],
    theme: 'light',
    language: 'ko-KR',
    widgetRules: [  // https://ui.toast.com/weekly-pick/ko_20210617
        {
          rule: reWidgetRule,
          toDOM(text) {
            const rule = reWidgetRule;
            const matched = text.match(rule) as Array<string>;
            const span = document.createElement('span');
            span.style.backgroundColor = 'purple';
            span.style.color = 'white';
      
            span.innerHTML = `<a class="widget-anchor" href="${matched[2]}">${matched[1]}</a>`;
            return span;
          },
        },
      ],
});

editor.focus();