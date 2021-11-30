function Filtro1(){
  console.log("HOLAAAAAAAA")
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("Buscador");
  console.log(input)
  filter = input.value;
  console.log(filter)
  table = document.getElementById("TablaCarrito");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query

  /*
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    console.log(td[1])
    if (td) {
      txtValue = td.textContent || td.innerText;
     
      if (txtValue.indexOf(filter) > -1) {
        tr[i].style.display = "";
        
      } else {
        tr[i].style.display = "none";
      }
    }
  }*/
 const libros = document.getElementById("TablaCarrito").getElementsByClassName("tituloLibro")
 console.log(libros[0].innerHTML)
}


function Main(){
  document.getElementById("Buscador").onchange =  function() {Filtro1()};
  console.log("HOLAAAAAAAAAA")
}

Main();