window.onload = function () {
  function responsiveCanvas(x) {
    if (x.matches) {
      var canvas = document.getElementById("graphique2");
      var heightRatio = 1.5;
      canvas.height = canvas.width * heightRatio;
      canvas.margin = "5vh";
      document.getElementById("canvas1").style.height = "auto";
    } else {
      var canvas = document.getElementById("graphique2");
      var heightRatio = 1.5;
      canvas.height = canvas.width * heightRatio;
    }
  }

  var x = window.matchMedia("(max-width: 1192px)");
  responsiveCanvas(x); // Call listener function at run time
  x.addListener(responsiveCanvas); // Attach listener function on state changes

  const indicators = document.querySelectorAll(".indicator");
const sections = document.querySelectorAll("section");

const resetCurrentActiveIndicator = () => {
  const activeIndicator = document.querySelector(".active");
  activeIndicator.classList.remove("active");
};

const onSectionLeavesViewport = (section) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          resetCurrentActiveIndicator();
          const element = entry.target;
          const indicator = document.querySelector(`a[href='#${element.id}']`);
          indicator.classList.add("active");
          return;
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.75
    }
  );
  observer.observe(section);
};

indicators.forEach((indicator) => {
  indicator.addEventListener("click", function (event) {
    event.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
    resetCurrentActiveIndicator();
    this.classList.add("active");
  });
});

sections.forEach(onSectionLeavesViewport);


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

    const requete2 = await fetch(
      "https://airlabs.co/api/v9/schedules?api_key=3ad9a21f-89ba-4fdb-85d8-3fb7767bf5a8&dep_iata=LAX"
    );
    console.log(requete2);
    const response2 = await requete2.json();
    console.log(response2);
    length = response2.response.length;
    console.log(length);

    labels = [];
    values = [];
    console.log(labels);
    for (i = 0; i < 10; i++) {
      labels.push(response2.response[i].aircraft_icao);
      values.push(response2.response[i].duration);
    }

    new Chart(document.getElementById("graphique2"), {
      type: "bar-chart",
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
};

$(window).on("load", function () {
  $(".loader").fadeTo(1500, 1).fadeOut(300);
  setTimeout(function () {
    $("body").css("overflow", "visible");
  }, 1500);
});
