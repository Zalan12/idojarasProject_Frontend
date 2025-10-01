let today=new Date().toISOString().split('T')[0];
let adat=[];
let adatID=0;
function setDate(){
    
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
           let td7=document.createElement('td');
           let delBtn=document.createElement('td');
           let modBtn=document.createElement('td')

           td1.classList.add('text-end');
           td2.classList.add('text-end');
           td3.classList.add('text-end');
           td4.classList.add('text-end');
           td5.classList.add('text-end');
           delBtn.classList.add('btn','btn-danger');
           modBtn.classList.add('btn','btn-warning');
           delBtn.setAttribute("id",adat[i].wid);
           modBtn.setAttribute("id",adat[i].wid);
           modBtn.setAttribute("data-bs-toggle","collapse")
           modBtn.setAttribute("href","#collapseExample2")


           delBtn.addEventListener('click',()=>{
            egyTorles();
           })

            modBtn.addEventListener('click',()=>{
            egyMod();
           })

           td1.innerHTML=adat[i].wid;
           td2.innerHTML=adat[i].datum;
           td3.innerHTML=adat[i].minTemp;
           td4.innerHTML=adat[i].maxTemp;
           td5.innerHTML=adat[i].weatherType;
           delBtn.innerHTML='<i class="bi bi-trash-fill"></i>';
           modBtn.innerHTML='<i class="bi bi-gear-wide"></i>';
           tr.appendChild(td1);
           tr.appendChild(td2);
           tr.appendChild(td3);
           tr.appendChild(td4);
           tr.appendChild(td5);
           td7.appendChild(modBtn);
           td6.appendChild(delBtn);
           tr.appendChild(td6);
           tr.appendChild(td7);
           adatTabla.appendChild(tr);

           
            
        }
        
    }
    
    catch(err){console.log("Hiba: ",err)}
    
}
async function egyTorles()
{
    try{
        const res=await fetch(`${serverURL}/weather/${event.currentTarget.id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }

        });
        let data=await res.json();
        if(res.status==200)
            {
                showMessage('success','OK','Sikeres törlés')
                
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
            console.log(res.status)
            if(res.status==200)
                {
                    showMessage('success','OK','Sikeres törlés')
                    setTimeout(await render('main'),3000);
                }
        }
        catch(err){console.log("error: ",err)}
    }
}

async function egyMod() {
    let datum=document.querySelector('#dateField2');
    let minTemp=document.querySelector('#minTempField2');
    let maxTemp=document.querySelector('#maxTempField2');
    let weatherType=document.querySelector('#weatherTypeField2');
    adatID=event.currentTarget.id
    try
    {
        const res=await fetch(`${serverURL}/weather/${adatID}`)
        if(!res.ok)
            {
                showMessage('warning','Hiba','Nem sikerült az adatok lekérése')
                return;
            }
        const data=await res.json();
            datum.value=data.datum;
            minTemp.value=data.minTemp;
            maxTemp.value=data.maxTemp;
            weatherType.value=data.weatherType;
    }
    catch(err)
    {
        console.log('Valami baj történt az adatok lekérdezése során: ',err)
    }
}

async function Modosit() {
    let datum=document.querySelector('#dateField2');
    let minTemp=document.querySelector('#minTempField2');
    let maxTemp=document.querySelector('#maxTempField2');
    let weatherType=document.querySelector('#weatherTypeField2');

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
        
        const res =await fetch(`${serverURL}/weather/${adatID}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                datum:datum.value,
                minTemp:minTemp.value,
                maxTemp:maxTemp.value,
                weatherType:weatherType.value
            })
        })
        if(!res.ok){
            const data=await res.json();
            console.log(data.msg)
            showMessage('danger','Hiba',`${data.msg}`)
            return;
        }
        const a=await res.json();
        showMessage('success','Siker','Sikeres adat módosítás')
        setTimeout(() => {
            render('main');
        }, 3000);

    }
    catch(err)
    {
        console.log("Hiba az adatmódosítás során",err)
    }
}