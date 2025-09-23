const passRegExp=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const emailRegExp=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function registration() {
    let nameField=document.querySelector('#nameField');
    let emailField=document.querySelector('#emailField');
    let passwordField=document.querySelector('#passwordField');
    let confPasswordField=document.querySelector('#confPasswordField');


    if(nameField.value==""||emailField.value==""||passwordField.value==""||confPasswordField.value=="")
    {
        showMessage('danger','Hiba','Nem adtál meg minden adatot');
        return;
    }

    if(!passRegExp.test(passwordField.value))
        {
            showMessage('danger','Hiba','Nem elég biztonságos jelszó');
            return;
        }

    if(!emailRegExp.test(emailField.value))
        {
            showMessage('danger','Hiba','Nem megfelelő email!');
            return;
        }

    try{

        const res=await fetch(`${serverURL}/users`,{
            method:"POST",
            headers:{"Content-Type":"Application/json"

            },
            body:
            JSON.stringify({
                name:nameField.value,
                email:emailField.value,
                password:passwordField.value
            }
        )
        })
        console.log('Státusz: ',res.status)
        
        const data=await res.json();
        if(res.status==200)
        {
            nameField.value='';
            emailField.value='';
            passwordField.value='';
            confPasswordField.value='';
            showMessage('success','Mahu latlan',data.msg)
            setTimeout(() => {
                render('login')
            }, 3000);
        }
        else{showMessage('danger','HIba',data.msg)}
    }

    catch(err)
    {
        console.log("Valami baj történt",err)
    }
    
}

async function login() {
    let emailField=document.querySelector('#emailField');
    let passwordField=document.querySelector('#passwordField');

    if(emailField.value=='' || passwordField.value=='')
        {
            showMessage('danger','Hiba','Nem adtál meg minden adatot!')
        }
    let user={};

    try{
        const res=await fetch(`${serverURL}/users/login`,
            {
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email:emailField.value,
                    password:passwordField.value
                })

            })
            user=await res.json();

            if(user.id!=undefined)
            {
                loggedUser=user;
            }
            if(!loggedUser)
                {
                    console.log("Hibás belépési adatok")
                    return;
                }
            sessionStorage.setItem('loggedUser',JSON.stringify(loggedUser));

            getLoggedUser();
            showMessage('success','OK','Sikeres bejelentkezés!')

    }
    catch(err)
    {
        console.log('Hiba történt: ',err)
    }

}

function logout()
{
    sessionStorage.removeItem('loggedUser');
    getLoggedUser();
    render('login')
}

async function getProfile() {
    let nameField=document.querySelector('#nameField');
    let emailField=document.querySelector('#emailField');

    const loggedUser=JSON.parse(sessionStorage.getItem('loggedUser'))

    try
    {
        const res=await fetch(`${serverURL}/users/${loggedUser.id}`)
        if(!res.ok)
            {
                showMessage('warning','Hiba','Nem sikerült az adatok lekérése')
                return;
            }
        const user=await res.json();
        emailField.value=user.email;
        nameField.value=user.name;
    }
    catch(err)
    {
        console.log('Valami baj történt az adatok lekérdezése során: ',err)
    }
}

async function updateProfile() {
    let nameField=document.querySelector('#nameField');
    let emailField=document.querySelector('#emailField');

    if(nameField.value=="" || emailField.value=="")
        {
            showMessage('warning','Hiba','Nem érvényes módosítás!');
            return;
        }

    if(nameField.value==loggedUser.name && emailField.value==loggedUser.email)
        {
            showMessage('warning','Hiba','Nem használhatsz jelenlegi adatokat!');
            return;
        }
    try{
        const loggedUser=JSON.parse(sessionStorage.getItem('loggedUser'))
        const res =await fetch(`${serverURL}/users/${loggedUser.id}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email:emailField.value,
                name:nameField.value
            })
        })
        if(!res.ok){
            const data=await res.json();
            console.log(data.msg)
            showMessage('danger','Hiba',`${data.msg}`)
            return;
        }
        const updatedUser=await res.json();
        showMessage('success','Siker','Sikeres felhasználó módosítás')

        sessionStorage.setItem('loggedUser',JSON.stringify({id:loggedUser.id,name:nameField.value,email:emailField.value,password:loggedUser.password}))

    }
    catch(err)
    {
        console.log("Hiba az adatmódosítás során",err)
    }
}

async function updatePassword() {
    let passwordField=document.querySelector('#passwordField');
    let newPasswordField=document.querySelector('#newPasswordField');
}