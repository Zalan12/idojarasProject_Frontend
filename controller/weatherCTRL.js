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

   
}