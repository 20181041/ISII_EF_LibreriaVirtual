
function Filtro1(){
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("Input");
  filter = input.value.toUpperCase();
  table = document.getElementById("TablaCarrito");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
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
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("Select");;
  filter = input.value;
  table = document.getElementById("TablaCarrito");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[4];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

 function Filtro3(){
     var input, filter, table, tr, td, i, txtValue;
     input = document.getElementById("Select2");;
     filter = input.value;
     table = document.getElementById("TablaCarrito");
     tr = table.getElementsByTagName("tr");
   
     // Loop through all table rows, and hide those who don't match the search query
     for (i = 0; i < tr.length; i++) {
       td = tr[i].getElementsByTagName("td")[5];
       if (td) {
         txtValue = td.textContent || td.innerText;
         if (txtValue.indexOf(filter) > -1) {
           tr[i].style.display = "";
         } else {
           tr[i].style.display = "none";
         }
       }
     }
}

