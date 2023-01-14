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
  responsiveCanvas(x);
  x.addListener(responsiveCanvas);

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
            label: "Vols par mois",
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

  var map = L.map("graphique3").setView([0, 0], 2);

  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    }
  ).addTo(map);

  var data = "./assets/airports.csv";
  var lines = data.split("\n");
  var markers = [];
  for (var i = 1; i < lines.length; i++) {
    var parts = lines[i].split(",");
    if (i > 1) {
      markers.push([parts[0], Number(parts[18]), Number(parts[19])]);
    }
  }
  for (var i = 0; i < markers.length; i++) {
    var lat = markers[i][1];
    var lon = markers[i][2];
    var popupText = markers[i][0];

    var markerLocation = new L.LatLng(lat, lon);
    var marker = new L.Marker(markerLocation);
    map.addLayer(marker);

    marker.bindPopup(popupText);
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

$.ajax({
  url: '../assets/json/wikiplane.json',
  dataType: 'JSON',
  success: function (data) {
    // console.log(data.jsonWiki[0].Boeing777.constructeur);
    $.each(data.jsonWiki, function (val2) {
      // console.log(data.jsonWiki[val2].compagnie.nomCompagnie);
      select2.append('<option data-nom = "' + data.jsonWiki[val2].compagnie.nomCompagnie + '" value="' + data.jsonWiki[val2].constructeur + " " + data.jsonWiki[val2].modele + ',' + data.jsonWiki[val2].imageSrc + '">' + data.jsonWiki[val2].compagnie.nomCompagnie + '</option>');
    })
    $("select").on('change', function (e) {
      // console.log($(this).val());
      // $("#modeleAvion option").val($(this).val());
      let tab = $(this).val();
      tab = tab.split(",");
      console.log(tab);
      $("#modeleAvion option").html(tab[0]);
      $(".imageModele").attr('src', tab[1]);
      $("#compagnie").click(function(){
        $(".imageModele").animate({opacity: '1',});
      });
    })
  },
  error: function () {
    $select.html('<option value="-1">Aucune compagnie disponible</option>');
    $select2.html('<option value="-1">Aucun modèle disponible</option>');
  },

});