calEvents=[];

async function getCalendarData() {
    try{
        let res=await fetch(`${serverURL}/weather/user/${loggedUser.id}`);
        weathers=await res.json();

        calEvents=[];

        weathers.forEach(weather => {
            calEvents.push(
                {title: `Típus: ${weather.weatherType}`,start:weather.datum},
                {title: `Min: ${weather.minTemp}°C`,start:weather.datum,backgroundColor:"blue"},
                {title: `Max: ${weather.maxTemp}°C`,start:weather.datum,backgroundColor:"red"}
            )
            
        });
    }
    catch(err){console.log(err)}
    
}

function initCalendar(){
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
     
        initialView: 'dayGridMonth',
        locale: 'hu',
        headerToolbar: {
            left: 'prev,today,next',
            center: 'title',
            right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        },
        events: calEvents
    });
    calendar.render();
}