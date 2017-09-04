const endpoint = 'data.json';
const datas = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => datas.push(...data));

function findMatches(wordToMatch, datas) {
  return datas.filter(person => {
    const regex = new RegExp(wordToMatch, 'gi');

    return person.name.match(regex) || person.company.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, datas);

  const html = matchArray
    .map(person => {
      const regex = new RegExp(this.value, 'gi');

      const personName = person.name.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const personCompany = person.company.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );

      return `
        <li>
          <span class="list-item">${personName},<br>${personCompany}</span>
        </li>
      `;
    })
    .join('');

  list.innerHTML = html;
}

const searchInput = document.querySelector('.search-field');
const list = document.querySelector('.search-list');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
