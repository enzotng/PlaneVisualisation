window.onload = function () {
  getData();

  async function getData() {
    const requete = await fetch(
      "https://airlabs.co/api/v9/schedules?api_key=3ad9a21f-89ba-4fdb-85d8-3fb7767bf5a8&dep_iata=LAX"
    );
    console.log(requete);
    const response = await requete.json();
    console.log(response);
    length = response.response.length;
    console.log(length);

    labels = [];
    values = [];
    console.log(labels);
    for (i = 0; i < 10; i++) {
      labels.push(response.response[i].aircraft_icao);
      values.push(response.response[i].duration);
    }

    new Chart(document.getElementById("graphique2"), {
      type: "line",
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
        scales: {
          yAxes: [
            {
              ticks: {
                fontSize: 20,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontSize: 20,
              },
            },
          ],
        },
      },
    });

    const requete = await fetch(
      "https://airlabs.co/api/v9/schedules?api_key=3ad9a21f-89ba-4fdb-85d8-3fb7767bf5a8&dep_iata=LAX"
    );
    console.log(requete);
    const response = await requete.json();
    console.log(response);
    length = response.response.length;
    console.log(length);

    labels = [];
    values = [];
    console.log(labels);
    for (i = 0; i < 10; i++) {
      labels.push(response.response[i].aircraft_icao);
      values.push(response.response[i].duration);
    }

    new Chart(document.getElementById("graphique2"), {
      type: "line",
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
        scales: {
          yAxes: [
            {
              ticks: {
                fontSize: 20,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontSize: 20,
              },
            },
          ],
        },
      },
    });
  }

$(window).on("load", function () {
  $(".loader").fadeTo(3000, 1).fadeOut(200);
});
