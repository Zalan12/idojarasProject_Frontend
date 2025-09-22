const passRegExp=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const emailRegExp=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function registration() {
    let nameField=document.querySelector('#nameField');
    let emailField=document.querySelector('#emailField');
    let passwordField=document.querySelector('#passwordField');
    let confPasswordField=document.querySelector('#confPasswordField');


    if(nameField.value==""||emailField.value==""||passwordField.value==""||confPasswordField.value=="")
    {
        showMessage('danger','Hiba','Nem adtál meg minden adatot')
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
        
        const data=await res.json();
        if(res.status==200)
        {
            showMessage('success','Mahu latlan',"OKES")
        }
        else{showMessage('danger','HIba',data.msg)}
    }

    catch(err)
    {
        console.log("Valami baj történt",err)
    }
    
}