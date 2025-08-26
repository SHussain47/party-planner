const BaseUrl = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const Cohort = "2506-ftb-ct-web-pt";
const API = `${BaseUrl}/${Cohort}`;

let events = [];


async function getEvents() {
  try {
    const response = await fetch(`${API}/events`);
    const result = await response.json();
    events = result.data;
    render();
  } catch (error) {
    console.error("There was an error with /GET events: ", error);
  }
}

async function getSingleEvent(name) {
  try {
    const response = await fetch(`${API}/events/${name}`);
    const singleEvent = await response.json();
    return singleEvent.data;
  } catch (error) {
    console.error("There was an error with /GET sindgle event: ", error);
  }
}

function EventCard(event) {
  const $card = document.createElement("article");
  $card.classList.add("event");

  $card.innerHTML = `
    <h2>${event.name}</h2>
    <figure>
      <img src=${event.imageUrl} alt={recipe.name}>
    </figure>
    <p>${event.description}</p>
  `;

  return $card;
}








function render() {
  
}



