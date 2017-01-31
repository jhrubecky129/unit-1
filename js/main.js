function initialize(){
    cities();
    addEvents();
    addColumns(citiesObj);
};

function cities(){

    var citiesObj = {
      'Madison' : 233209,
      'Milwaukee' : 594833,
      'Green Bay' : 104057,
      'Superior' : 27244
    };

    $('#mydiv').append('<table><tr id="headerRow">');
    $('#headerRow').append('<th>City</th>');
    $('#headerRow').append('<th>Population</th>');

    for (var cityKey in citiesObj){
      var htmlString = '<tr><td>' + cityKey + '</td><td>' + citiesObj[cityKey]+ '</td>';
      $('table').append(htmlString);
    };

    var mydiv = document.getElementById("#mydiv");
    mydiv.appendChild('#table');
};
//DEBUG
function addColumns(cityPop){

    $('tr').each(function(i){

    	if (i == 0){

    		$(this).apend('<th>City Size</th>');
    	} else {

    		var citySize;

    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';

    		} else if (cityPop[i-1].population < 500000){
    			citysize = 'Medium';

    		} else {
    			citySize = 'Large';
    		};

    		$this.append('<td' + citySize + '</td>');
    	};
    });
};

function addEvents(){

	$('#table').mouseover(function(){

		var color = "rgb(";

		for (var i=0; i<3; i++){

			var random = Math.round(Math.random() * 255);

			color += "random";

			if (i<2){
				color += ",";

			} else {
				color += ")";
      }
		};

		$(this).css('color', color);
	});

	function clickme(){

		alert('Hey, you clicked me!');
	};

	$('table').on('click', clickme());
};

window.onload = initialize();
