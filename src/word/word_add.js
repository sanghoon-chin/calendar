let dom = new DOMParser()
let base = 'https://papago.naver.com/?sk=en&tk=ko&hn=0&st='
let myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {})

wordSetting(document.querySelector('.accordion-item'))

function wordSetting(a){
    let addPrepare = a.querySelector('#add_prepare')
    let wordAddCon = a.querySelector('#word-add-container')
    let wordInp = a.querySelectorAll('.word_input')[0]
    let meanInp = a.querySelectorAll('.word_input')[1]

    addPrepare.addEventListener('click',()=>{
        addPrepare.classList.add('none')
        wordAddCon.classList.remove('none')
    })

    wordInp.addEventListener('input', (e)=>{
        console.log(wordInp.value)
        get_means(wordInp.value)
            .then(res =>{
                let mean = res.message.result.translatedText
                meanInp.value = mean
                console.log(res.message.result.translatedText)
            })
    })

    console.log(wordAddCon.querySelectorAll('button'))
    wordAddCon.querySelectorAll('button')[0].addEventListener('click',(e)=>{
        console.log(e.target)
        wordInp.value = ''
        meanInp.value = ''
        addPrepare.classList.toggle('none')
        wordAddCon.classList.toggle('none')
    })//취소

    wordAddCon.querySelectorAll('button')[1].addEventListener('click',(e)=>{
        let a = e.target.parentElement.parentElement.parentElement.parentElement
        let mainCon = a.querySelector('.contents')
        
        let word = wordInp.value
        let mean = meanInp.value

        if(word == '' || mean == ''){
            document.querySelector('.toast-body').innerHTML = '단어를 입력해주세요'
            document.querySelector('small').innerHTML = '단어 이름 에러'
            getToast().show()
            return false
        }
        
        let container = document.createElement('div')
        let wordBox = document.createElement('div')
        let meanBox = document.createElement('div')

        wordBox.innerHTML = word
        meanBox.innerHTML = mean

        container.appendChild(wordBox)
        container.appendChild(meanBox)

        mainCon.appendChild(container)

        wordInp.value = ''
        meanInp.value = ''
    })//추가

}


function get_means(word){
    const params = {
        source: 'en',
        target: 'ko',
        text: word
    }
    console.log(params)
    const requestURL = "https://openapi.naver.com/v1/papago/n2mt"

    return fetch(requestURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            "X-Naver-Client-Id": '33CMJazntzS4HK_vxG0F',
            "X-Naver-Client-Secret": '778nq6zRVT'
        },
        body: JSON.stringify(params)
    }).then(res => res.json())
}



let menu = document.querySelector('#sidebar')
menu.addEventListener('click', () => {
    document.querySelector('aside').classList.toggle('width')
})


