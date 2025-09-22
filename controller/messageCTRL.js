function showMessage(severety,title,message)
{
    let messageBox=document.querySelector('#messageBox');
    let h3=document.querySelector('h3');
    let p=document.querySelector('p');
    let btn=document.querySelector('button');

    h3.innerHTML=title;
    p.innerHTML=message;
    btn.classList.add('btn-close')
    btn.setAttribute('data-bs-dismiss','alert')
    btn.setAttribute('aria-label','Close')
    messageBox.classList.remove('hide');
    messageBox.classList.add('alert',`alert-${severety}`,"alert-dismissable",'fade',"show")
    messageBox.setAttribute('role','alert');

    messageBox.appendChild(h3);
    messageBox.appendChild(p);
    messageBox.appendChild(btn);

    setTimeout(() => {
       messageBox.classList.remove('show');
       messageBox.classList.add('hide'); 
    }, 3000);

}