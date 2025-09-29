let adat=[];

function setDate(){
    let today=new Date().toISOString().split('T')[0];
    let datum=document.querySelector('#dateField');
    datum.setAttribute('min',today)
}

async function idoAdatFelvetel() {
    let datum=document.querySelector('#dateField');
    let minTemp=document.querySelector('#minTempField');
    let maxTemp=document.querySelector('#maxTempField');
    let weatherType=document.querySelector('#weatherTypeField');

    if(datum.value=="" || minTemp.value==""|| maxTemp.value=="" || weatherType.option=="")
    {
        showMessage('danger','Hiba','Üres érékekkel nem tudsz adatot rögzíteni');
        return;
    }
    if(minTemp.value<=-100|| maxTemp.value>60)
        {
            showMessage('danger','Hiba','Valótlan hőmérsékleti adatok');
            return;
        }
    if(minTemp.value>=maxTemp.value)
    {
        showMessage('danger','Hiba','A minimum nem lehet nagyobb és/vagy egyenlő a maximummal!');
        return;
    }
    try{
        const res=await fetch(`${serverURL}/weather`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                uid:loggedUser.id,
                datum:datum.value,
                minTemp:Number(minTemp.value),
                maxTemp:Number(maxTemp.value),
                weatherType:weatherType.value
            })
        })

        const data=await res.json();

        if(res.status==200)
        {
            datum.value="";
            minTemp.value="";
            maxTemp.value="";
            showMessage('success','Siker','Sikeres adatfelvétel')
            
        }
    }
    catch(err)
    {
        console.log("Hiba az adat felvétel során. Hibaüzenet: ",err)
    }
    await render('main');
   
}

async function loadData() {

    try{
        const res=await fetch(`${serverURL}/weather/user/${loggedUser.id}`);
        if(!res.ok){
            showMessage('danger','Hiba','Probléma történt az adatlekérdezés során');return}
        adat=await res.json();

        let adatTabla=document.querySelector('#adatTabla');

        for (let i = 0; i < adat.length; i++) {
           let tr=document.createElement('tr');
           let td1=document.createElement('td')
           let td2=document.createElement('td')
           let td3=document.createElement('td')
           let td4=document.createElement('td')
           let td5=document.createElement('td')
           let td6=document.createElement('td')
           let delBtn=document.createElement('td');
           let modBtn=document.createElement('td')

           td1.classList.add('text-end');
           td2.classList.add('text-end');
           td3.classList.add('text-end');
           td4.classList.add('text-end');
           td5.classList.add('text-end');
           delBtn.classList.add('btn','btn-danger');
           modBtn.classList.add('btn','btn-danger');
           delBtn.setAttribute("id",adat[i].wid);
           

           delBtn.addEventListener('click',()=>{
            egyTorles();
           })

           td1.innerHTML=adat[i].wid;
           td2.innerHTML=adat[i].datum;
           td3.innerHTML=adat[i].minTemp;
           td4.innerHTML=adat[i].maxTemp;
           td5.innerHTML=adat[i].weatherType;
           delBtn.innerHTML='<i class="bi bi-trash-fill"></i>';
           tr.appendChild(td1);
           tr.appendChild(td2);
           tr.appendChild(td3);
           tr.appendChild(td4);
           tr.appendChild(td5);
           td6.appendChild(delBtn);
           tr.appendChild(td6);
           adatTabla.appendChild(tr);

           
            
        }
        
    }
    
    catch(err){console.log("Hiba: ",err)}
    
}
async function egyTorles()
{
    try{
        const res=await fetch(`${serverURL}/weather/${event.target.id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }

        });
        let data=await res.json();
        if(res.status==200)
            {
                showMessage('success','OK','Sikeres törlés')
                setTimeout(await render('main'),3000);
            }
    }
    catch(err){console.log("error: ",err)}
}

async function delAll() {
    if(confirm('Biztos öcskös?'))
    {
        try{
            const res=await fetch(`${serverURL}/weather/user/${loggedUser.id}`,{
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                }
    
            });
            let data=await res.json();
            if(res.status==200)
                {
                    showMessage('success','OK','Sikeres törlés')
                    setTimeout(await render('main'),3000);
                }
        }
        catch(err){console.log("error: ",err)}
    }
}