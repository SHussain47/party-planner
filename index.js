const BaseUrl = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const Cohort = "2506-ftb-ct-web-pt";
const API = `${BaseUrl}/${Cohort}`;

// ******** State ********
let events = [];
let selectedEvent;
let rsvps = [];
let guests = [];

// All events - Store the data in events array
async function getEvents() {
  try {
    const response = await fetch(`${API}/events`);
    const result = await response.json();
    events = result.data;
    render();
  } catch (error) {
    console.error("There was an error with /GET Events : ", error);
  }
}

// A single event data is stored in selectedEvent
async function getEvent(id) {
  try {
    const response = await fetch(`${API}/events/${id}`);
    const result = await response.json();
    selectedEvent = result.data;
    render();
  } catch (error) {
    console.error("There was an error with /GET Single Event : ", error);
  }
}

// All rsvp - Store the data in rsvp array
async function getRsvps() {
  try {
    const response = await fetch(`${API}/rsvps`);
    const result = await response.json();
    rsvps = result.data;
    render();
  } catch (error) {
    console.error("There was an error with /GET RSVPS : ", error);
  }
}

// All guests - Store the data in rsvp array
async function getGuests() {
  try {
    const response = await fetch(`${API}/guests`);
    const result = await response.json();
    guests = result.data;
    render();
  } catch (error) {
    console.error("There was an error with /GET Guests : ", error);
  }
}

// ******** Components ********

// Will show details on event when clicked
function EventListItem(event) {
  const $li = document.createElement("li");

  if (selectedEvent && event.id === selectedEvent.id) {
    $li.classList.add("selected");
  }

  $li.innerHTML = `
    <a href="#selected">${event.name}</a>
  `;
  $li.addEventListener("click", function (eVent) {
    eVent.preventDefault();
    getEvent(event.id);
  });

  return $li;
}

// All event names
function EventList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("event");

  const $events = events.map(EventListItem);
  $ul.replaceChildren(...$events);

  return $ul;
}

// Description of event
function SelectedEvent() {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a event to learn more.";
    return $p;
  }

  const $event = document.createElement("section");
  $event.innerHTML = `
    <h3>${selectedEvent.name} #${selectedEvent.id}</h3>
    <time datetime="${selectedEvent.date}">
      ${selectedEvent.date.slice(0, 10)}
    </time>
    <address>${selectedEvent.location}</address>
    <p>${selectedEvent.description}</p>
    <GuestList></GuestList>
  `;
  $event.querySelector("GuestList").replaceWith(GuestList());

  return $event;
}

// List of guests
function GuestList() {
  const $ul = document.createElement("ul");
  const guestsAtEvent = guests.filter(function (guest) {
    return rsvps.find(function (rsvp) {
      return rsvp.guestId === guest.id && rsvp.eventId === selectedEvent.id;
    });
  });

  const $guests = guestsAtEvent.map(function (guest) {
    const $guest = document.createElement("li");
    $guest.textContent = guest.name;
    return $guest;
  });
  $ul.replaceChildren(...$guests);

  return $ul;
}

// ******** Render ********
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Event Planner</h1>
    <main>
      <section>
        <h2>Upcoming Events</h2>
        <EventList></EventList>
      </section>
      <section id="selected">
        <h2>Event Details</h2>
        <SelectedEvent></SelectedEvent>
      </section>
    </main>
  `;

  $app.querySelector("EventList").replaceWith(EventList());
  $app.querySelector("SelectedEvent").replaceWith(SelectedEvent());
}

async function init() {
  await getEvents();
  await getRsvps();
  await getGuests();
  render();
}

init();
