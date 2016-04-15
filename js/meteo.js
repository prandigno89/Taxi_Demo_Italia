var key = "3514e99dafd840c206746328103ff0a9";
$(//start zepto
	
	function(){
        
        //$('#meteo').on('click', function(){chiamaMeteo()});
        var p1 = $('#prapida1');
		var p2 = $('#prapida2');
        p1.on('click', function(){ chiamaMeteo()});
        p2.on('click', function(){ chiamaMeteo()});		
    }
    
       
    
);//end zepto

//Funzione per la chiamata meteo
function chiamaMeteo(){
    var url = "https://ims.ingenico.it/IngenicoTaxi4040/TestMeteo";
    $.getJSON(url, function(data){
    //console.log(data)
    var city = data.name;
    var descrizione = data.weather[0].description;
    var icona = data.weather[0].icon;
    var temperatura = data.main.temp;
    temperatura=Math.floor(temperatura);

    console.log(city + ", "+ descrizione + ", " + icona + ", "+ temperatura);
    var ico="src=\"./icone/default.png\"";
    console.log(icona);
   
    if(icona!=null){
        
    var ico= selectIcon(icona); 
    }
       
    var img = "<p><img class=\"meteo_icon\""+ ico +">";   
    var descr="<p>"+city+"<br>"+descrizione+"<br>"+temperatura+" &deg;C</p>";
               
    $('#esito').html(img+descr);
      // window.print();
    
})


    
}//fine chiamaMeteo


function selectIcon(ico){
    
    console.log("Passato:"+ico);
    console.log(typeof(ico));
    var daRitornare="src=\"./icone/default.png\"";
    var test=ico.charAt(ico.length-1);
    //icone del giorno
    //if(test.endsWith('d')){
    if(ico.charAt(ico.length-1)==='d'){
    switch(ico){
            case("01d"): 
            daRitornare = "src=\"./icone/day/01d.png\"";
            break;
            case("02d"): 
             daRitornare = "src=\"./icone/day/02d.png\"";
            break;
            case("03d"): 
             daRitornare = "src=\"./icone/day/03d.png\"";
            break;
            case("04d"): 
             daRitornare = "src=\"./icone/day/04d.png\"";
            break;
             case("09d"): 
             daRitornare = "src=\"./icone/day/09d.png\"";
            break;
              case("10d"): 
             daRitornare = "src=\"./icone/day/10d.png\"";
            break;
              case("11d"): 
             daRitornare = "src=\"./icone/day/11d.png\"";
            break;
              case("13d"): 
             daRitornare = "src=\"./icone/day/13d.png\"";
            break;
              case("50d"): 
             daRitornare = "src=\"./icone/day/50d.png\"";
                       
        default: 
        daRitornare = "src=\"./icone/default.png\"";
    }
    }
    //icone della notte
    else{
        
         switch(ico){
        case("01n"): 
            daRitornare = "src=\"./icone/night/01n.png\"";
            break;
          case("02n"): 
             daRitornare = "src=\"./icone/night/02n.png\"";
            break;
            case("03n"): 
             daRitornare = "src=\"./icone/night/03n.png\"";
            break;
            case("04n"): 
             daRitornare = "src=\"./icone/night/04n.png\"";
            break;
             case("09n"): 
             daRitornare = "src=\"./icone/night/09n.png\"";
            break;
              case("10n"): 
             daRitornare = "src=\"./icone/night/10n.png\"";
            break;
              case("11n"): 
             daRitornare = "src=\"./icone/night/11n.png\"";
            break;
              case("13n"): 
             daRitornare = "src=\"./icone/night/13n.png\"";
            break;
              case("50n"): 
             daRitornare = "src=\"./icone/night/50n.png\"";
            break;
                          
        default: 
        daRitornare = "src=\"./icone/default.png\"";
    }
        
        
    }
    
    return daRitornare;
    
}