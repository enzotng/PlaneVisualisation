window.onload = function () {
  // Bar chart
  new Chart(document.getElementById("graphique3"), {
    type: "line",
    data: {
      labels: [8, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
      datasets: [
        {
          data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
          label: "Africa",
          borderColor: "#3e95cd",
          fill: false,
        },
        {
          data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
          label: "Asia",
          borderColor: "#8e5ea2",
          fill: false,
        },
        {
          data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
          label: "Europe",
          borderColor: "#3cba9f",
          fill: false,
        },
        {
          data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
          label: "Latin America",
          borderColor: "#e8c3b9",
          fill: false,
        },
        {
          data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
          label: "North America",
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
      //Remarque : le data de res.data, c'est parce que le premier
      //champ du jeu de rÃ©sultat s'appelle data. C'est dedans que tout se trouve.
      const salary = res.data.map((amount) => amount.employee_salary);
      const fullname = res.data.map((name) => name.employee_name);
      const ages = res.data.map((name) => name.employee_age);

      // On crÃ©Ã© un vecteur de valeurs en comptant le nombre
      // d'occurrences de certains item : en l'occurrence
      // On regarde combien d'employÃ©s ont un Ã¢ge donnÃ©e.
      // Ca marche aussi quand l'indice est une chaÃ®ne de
      //caractÃ¨res
      const compte = {};
      const lesages = [];
      for (const age of ages) {
        if (compte[age]) compte[age]++;
        else {
          lesages.push(age);
          compte[age] = 1;
        }
      }

      console.log(Object.values(compte));
      c = new Chart("salaires", {
        type: "bar",
        data: {
          labels: fullname,
          datasets: [
            {
              label: "salaire annuel",
              data: salary,
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
