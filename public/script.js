const checklist = [
  { title: "Research", items: [
    "Pick a species that fits my lifestyle",
    "Find an exotic vet nearby",
    "Check my landlord / local laws allow it",
    "Budget for ongoing costs (food, electricity, vet)",
    "Arrange care for when I travel",
  ]},
  { title: "Enclosure", items: [
    "Terrarium of the right size",
    "Secure, escape-proof lid",
    "Substrate",
    "Hides (warm side and cool side)",
    "Climbing branches and decorations",
  ]},
  { title: "Heating & Lighting", items: [
    "Basking lamp and bulb",
    "UVB light",
    "Thermostat",
    "Thermometers (warm and cool side)",
    "Hygrometer",
    "Timer for lights",
  ]},
  { title: "Food & Water", items: [
    "Food suited to the species",
    "Calcium and vitamin supplements",
    "Water dish",
    "Feeding tongs and dish",
    "Container to keep live food",
  ]},
  { title: "Care Supplies", items: [
    "Reptile-safe cleaner / disinfectant",
    "Spray bottle",
    "Scale / notebook to track weight and feeding",
    "Travel box for vet visits",
  ]},
  { title: "Before Bringing Them Home", items: [
    "Set up and test the enclosure for several days",
    "Check temperatures are stable",
    "Find a reputable breeder or rescue",
  ]},
];

const KEY = "lizard-checklist";
const saved = new Set(JSON.parse(localStorage.getItem(KEY) || "[]"));
const lists = document.getElementById("lists");
const bar = document.getElementById("bar");
const count = document.getElementById("count");
const boxes = [];

checklist.forEach((cat, i) => {
  const section = document.createElement("section");
  section.style.animationDelay = `${i * 80}ms`;
  section.innerHTML = `<h2>${cat.title}</h2>`;
  const ul = document.createElement("ul");
  cat.items.forEach(item => {
    const li = document.createElement("li");
    const label = document.createElement("label");
    const box = document.createElement("input");
    box.type = "checkbox";
    box.dataset.id = `${cat.title}: ${item}`;
    box.checked = saved.has(box.dataset.id);
    box.addEventListener("change", update);
    const text = document.createElement("span");
    text.className = "text";
    text.textContent = item;
    label.append(box, text);
    li.append(label);
    ul.append(li);
    boxes.push(box);
  });
  section.append(ul);
  lists.append(section);
});

function update() {
  const done = boxes.filter(b => b.checked);
  localStorage.setItem(KEY, JSON.stringify(done.map(b => b.dataset.id)));
  const pct = Math.round((done.length / boxes.length) * 100);
  bar.style.width = pct + "%";
  bar.parentElement.setAttribute("aria-valuenow", pct);
  count.textContent = pct === 100 ? "All done! Time to get your lizard!" : `${done.length} of ${boxes.length} done`;
  document.body.classList.toggle("done", pct === 100);
}

document.getElementById("reset").addEventListener("click", () => {
  if (!confirm("Clear all ticks?")) return;
  boxes.forEach(b => (b.checked = false));
  update();
});

update();
