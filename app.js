const searchInput = document.getElementById("searchInput");
let allMatches = [];

async function loadMatches(){
  try{
    const res = await fetch("http://localhost:4000/api/matches");
    allMatches = await res.json();
    renderMatches(allMatches);
  }catch(err){
    console.error("ERROR:",err);
  }
}

function renderMatches(matches){
  const c = document.getElementById("matchContainer");
  c.innerHTML = "";

  matches.forEach(m=>{
    c.innerHTML += `
      <div class="match-card">
        <div class="left">
          <div class="league">
            <img class="flag" src="https://flagcdn.com/${m.country}.svg">
            <span>${m.league}</span>
          </div>
          <div class="teams">
            <span class="home-team">${m.home}</span>
            <span class="vs">vs</span>
            <span class="away-team">${m.away}</span>
          </div>
        </div>
        <div class="right">
          <div class="datetime">
            <span>${m.time}</span>
          </div>
          <div class="stats">
            <span class="goals">Qol: ${m.goals}</span>
            <span class="odds">Əmsal: ${m.odds}</span>
            <span class="prob">Ehtimal: ${m.prob}</span>
          </div>
        </div>
      </div>
    `;
  });
}

searchInput.addEventListener("input", ()=>{
  const text = searchInput.value.toLowerCase();

  const filtered = allMatches.filter(m =>
    m.league.toLowerCase().includes(text) ||
    m.home.toLowerCase().includes(text) ||
    m.away.toLowerCase().includes(text) ||
    m.country.toLowerCase().includes(text)
  );

  renderMatches(filtered);
});

loadMatches();
window.addEventListener("load", function () {
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("closePopup");

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });
});
