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

  //   const indicators = document.querySelectorAll(".indicator");
  // const sections = document.querySelectorAll("section");

  // const resetCurrentActiveIndicator = () => {
  //   const activeIndicator = document.querySelector(".active");
  //   activeIndicator.classList.remove("active");
  // };

  // const onSectionLeavesViewport = (section) => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           resetCurrentActiveIndicator();
  //           const element = entry.target;
  //           const indicator = document.querySelector(`a[href='#${element.id}']`);
  //           indicator.classList.add("active");
  //           return;
  //         }
  //       });
  //     },
  //     {
  //       root: null,
  //       rootMargin: "0px",
  //       threshold: 0.75
  //     }
  //   );
  //   observer.observe(section);
  // };

  // indicators.forEach((indicator) => {
  //   indicator.addEventListener("click", function (event) {
  //     event.preventDefault();
  //     document
  //       .querySelector(this.getAttribute("href"))
  //       .scrollIntoView({ behavior: "smooth" });
  //     resetCurrentActiveIndicator();
  //     this.classList.add("active");
  //   });
  // });

  // sections.forEach(onSectionLeavesViewport);

  getData();

  async function getData() {
    const requete = await fetch(
      // "https://airlabs.co/api/v9/routes?api_key=dd764152-cdbc-4b0e-8100-3a81aba2a034&dep_iata=CDG"
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

    new Chart(document.getElementById("graphique1"), {
      type: "radar",
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
      // "https://airlabs.co/api/v9/routes?api_key=dd764152-cdbc-4b0e-8100-3a81aba2a034&arr_iata=CDG"
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

$select = $('#localeId'); 
$.ajax({
    url: '../assets/json/languages.json',
    dataType:'JSON',
    success:function(data){
        $select.html('');
        $.each(data.languages, function (key, val) {
            $select.append('<option id="' + val.id + '">' + val.name + '</option>');
        })
    },
    error:function(){
        $select.html('<option id="-1">none available</option>');
    }
});
