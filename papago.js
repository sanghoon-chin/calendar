const params = {
    source: 'en',
    target: 'ko',
    text: 'Hi My name is Park'
}

const requestURL = 'https://openapi.naver.com/v1/papago/n2mt'

fetch(requestURL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        "X-Naver-Client-Id": '33CMJazntzS4HK_vxG0F',
        "X-Naver-Client-Secret": '778nq6zRVT'
    },
    body: JSON.stringify(params)
})
.then(res => res.json())
.then(res => {
    console.log(res)
    console.log(res.message.result.translatedText)
})