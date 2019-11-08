const  btnRepos = document.getElementById("btnRepos");
const  btnReposXML = document.getElementById("btnReposXML");
const btnInfoRepos = document.getElementById("btnInfoRepos");
const selectRepos = document.getElementById("listRepos");
const btnRefresh = document.getElementById("btnRefresh");

//список ваших репозиториев
btnRepos.addEventListener("click", getRepos);
async function getRepos() {
    clear();
    const url = "https://api.github.com/users/PolinaSkoraya/repos";
    const response = await fetch(url);
    const result = await response.json();
    result.sort((a,b) =>
        new Date(a.created_at) - new Date(b.created_at)
    );
    result.forEach(i=>{
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = `${i.name} ${i.created_at}`;
        selectRepos.appendChild(opt);
    })
}

function clear() {
    while(selectRepos.firstChild){
       selectRepos.removeChild(selectRepos.firstChild);
    };
}

// лучший по watchers_count
btnReposXML.addEventListener("click", getReposXML);
async function getReposXML() {
    let xhr = new XMLHttpRequest();
    const url = "https://api.github.com/users/PolinaSkoraya/repos";
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function() {
        let responseObj = xhr.response;
        responseObj.sort((a,b) =>
            b.watchers - a.watchers
        );
        let divWat = document.getElementById('watchers');
        divWat.innerHTML = `${responseObj[0].name}`;
    };
}

btnInfoRepos.addEventListener("click", getInfoRepos);
async function getInfoRepos(){
    const url = "https://api.github.com/users/PolinaSkoraya/repos";
    const response = await fetch(url);
    const result = await response.json();
    let divWat = document.getElementById('infoRepos');
    divWat.innerHTML = `${result[0].name}`;
}

btnRefresh.addEventListener("click", infoRefresh);

function infoRefresh(elem) {
    const url = "https://api.github.com/users/PolinaSkoraya/repos";
    function showMessage(message) {
        let messageElem = document.createElement('div');
        messageElem.append(message);
        elem.append(messageElem);
    }
async function refresh() {
    let response = await fetch(url);
    if (response.status == 502) {
        // Таймаут подключения
        // случается, когда соединение ждало слишком долго.
        // давайте восстановим связь
        await refresh();
    } else if (response.status != 200) {
        // Показать ошибку
        showMessage(response.statusText);
        // Подключиться снова через секунду.
        await new Promise(resolve => setTimeout(resolve, 1000));
        await refresh();
    } else {
        // Получить сообщение
        await getRepos();
        await getReposXML();
        await refresh();
    }
}
    refresh();
}