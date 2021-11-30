function Filtro1(){
  

  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("Buscador");
  filter = input.value.toUpperCase();
  table = document.getElementById("TablaCarrito");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    console.log(td)
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }

}


function Filtro2(){
  
  const libros = document.getElementById("TablaCarrito").getElementsByClassName("tituloLibro")
  console.log(libros)
  
 }

 function Comparar(array){
  array.sort( function( a , b){
    return a.ID - b.ID;
});
 }

function Main(){
  document.getElementById("Buscador").onchange =  function() {Filtro1()};

}

Main();