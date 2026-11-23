const dateElement = document.querySelector("#current-date");

if (dateElement) {
  dateElement.textContent = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}
