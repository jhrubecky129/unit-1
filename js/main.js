//initialize function called when the script loads
function initialize(){
	cities();
    addEvents();

    //jsAjax();
    jQueryAjax();
    debugAjax();
};

//function to create a table with cities and their populations
function cities(){
	//define two arrays for cities and population
	var cityPop = [
		{
			city: 'Madison',
			population: 233209
		},
		{
			city: 'Milwaukee',
			population: 594833
		},
		{
			city: 'Green Bay',
			population: 104057
		},
		{
			city: 'Superior',
			population: 27244
		}
	];

	//append the table element to the div
	$("#mydiv").append("<table>");

	//append a header row to the table
	$("table").append("<tr>");

	//add the "City" and "Population" columns to the header row
	$("tr").append("<th>City</th><th>Population</th>");

	//loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        $("table").append(rowHtml);
    };

    addColumns(cityPop);
};
//adds a column to table
function addColumns(cityPop){
		//for every table row add a city size
    $('tr').each(function(i){

    	if (i == 0){
				//add the column header
    		$(this).append('<th>City Size</th>');
    	} else {
            //city size values
    		var citySize;
            //if the population at specified index is less than 100000 the city is small
    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';
            //if the population at specified index is greater than 500000 the city is large
    		}else if (cityPop[i-1].population > 500000){
    			citysize = 'Large';
            //otherwise the city is considered medium
    		} else {
    			citySize = 'Medium';
    		};
//add the corresponding city size value to each row
    		$(this).append('<td>' + citySize + '</td>');
    	};
    });
};
//makes a pop up box on click and changes the color of the table on mousemover
function addEvents(){
	//when the table is mousedover make it change color
	$('table').mouseover(function(){
        //set the color variable
		var color = "rgb(";
        //loop to add different commponents to color variable
		for (var i=0; i<3; i++){

			var random = Math.round(Math.random() * 255);

			color += random; //.toString();
            //if not all of the components are added to the color variable place a comma before the next one is added
			if (i<2){
				color += ",";
            //otherwise close it was a parenthesis
			} else {
				color += ")";
			}
		};
        //print the color to the console
		console.log(color);
        //change the table's color to the color represented by the color variable
		$(this).css('color', color);
	});
    //make pop up on click
	function clickme(){
        //the message in the pop up
		alert('Hey, you clicked me!');
	};
    //alert only happens when the table is clicked
	$('table').on('click', clickme);
};

//AJAX function without jQuery
function jsAjax(){
    // Step 1: Create the request
    var ajaxRequest = new XMLHttpRequest();

    //Step 2: Create an event handler to send received data to a callback function
    ajaxRequest.onreadystatechange = function(){
        if (ajaxRequest.readyState === 4){
            callback(ajaxRequest.response);
        };
    };

    //Step 3: Open the server connection
    ajaxRequest.open('GET', 'data/MegaCities.geojson', true);

    //Step 4: Set the response data type
    ajaxRequest.responseType = "json";

    //Step 5: Send the request
    ajaxRequest.send();
};

//define AJAX function
function jQueryAjax(){
    //define a variable to hold the data
    var mydata;

    //basic jQuery ajax method
    $.ajax("data/MegaCities.geojson", {
        dataType: "json",//the response data type
        success: function(response){//what happends once the request is successful
            mydata = response;

            //check the data
            console.log(mydata);
        }
    });

    //check the data. This proves that the data cannot be accessed outside the callback function
    console.log(mydata);
};

//define callback function
function callback(response){
    //tasks using the data go here
    console.log(response);
    //console.log(JSON.stringify(response));
};

function debugCallback(response){
	
	$('#mydiv').append('<br>GeoJSON data:<br>' + JSON.stringify(response));
};

//jQuery AJAX function
function debugAjax(){
	
	var mydata;//create mydata variable
    //initialize my data to the data in MegaCities
	mydata = $.ajax("data/MegaCities.geojson", {
		dataType: "json",//set the data type
		success: function(response){//what happens once data is returned
			//call debugCallback with mydata
			debugCallback(mydata);
            //return mydata;
		}
	});
    //try to access my data outside of debugCallback
	//$('#mydiv').append('<br>GeoJSON data:<br>' + JSON.stringify(mydata));
};

//$('#mydiv').append('GeoJSON data: ' + JSON.stringify());

//call the initialize function when the document has loaded
$(document).ready(initialize);
