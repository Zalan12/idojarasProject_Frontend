calEvents=[];

async function getCalendarData() {
    try{
        let res=await fetch(`${serverURL}/weather/user/${loggedUser.id}`);
        weathers=await res.json();

        calEvents=[];

        weathers.forEach(weather => {
            calEvents.push({
                title:'Magy'
            })
            
        });
    }
    catch(err){console.log(err)}
    
}