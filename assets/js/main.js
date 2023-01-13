window.onload = function () {
  function responsiveCanvas(x) {
    if (x.matches) {
      var canvas = document.getElementById("graphique2");
      var heightRatio = 1.5;
      canvas.height = canvas.width * heightRatio;
      canvas.margin = "5vh";
      document.getElementById("canvas2").style.height = "auto";
    } else {
      var canvas = document.getElementById("graphique2");
      var heightRatio = 1.5;
      canvas.height = canvas.width * heightRatio;
    }
  }

  var x = window.matchMedia("(max-width: 1192px)");
  responsiveCanvas(x); // Call listener function at run time
  x.addListener(responsiveCanvas); // Attach listener function on state changes

  getData();

  async function getData() {
    const requete = await fetch(
      "https://airlabs.co/api/v9/routes?api_key=dd764152-cdbc-4b0e-8100-3a81aba2a034&dep_iata=CDG"
    );
    console.log(requete);
    const response = await requete.json();
    console.log(response);
    length = response.response.length;
    console.log(length);

    labels = [];
    values = [];
    console.log(labels);
    for (i = 0; i < 50; i++) {
      labels.push(response.response[i].aircraft_icao);
      values.push(response.response[i].duration);
    }

    Chart.defaults.font.size = 18;
    Chart.defaults.color = '#fff';
    new Chart(document.getElementById("graphique1"), {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Vols",
            backgroundColor: [
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
              "#CD5C5C",
              "#40E0D0",
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
            ],
            data: values,
          },
        ],
      },
      options: {
        responsive: true,
        legend: { display: false },
      },
    });

    const requete2 = await fetch(
      "https://airlabs.co/api/v9/routes?api_key=dd764152-cdbc-4b0e-8100-3a81aba2a034&arr_iata=CDG"
    );
    console.log(requete2);
    const response2 = await requete2.json();
    console.log(response2);
    length = response2.response.length;
    console.log(length);

    labels = [];
    values = [];
    console.log(labels);
    for (i = 0; i < 50; i++) {
      labels.push(response2.response[i].flight_iata);
      values.push(response2.response[i].counter);
    }

    Chart.defaults.font.size = 18;
    Chart.defaults.color = '#fff';
    new Chart(document.getElementById("graphique2"), {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Vols par semaine",
            backgroundColor: [
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
              "#CD5C5C",
              "#40E0D0",
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
            ],
            data: values,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
};

$(window).on("load", function () {
  $(".loader").fadeTo(1500, 1).fadeOut(300);
  setTimeout(function () {
    $("body").css("overflow", "visible");
  }, 1500);
});

// WikiPlane Dropdown

select = $('#modeleAvion');
select2 = $('#compagnie');
specsLi = $('#specs');

$.ajax({
    url: '../assets/json/wikiplane.json',
    dataType:'JSON',
    success:function(data){
      // console.log(data.jsonWiki[0].Boeing777.constructeur);
        select.html('');
        $.each(data.jsonWiki, function (val) {
          console.log(data.jsonWiki[val].Boeing777.constructeur);
            select.append('<option id="' + data.jsonWiki[val].Boeing777.idAvion + '">' + data.jsonWiki[val].Boeing777.constructeur + " " + data.jsonWiki[val].Boeing777.modele + '</option>');
        })
    },
    error:function(){
        $select.html('<option id="-1">Aucune compagnie disponible</option>');
    },

});

$.ajax({
  url: '../assets/json/wikiplane.json',
  dataType:'JSON',
success:function(data2){
  console.log(data2.jsonWiki[0].compagnie.nomCompagnie);
    select2.html('');
    $.each(data2.jsonWiki, function (val2) {
      // console.log(data2.jsonWiki[val2].compagnie.nomCompagnie);
        select2.append('<option id="' + data2.jsonWiki[val2].compagnie.idCompagnie + '">' + data2.jsonWiki[val2].compagnie.nomCompagnie + '</option>');
    })
},
error:function(){
    $select2.html('<option id="-1">Aucune compagnie disponible</option>');
}
});

$.ajax({
  url: '../assets/json/wikiplane.json',
  dataType:'JSON',
success:function(data3){
  // console.log(data3.jsonWiki[0].compagnie.nomCompagnie);
    specsLi.html('');
    $.each(data3.jsonWiki, function (val3) {
      // console.log(data3.jsonWiki[val3].compagnie.nomCompagnie);
        specsLi.append('<li id="' + data3.jsonWiki[val3].Boeing777.idAvion + '">' + data3.jsonWiki[val3].Boeing777.specifications.longueur + '</li>');
        specsLi.append('<li id="' + data3.jsonWiki[val3].Boeing777.idAvion + '">' + data3.jsonWiki[val3].Boeing777.specifications.envergure + '</li>');
        specsLi.append('<li id="' + data3.jsonWiki[val3].Boeing777.idAvion + '">' + data3.jsonWiki[val3].Boeing777.specifications.nbSieges + '</li>');
        specsLi.append('<li id="' + data3.jsonWiki[val3].Boeing777.idAvion + '">' + data3.jsonWiki[val3].Boeing777.specifications.vitesse + '</li>');
        specsLi.append('<li id="' + data3.jsonWiki[val3].Boeing777.idAvion + '">' + data3.jsonWiki[val3].Boeing777.specifications.typeMoteur + '</li>');
    })
},
error:function(){
    $specsLi.html('<li id="-1">Aucune compagnie disponible</li>');
}
});