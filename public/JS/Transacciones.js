function MostrarTransaccion(){
     document.getElementById("enviadas").style.display="block";
     document.getElementById("recibidas").style.display="none";
   
}

function MostrarTransaccion2(){
     document.getElementById("recibidas").style.display="block";
     document.getElementById("enviadas").style.display="none";
}
   
   
   
function Main(){
document.getElementById("BEnviados").onclick =  function() {MostrarTransaccion()};
document.getElementById("BRecibidos").onclick =  function() {MostrarTransaccion2()};
}
   
Main();