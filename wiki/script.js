let form = document.querySelector("#search"),
  body = document.querySelector("body"),
  html = document.querySelector("html"),
  resultOfSearch = document.querySelector("#result"),
  searchTerm = document.querySelector("#searchTerm"),
  footer = document.querySelector('#foot'),
  clear = document.querySelector('#clear');

function showResults(results) {

  resultOfSearch.innerHTML = "";
  searchTerm.value = "";
  body.style.height = 'auto';
  html.style.height = 'auto';
  results.forEach(result => {
    const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);

    resultOfSearch.insertAdjacentHTML('beforeend',
      `<div class="resultItem">
        <h3 class="resultItem-title">
          <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
        </h3>
        <a href="${url}" class="resultItem-link" target="_blank" rel="noopener"><span class="resultItem-snippet">${result.snippet}</span><br></a>
       
      </div>`
    );
  });


}

async function getData() {
  let searchItem = searchTerm.value.trim();
  let url = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${searchItem}`
  await fetch(url)
    .then(response => response.json())
    .then(data => {
      let results = data.query.search;
      showResults(results);
    })
    .catch(() => searchTerm.value = "Please, write smth");


}


form.addEventListener('submit', (e) => {
  e.preventDefault();
  getData();
});

clear.addEventListener('click', () => {
    resultOfSearch.innerHTML = "";
    body.style.height = '100%';
    html.style.height = '100%';
  }

);

form.addEventListener('keydown', (e) => {

  if (e.code == 'Enter') {
    getData();

  }
});