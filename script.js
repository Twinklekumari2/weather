document.addEventListener('click',function(){
    const container = document.querySelector(".container");
    const degree = document.getElementById("degree");
    const cityName = document.getElementById("cityName");
    const time = document.getElementById("time");
    // const Display = new Date().getDay();
    const day = document.getElementById("day");
    const date = document.getElementById("date")
    const describe = document.getElementById("describe");
    const city = document.querySelector(".city");
    const button = document.getElementById("btn");
    const airQuality = document.querySelector(".airQuality");


    function isValidating(inputCity){
        if(inputCity.trim() === ""){
            alert("City Name shoiuld not be empty");
        }
            const regex = /^[a-zA-Z]{2,15}$/;
            const isMatching = regex.test(inputCity);

            if(!isMatching){
                alert("Invalid City Name");
            }
            return isMatching;
        
    }

    async function fetchCityDetails(inputCity){
        const url = `http://api.weatherapi.com/v1/current.json?key=0a68597856544d8788e83823241012&q=${inputCity}&aqi=yes`;

        // const data = await response.json();
        // console.log(data);
        
        try{

           button.textContent = "Searching";
           city.disabled = true;
            
            const response = await fetch(url);
            if(!response.ok){
                city.disabled = false;
                alert("City does not exist");
            }
            const data = await response.json();
            console.log(data)

        

            displayCityDetail(data);

        }
        catch(error){

            container.innerHTML = `<p> ${error} </p>`

        }
        finally{
            button.textContent = "Search";
            city.disabled = false;


        }

    }

    function displayCityDetail(data){

        const degreeDisplay = data.current.feelslike_c;
        const cityDisplay = data.location.name;
        const time1 = data.location.localtime;
        const describeDisplay = data.current.condition.text;
        const iconDisplay = data.current.condition.icon;
        const countryDisplay = data.location.country;

        const co = data.current.air_quality.co;
        const no2 = data.current.air_quality.no2;
        const o3 = data.current.air_quality.o3;
        const pm2_5 = data.current.air_quality.pm2_5;
        const so2 = data.current.air_quality.so2;
        const pm10 = data.current.air_quality.pm10;



        const dateDisplay = time1.split(' ')[0];
        const timeDisplay = time1.split(' ')[1];
        const day1 = new Date(dateDisplay).getDay();
        
        let dayDisplay;
        switch(day1){
            case 0 : dayDisplay = "Sunday";
            break;
            case 1 : dayDisplay = "Monday";
            break;
            case 2 : dayDisplay = "Tuesday";
            break;
            case 3 : dayDisplay = "Wednesday";
            break;
            case 4 : dayDisplay = "Thursday";
            break;
            case 5 : dayDisplay = "Friday";
            break;
            case 6 : dayDisplay = "Saturday";           
        }

        date.innerHTML = dateDisplay;
        time.innerHTML = timeDisplay;
        day.innerHTML = dayDisplay;
        describe.innerHTML = describeDisplay;
        cityName.innerHTML = `${cityDisplay} [${countryDisplay}]`;
        degree.innerHTML = degreeDisplay + "ºC";
        iconDisplay.innerHTML = iconDisplay;

        airQuality.innerHTML = ` <h2> AIR QUALITY </h2>
            <ul>
                <li><strong>CO:</strong> ${co}</li>
                <li><strong>O3:</strong> ${o3}</li>
                <li><strong>SO2:</strong> ${so2}</li>
                <li><strong>NO2:</strong> ${no2}</li>

            </ul>
        `;



    }




    button.addEventListener('click' , function() {
        const inputCity = city.value;

        isValidating(inputCity);
        if(isValidating){
            fetchCityDetails(inputCity);
        }

    })

})