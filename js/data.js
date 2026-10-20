// data.js - builds a table from an array, with live search and sorting

// 1. The data: an array of objects
const people = [
  { name: "Sara",  age: 20, city: "Cairo" },
  { name: "Omar",  age: 25, city: "Alexandria" },
  { name: "Ali",   age: 19, city: "Giza" },
  { name: "Mona",  age: 31, city: "Cairo" },
  { name: "Youssef", age: 28, city: "Aswan" },
  { name: "Nour",  age: 22, city: "Luxor" },
  { name: "Hana",  age: 35, city: "Alexandria" },
  { name: "Karim", age: 23, city: "Giza" }
];

// 2. Select the elements
const tableBody = document.querySelector("#table-body");
const searchInput = document.querySelector("#search");
const sortNameBtn = document.querySelector("#sort-name");
const sortAgeBtn = document.querySelector("#sort-age");
const count = document.querySelector("#count");

// 3. Current state: what the user searched, and how it is sorted
let sortBy = "";   // "", "name" or "age"

// 4. Draw the table (filter first, then sort, then build rows)
function render() {
  const query = searchInput.value.trim().toLowerCase();

  // filter: keep people whose name or city contains the search text
  let result = people.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.city.toLowerCase().includes(query)
  );

  // sort (on a copy, so the original array stays the same)
  if (sortBy === "name") {
    result = [...result].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "age") {
    result = [...result].sort((a, b) => a.age - b.age);
  }

  // build the rows
  tableBody.innerHTML = "";

  if (result.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 3;
    cell.textContent = "No results found.";
    row.appendChild(cell);
    tableBody.appendChild(row);
  } else {
    result.forEach(person => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = person.name;

      const ageCell = document.createElement("td");
      ageCell.textContent = person.age;

      const cityCell = document.createElement("td");
      cityCell.textContent = person.city;

      row.append(nameCell, ageCell, cityCell);
      tableBody.appendChild(row);
    });
  }

  count.textContent = "Showing " + result.length + " of " + people.length + " people";
}

// 5. Events
searchInput.addEventListener("input", render);   // filters while typing

sortNameBtn.addEventListener("click", () => {
  sortBy = "name";
  render();
});

sortAgeBtn.addEventListener("click", () => {
  sortBy = "age";
  render();
});

// 6. Show the table when the page loads
render();
