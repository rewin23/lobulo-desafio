(function(){


	const config = {
             appid: "78bc6d0c0f4219adc1f20316a758b44c",
             coord: { 
             	      "lat": -33.4372741,
					  "lon": -70.635462,
					}
			};


	const months      = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const days        = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const conditions  = ["Despejado","Nublado parcial","Nublado","Lluvia"];

    const icons 	  = { day:["assets/icons/sun-01.png",
					      "assets/icons/sun-02.png",
					      "assets/icons/sun-03.png",
					      "assets/icons/sun-04.png"
					     ],
				         night:[	   
					      "assets/icons/moon-01.png",
					      "assets/icons/moon-02.png",
					      "assets/icons/moon-03.png",
					      "assets/icons/moon-04.png",
					     ]
				        };

    var displayPlace     = document.getElementById("place");
	var displaycountry   = document.getElementById("country");
	var displaytime      = document.getElementById("time");
	var displaydate      = document.getElementById("date");
	var displaytemp      = document.getElementById("temp");
	var displayicon      = document.getElementById("icon");
	var displaycondition = document.getElementById("condition");


    var countrys = { 
    		 "CL":"Chile"
    };




	function displayInfo(data){

		let place = data.name;
		let country = countrys[data.sys.country];
		let temp = getTemp(data.main.temp);
		let condition = getCondition(data.dt, data.clouds, data.rain)

		this.place.textContent     = data.name;
		this.country.textContent   = countrys[data.sys.country];
		this.temp.textContent      = getTemp(data.main.temp);
		this.icon.src              = condition.icon;
		this.condition.textContent = condition.desc
	};


	function displayDate(){

	    let now  = new Date();
	    let time = getTime(now);
	    let date = getDate(now);
	   
	    this.time.textContent   = time;
		this.date.textContent   = date;
	};



	function getWeather(config){
		 let baseUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + config.coord.lat + "&lon=" + config.coord.lon + "&units=metric&appid=" + config.appid + "&lang=es";

		 fetch(baseUrl)
		    .then(function(response) {
		        return response.json();
		    })
		    .then(function(data) {
		    	displayInfo(data);
		    })
		    .catch(function(err) {
		        console.error(err);
		    });
	};


	function getTime(now){ 

	    let hour = now.getHours();
	    let min  = now.getMinutes();
	    let time = (hour < 10 ? '0' + hour : hour) + ':' + (min < 10 ?  '0' + min : min);    

	    return  time;
	};


	function getTemp(temp){

		let unit = "°C"

		return Math.round(temp) + unit;

	};



	function getCondition(date, sky, rain=null){
		let now       = new Date(date)
		let hours     = now.getHours();

		let skyCondition = sky.all === 0 ? 0 :
						   sky.all <= 50 ? 1 : 
						   rain == null ? 2 :
						   3
		let isDayTime = hours > 7 && hours < 20;
		let status = ( isDayTime ? icons.night : icons.day );

		let condition = {
			icon: status[skyCondition],
			desc: conditions[skyCondition]
		};
	
		return condition;

	}


	function getDate(now){

		let dayWeek = now.getDay();
		let day     = now.getDate();
		let month   = now.getMonth();
		let year    = now.getFullYear();
		let date    = ( days[dayWeek] + " " + day + " " + months[month] + " " + year )

		return date;

	};




	function init(){
		let oneMin = 60000;
		let tenMin = oneMin * 10;   //recomended time to make request in openweather

		getWeather(config);
		displayDate();

		setInterval(displayDate, oneMin);
		setInterval(getWeather(config), tenMin);
	};


	init();



}())


