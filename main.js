const  btnRepos = document.getElementById("btnRepos");
const  btnReposXML = document.getElementById("btnReposXML");
const btnInfoRepos = document.getElementById("btnInfoRepos");
const selectRepos = document.getElementById("listRepos");

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