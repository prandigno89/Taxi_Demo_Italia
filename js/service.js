var urlHub = {
	'prenotazione': 'a',
    'complessa': 'b',
    'annulla': 'c'
	};
/*
    Test http call:
    'prenotazione': 'https://ims.ingenico.it/IngenicoTaxi4040/TestJson',
	'complessa': 'https://ims.ingenico.it/IngenicoTaxi4040/TestComplessa',
	'annulla': 'https://ims.ingenico.it/IngenicoTaxi4040/TestAnnulla'
*/

var risultato;
var message;
var sigla;
var attesa;
var idcorsa;
var serial_number;


$(
	
	function(){	
		/*SETTING LINGUA ALTERNATIVA*/
        var lang='language/language.it';
        setLanguage(lang);
        //chiamo il meteo
        chiamaMeteo();
        
		//Servizio Tetrajs per raccolta seriale del terminale:
		var info = tetra.service({"service": 'local.desktopenv.settings', "namespace": 'ingenico.desktopenv'});
		info.connect();
		info.call("Information").success(function(r) { 
			//console.log("serial number: " + r.terminal.serialNumber);
			serial_number = r.terminal.serialNumber; 
			console.log("VARIABILE SERIALE: " + serial_number);
			$('#serial').html(serial_number);
													});
			
		
        					
		//inizializzo gli elementi come invisibili tranne la pagina 1:
		$('#page2').hide();
		$('#page3').hide();
		$('#page4').hide();
		$('#page5').hide();
		$('#page6').hide();
		$('#page7').hide();
		$('#page8').hide();
		
		//variabili per spostamenti in app (per routing).
		var a1 = $('#a1');
		var a2 = $('#a2');
		var a3 = $('#a3');
		var a4 = $('#a4');
		var b1 = $('#back1');
		var b2 = $('#back2');
		var b3 = $('#back3');
		var b4 = $('#back4');
		var b5 = $('#back5');
		
		var p1 = $('#prapida1');
		var p2 = $('#prapida2');
		var p3 = $('#annullo');
					
		
		//ROUTER DI VISUALIZZAZIONE PAGINE:
		a1.on('click', function(){ visualizza('#page1','#page2'); chiamaMeteo();});
		a2.on('click', function(){ visualizza('#page1','#page3'); chiamaMeteo();});
		a3.on('click', function(){ visualizza('#page1','#page8'); chiamaMeteo();});
		a4.on('click', function(){ visualizza('#page1','#page7'); });
		
		b1.on('click', function(){ visualizza('#page2','#page1'); });
		b2.on('click', function(){ visualizza('#page3','#page1'); });
		b3.on('click', function(){ visualizza('#page6','#page1'); });
		b4.on('click', function(){ visualizza('#page7','#page1'); });
		b5.on('click', function(){ visualizza('#page8','#page1'); });
		
		
		//funzione Prenotazione rapida di un taxi
		p1.on('click', function(){ 
		resetCampi();
		
		visualizza('#page2','#page4');
		chiamaTaxi('#page4');
			
		
		});
		//funzione prenotazione complessa di un taxi con opzioni
		p2.on('click', function(){
			resetCampi();
			//se ho selezionato almeno un opzione chiamo il taxi option
            var opzioni= $('#options').serializeArray();
			var toSend="";
            for(var i=0; i < opzioni.length; i++){
                //console.log(opzioni[i].name);
                if(opzioni[i].value="on"){
                    if(i>1){
                    toSend+= "%"+opzioni[i].name;
                    
                    }
                    else{
                        toSend+=opzioni[i].name;
                    }
                }
               
            }
            if(toSend!=""){
              
			visualizza('#page3','#page4');
			//alert("Selezionati:"+opzioni);
			chiamaTaxiOption('#page4',toSend);
			}else{
				
                alert("Nessuna opzione selezionata");
				visualizza('#page4','#page3');
			}	
		});
		p3.on('click', function(){
            resetCampi();
			visualizza('#page8','#page4');
			annullaUltimoTaxi('#page4',idcorsa);	
		});
	
		
		
				
	}
		
)

// Funzione per il cambio di visualizzazione della pagina:
function visualizza(p1,p2){
		
		//console.log(p1);
		//console.log(p2);
				
		$(p1).hide();
		$(p2).show();
		
		
	};

// Funzione per la lettura del file lingua e settaggio degli elementi in app
function setLanguage(languageFile){
    $.getJSON(languageFile ,function(data){
      
      var myarray= data;
   
    var i;
    for(i = 0; i < myarray.length; i++) {
     //console.log(myarray[i].value);
     $(myarray[i].id).html(myarray[i].value);
     
     
    }
       
      
  });      
};

// Funzione per la prenotazione di un taxi:	
function chiamaTaxi(pagina){
	visualizza(pagina,'#page6');
    
    var cars= ["Aquaris","Ansion","Arkanis","Atzerri","Balnab","Bamayar","Bespin","Carlac","Carida","Dandoran","Denon","Endor","Felucia","Hoth","Mustafar","Naboo","Phindar","Tatooine"];
    var timecar=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"];
    var selezioneAuto = getRandomInt(0,cars.length-1);
    var selezioneTempo = getRandomInt(0,timecar.length-1);
    var selezioneCorsa = getRandomInt(9999,20000);   
    
    console.log(selezioneTempo);
    
      $('#message').html("Ti ringraziamo per aver effettuato la prenotazione:");
      $('#sigla').html("TAXI: "+cars[selezioneAuto].toUpperCase());
	  $('#attesa').html("ATTESA: "+timecar[selezioneTempo]+" Minuti");
	  $('#idcorsa').html("ID CORSA: "+ selezioneCorsa);
      
      window.print(); 
};

// Funzione per la chiamata complessa di un taxi
function chiamaTaxiOption(pagina, opzioni){
		  visualizza(pagina,'#page6');
    
    var cars= ["Aquaris","Ansion","Arkanis","Atzerri","Balnab","Bamayar","Bespin","Carlac","Carida","Dandoran","Denon","Endor","Felucia","Hoth","Mustafar","Naboo","Phindar","Tatooine"];
    var timecar=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"];
    var selezioneAuto = getRandomInt(0,cars.length-1);
    var selezioneTempo = getRandomInt(0,timecar.length-1);
    var selezioneCorsa = getRandomInt(9999,20000);   
    
    console.log(selezioneTempo);
    
      $('#message').html("Ti ringraziamo per aver effettuato la prenotazione:");
      $('#sigla').html("TAXI: "+cars[selezioneAuto].toUpperCase());
	  $('#attesa').html("ATTESA: "+timecar[selezioneTempo]+" Minuti");
	  $('#idcorsa').html("ID CORSA: "+ selezioneCorsa);
      window.print();
       
        
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Funzione per l'annullamento ultima prenotazione:	
function annullaUltimoTaxi(pagina, corsa){
	        
        visualizza(pagina,'#page6');
			
			$('#message').html("L'ultima corsa è stata annullata");
			
			window.print();
        
};

function resetCampi(){
    
    $('#message').html("");
	$('#sigla').html("");
	$('#attesa').html("");
	$('#idcorsa').html("");
    $('#endmessage').html("");
    
    
}

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
               
    $('#meteo').html(img+descr);
    //stampo il risultato
    
    
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