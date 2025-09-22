const author="Farkas Zalán";
const company="Bajai SZC Türr István Technikum"
const appTitle="Időjárás app"

let title=document.querySelector('#title');
let Author=document.querySelector('#author');
let Company=document.querySelector('#company');
let main=document.querySelector('main');

let mainMenu=document.querySelector('#mainMenu');
let userMenu=document.querySelector('#userMenu');

let loggedUser=null;

title.innerHTML=appTitle;
Author.innerHTML=author;
Company.innerHTML=company;

//Témaválasztás
let lightModeBTN=document.querySelector('#lightModeBTN');
let darkModeBTN=document.querySelector('#darkModeBTN');

lightModeBTN.addEventListener('click', ()=>{

    setTheme('light');
    saveTheme('light');
    setThemeBTN('light');
})
darkModeBTN.addEventListener('click', ()=>{

    setTheme('dark');
    saveTheme('dark');
    setThemeBTN('dark');
})

function setTheme(theme)
{
    document.documentElement.setAttribute('data-bs-theme',theme)
}
function saveTheme(theme)
{
    localStorage.setItem('SCTheme',theme)
}
function setThemeBTN(theme)
{
    if (theme=='light')
        {
            lightModeBTN.classList.add('hide');
            darkModeBTN.classList.remove('hide');
        }
    else{
        lightModeBTN.classList.remove('hide');
        darkModeBTN.classList.add('hide');
    }
}

function loadTheme()
{
    if(localStorage.getItem('SCTheme'))
    {
        theme=localStorage.getItem('SCTheme')
    }
    setTheme(theme);
}
//Nézet kezelés
async function render(view)
{
    main.innerHTML=await((await fetch(`views/${view}.html`)).text())
}


async function getLoggedUser() {
    if(sessionStorage.getItem('loggedUser'))
    {

    }
     else
     {
        await render('login');
        userMenu.classList.add('d-none');
        mainMenu.classList.remove('d-none');
        
     }
    
}
loadTheme()
getLoggedUser()