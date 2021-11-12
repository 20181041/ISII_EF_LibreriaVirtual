
function Filtro1(){
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("Input");
  filter = input.value;
  table = document.getElementById("TablaCarrito");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    console.log(td[0])
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
