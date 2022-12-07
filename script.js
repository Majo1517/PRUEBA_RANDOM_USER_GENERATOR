$(document).ready(function () {

    var url = "https://randomuser.me/api/?results=25";
    var p = "";
    var radioValue;
    var selectedNationality;
    var loadMore;

    fetchInformation(url);

    /*Filtro por genero*/
    $("input[type='radio']").click(function () {
        radioValue = $("input[name='gender']:checked").val();
        selectedNationality = $('#nationality :selected').text();
        $("#result").empty();
        url = "https://randomuser.me/api/?results=10&gender=" + radioValue + "&nat=" + selectedNationality;
        if (radioValue) {
            fetchInformation(url);
        }
    });

    /*Filtro por pais*/
    $('#nationality').on('change', function () {
        var p = "";
        $("#result").empty();
        selectedNationality = $('#nationality :selected').text();
        url = "https://randomuser.me/api/?results=10&gender=" + radioValue + "&nat=" + selectedNationality;
        fetchInformation(url);
    });

    function fetchInformation(url) {
        fetch(url)
            .then((response) => response.json())
            .then(function (data) {

                data.results.forEach(person => {
                 
                    p = `<table id="myTable" class="well" >
                            <tr>
                                <th></th>
                                <th></th>                                
                                <th>Nombre</th>
                                <th></th> 
                                <th>Correo</th>
                                <th></th>
                                <th>Telefono</th>
                                <th></th>
                                <th>Nacionalidad</th>
                                <th></th>
                                <th>Ciudad</th>
                                <th></th>
                                <th>Contraseña</th>
                            </tr>
                        
                            <tr>
                                <td><img src="${person.picture.large}"><td>
                                <td>${person.name.first}<td>
                                <td>${person.email}<td>
                                <td>${person.phone}<td>
                                <td>${person.nat}<td>
                                <td>${person.location.city}<td>
                                <td>${person.login.password} <td>
                            </tr>  
                    </table>`;
                    $("#result").append(p);
                    
                });
                
                loadMore = '<button id="loadmore" class="btn btn-primary">Generar usuarios</button>';

                $("#result").append(loadMore);

                $('#loadmore').on('click', function () {
                    fetchInformation(url);
                    $(this).remove();
                });


            })
    }

    $(document).ready(function(){
        $("#results").jPaginate();
    });

});

/*
// get the table element
var $table = document.getElementById("myTable"),
// number of rows per page
$n = 5,
// number of rows of the table
$rowCount = $table.rows.length,
// get the first cell's tag name (in the first row)
$firstRow = $table.rows[0].firstElementChild.tagName,
// boolean var to check if table has a head row
$hasHead = ($firstRow === "TH"),
// an array to hold each row
$tr = [],
// loop counters, to start count from rows[1] (2nd row) if the first row has a head tag
$i,$ii,$j = ($hasHead)?1:0,
// holds the first row if it has a (<TH>) & nothing if (<TD>)
$th = ($hasHead?$table.rows[(0)].outerHTML:"");
// count the number of pages
var $pageCount = Math.ceil($rowCount / $n);
// if we had one page only, then we have nothing to do ..
if ($pageCount > 1) {
	// assign each row outHTML (tag name & innerHTML) to the array
	for ($i = $j,$ii = 0; $i < $rowCount; $i++, $ii++)
		$tr[$ii] = $table.rows[$i].outerHTML;
	// create a div block to hold the buttons
	$table.insertAdjacentHTML("afterend","<div id='buttons'></div");
	// the first sort, default page is the first one
	sort(1);
}

// ($p) is the selected page number. it will be generated when a user clicks a button
function sort($p) {
	/* create ($rows) a variable to hold the group of rows
	** to be displayed on the selected page,
	** ($s) the start point .. the first row in each page, Do The Math
	
	var $rows = $th,$s = (($n * $p)-$n);
	for ($i = $s; $i < ($s+$n) && $i < $tr.length; $i++)
		$rows += $tr[$i];
	
	// now the table has a processed group of rows ..
	$table.innerHTML = $rows;
	// create the pagination buttons
	document.getElementById("buttons").innerHTML = pageButtons($pageCount,$p);
	// CSS Stuff
	document.getElementById("id"+$p).setAttribute("class","active");
}


// ($pCount) : number of pages,($cur) : current page, the selected one ..
function pageButtons($pCount,$cur) {
	/* this variables will disable the "Prev" button on 1st page
	   and "next" button on the last one 
	var	$prevDis = ($cur == 1)?"disabled":"",
		$nextDis = ($cur == $pCount)?"disabled":"",
		/* this ($buttons) will hold every single button needed
		** it will creates each button and sets the onclick attribute
		** to the "sort" function with a special ($p) number..
		
		$buttons = "<input type='button' value='<< Prev' onclick='sort("+($cur - 1)+")' "+$prevDis+">";
	for ($i=1; $i<=$pCount;$i++)
		$buttons += "<input type='button' id='id"+$i+"'value='"+$i+"' onclick='sort("+$i+")'>";
	$buttons += "<input type='button' value='Next >>' onclick='sort("+($cur + 1)+")' "+$nextDis+">";
	return $buttons;
}

var obj = [
    { number: "Number 1"},
    { number: "Number 2"},
    { number: "Number 3"},
    { number: "Number 4"},
    { number: "Number 5"},
    { number: "Number 6"},
    { number: "Number 7"},
    { number: "Number 8"},
    { number: "Number 9"},
    { number: "Number 10"},
    { number: "Number 11"},
    { number: "Number 12"},
    { number: "Number 13"},
    { number: "Number 14"},
    { number: "Number 15"}
    ];
    var current_page = 1;
    var obj_per_page = 3;
    function totNumPages()
    {
        return Math.ceil(obj.length / obj_per_page);
    }
    
    function prevPage()
    {
        if (current_page > 1) {
            current_page--;
            change(current_page);
        }
    }
    function nextPage()
    {
        if (current_page < totNumPages()) {
            current_page++;
            change(current_page);
        }
    }
    function change(page)
    {
        var btn_next = document.getElementById("btn_next");
        var btn_prev = document.getElementById("btn_prev");
        var listing_table = document.getElementById("TableList");
        var page_span = document.getElementById("page");
        if (page < 1) page = 1;
        if (page > totNumPages()) page = totNumPages();
        listing_table.innerHTML = "";
        for (var i = (page-1) * obj_per_page; i < (page * obj_per_page); i++) {
            listing_table.innerHTML += obj[i].number + "<br>";
        }
        page_span.innerHTML = page;
        if (page == 1) {
            btn_prev.style.visibility = "hidden";
        } else {
            btn_prev.style.visibility = "visible";
        }
        if (page == totNumPages()) {
            btn_next.style.visibility = "hidden";
        } else {
            btn_next.style.visibility = "visible";
        }
    }
    window.onload = function() {
        change(1);
    }; 
*/