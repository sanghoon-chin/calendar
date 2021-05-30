
let listBtn = document.querySelector('#create_List')
let listname = document.querySelector('#list_name')

listBtn.addEventListener('click', e => {
    let title = listname.value
    createList(title)
})


let lists = []
let listNum = 0
let createList = (name) => {
    let a = check(name)
    console.log(a)
    if(a==false){
        return false
    }
    let collapse = 'flush-collapse'
    let heading = 'flush-heading'
    let t = document.querySelector('#list')
    let container = document.querySelector('#accordionFlushExample')
    let clone = document.importNode(t.content,true)
    

    clone.querySelector('.accordion-header').id = heading+listNum

    clone.querySelector('.accordion-button').dataset.bsTarget = '#'+collapse+listNum
    clone.querySelector('.accordion-collapse').id = collapse+listNum
    clone.querySelector('.accordion-button').innerHTML = name
    
    

    console.log(clone)
    wordSetting(clone)
    container.appendChild(clone)
    listNum++
}

function check(name){
    let namesTag = document.querySelectorAll('.accordion-button')
    for(let i = 0;i<namesTag.length;i++){
        document.querySelector('small').innerHTML = '리스트 이름 에러'
        if(name == namesTag[i].innerHTML){
            document.querySelector('.toast-body').innerHTML = '중복된 이름입니다'
            getToast().show()
            return false
        }else if(name == ''){
            document.querySelector('.toast-body').innerHTML = '이름을 입력해주세요'
            getToast().show()
            return false
        }
    }
}