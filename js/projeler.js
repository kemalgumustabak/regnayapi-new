fetch('projects/delta-konutlari.json')
  .then(res => res.json())
  .then(data => {
    console.log(data.title); // “Delta Konutları”
  });
