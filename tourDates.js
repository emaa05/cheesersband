const btnDisable = document.getElementById("botonTicket");

let tickets = {
    "River" : 1,
    "Boca" : 80,
    "Velez": 50,
}

function getTickets(estadio) {
    if (tickets[estadio] > 0 ) {
        tickets[estadio]--;
        swal ("You bought a ticket!", "", "success")
        if (tickets[estadio] === 0) {
        }
      } else {
        swal ("Error" , "Tickets are sold out!" , "error")
      }
     console.log(tickets); 
    }
  

