window.onload = function () {
  // Bar chart
  new Chart(document.getElementById("graphique3"), {
    type: "line",
    data: {
      labels: [6, 8, 10, 12, 14, 16, 18, 20, 22],
      datasets: [
        {
          data: [86, 114, 106, 106, 107, 111, 133, 221, 783],
          label: "Afrique",
          borderColor: "#3e95cd",
          fill: false,
        },
        {
          data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700],
          label: "Asie",
          borderColor: "#8e5ea2",
          fill: false,
        },
        {
          data: [168, 170, 178, 190, 203, 276, 408, 547, 675],
          label: "Europe",
          borderColor: "#3cba9f",
          fill: false,
        },
        {
          data: [40, 20, 10, 16, 24, 38, 74, 167, 508],
          label: "Amérique Latine",
          borderColor: "#e8c3b9",
          fill: false,
        },
        {
          data: [6, 3, 2, 2, 7, 26, 82, 172, 312],
          label: "Amérique du Nord",
          borderColor: "#c45850",
          fill: false,
        },
      ],
    },
    options: {
      title: {
        display: false,
        text: "Nombre de vols par continent",
      },
      labels: {
        // This more specific font property overrides the global property
        font: {
            size: 30
        }
    }
    },
  });
};

$(window).on("load", function () {
  $(".loader").fadeTo(3000, 1).fadeOut(200);
});

$(document).ready(function () {
  $.ajax({
    url: "https://app.goflightlabs.com/flights?access_key=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiN2IxMThjZjk1NjQ4NGQ5ZTUyZWNjZjk5Mjk5OWVjZGZmYzg2NTczNzJlNGY5Mzk4M2M2YTRiNzliZjJlYjA3ZjM5N2YzMmFiNDMxOTQxZDkiLCJpYXQiOjE2NzMyNzA0NTAsIm5iZiI6MTY3MzI3MDQ1MCwiZXhwIjoxNzA0ODA2NDUwLCJzdWIiOiIxOTUyNiIsInNjb3BlcyI6W119.g9EG39CVsbhQo67Q45x_R1Ml80dnXOf1CgA1W6gOZSKkz65YO5wZNvWquBtsJrpGSlup1vCKtS_i7WtGDvy2xg&limit=10",
    data: { sem: 1 },
    dataType: "json",
    success: function (res) {
      const iataCode = res.data.aircraft.regNumber.map((iataCode) => iataCode.regNumber);
      const arrival = res.data.arrival.icaoCode.map((arrival) => arrival.icaoCode);
      const departure = res.data.departure.icaoCode.map((departure) => departure.icaoCode);
      const flightNumber = res.data.flight.icaoNumber.map((flightNumber) => flightNumber.icaoNumber);

      console.log(Object.values(compte));
      c = new Chart(document.getElementById("graphique2"), {
        type: "bar",
        data: {
          labels: fullname,
          datasets: [
            {
              label: "salaire annuel",
              data: iataCode,
            },
          ],
        },

        options: {
          title: {
            display: true,
            text: "salaires",
          },
          scales: {
            y: {
              min: 0,
            },
          },
        },
      });

      //Le deuxiÃ¨me graphe (Ã¢ges)
      // En abscisse les Ã¢ges triÃ©s

      d = new Chart("ages", {
        type: "bar",
        data: {
          labels: lesages.sort(),
          datasets: [
            {
              label: "rÃ©partition par Ã¢ge",
              data: Object.values(compte),
            },
          ],
        },

        options: {
          title: {
            display: true,
            text: "salaires",
          },
          scales: {
            y: {
              min: 0,
            },
          },
        },
      });
      c.update();
      d.update(); //On met Ã  jour le canvas
    }, //fin du success
  }); //fin ajax
});

const apiUrl =
  "https://public.opendatasoft.com/api/records/1.0/search/?dataset=prix_des_carburants_j_7&q=&facet=cp&facet=pop&facet=city&facet=automate_24_24&facet=fuel&facet=shortage&facet=update&facet=services&facet=brand&refine.pop=R";

fetch(apiUrl) //Récupere les données de l'API
  .then((res) => res.json()) // Permet de lire le fichier.json
  .then((data) => {
    console.log(data);
    const ctx = document.getElementById("prixVille").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          data.records[0].fields.city,
          data.records[1].fields.city,
          data.records[2].fields.city,
          data.records[3].fields.city,
          data.records[4].fields.city,
          data.records[5].fields.city,
        ],
        datasets: [
          {
            label: "Ventes",
            data: [
              data.records[0].fields.price_gazole,
              data.records[1].fields.price_gazole,
              data.records[2].fields.price_gazole,
              data.records[3].fields.price_gazole,
              data.records[4].fields.price_gazole,
              data.records[5].fields.price_gazole,
            ], // Les données seront remplies lorsque la première requête à l'API sera effectuée
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  })
  .catch((error) => {
    console.error(error);
  });
