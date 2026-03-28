const seasons = ["Spring", "Summer", "Autumn", "Winter"];
const DAYS_PER_SEASON = 30;
const STAGE_DURATIONS = [1, 5, 7, 14, 21, 28, 42, Infinity]; // Baby → Elder
const STAGE_NAMES = ["Baby", "Infant", "Toddler", "Child", "Teen", "Young Adult", "Adult", "Elder"];

let currentDate = { year: 1, seasonIdx: 0, day: 15 }; // start in Spring, day 15, Year 1
let currentKingdom = "Willow Creek";
let events = JSON.parse(localStorage.getItem('simsEvents')) || [];
let sims = JSON.parse(localStorage.getItem('simsData')) || [];

// Sample data (custom calendar format)
if (sims.length === 0) {
    sims = [
        { id: 1, name: "Luna Voss", birthYear: 1, birthSeasonIdx: 0, birthDay: 10, kingdom: "Willow Creek" },
        { id: 2, name: "Marcus Flex", birthYear: 1, birthSeasonIdx: 1, birthDay: 5,  kingdom: "San Myshuno" }
    ];
    saveSims();
}

const kingdoms = ["Willow Creek", "San Myshuno", "Brindleton Bay", "Del Sol Valley", "Custom Kingdom 1"];

function getTotalDays(d) {
    return d.year * 120 + d.seasonIdx * 30 + d.day;
}

function saveEvents() { localStorage.setItem('simsEvents', JSON.stringify(events)); }
function saveSims() { localStorage.setItem('simsData', JSON.stringify(sims)); }

function calculateAge(sim) {
    const birth = { year: sim.birthYear, seasonIdx: sim.birthSeasonIdx, day: sim.birthDay };
    const daysLived = Math.max(0, getTotalDays(currentDate) - getTotalDays(birth));
    
    let cumulative = 0;
    for (let i = 0; i < STAGE_DURATIONS.length; i++) {
        const stageEnd = cumulative + STAGE_DURATIONS[i];
        if (daysLived < stageEnd) {
            const daysInStage = daysLived - cumulative;
            const daysToNext = STAGE_DURATIONS[i] === Infinity ? "∞" : STAGE_DURATIONS[i] - daysInStage;
            return {
                stage: STAGE_NAMES[i],
                daysInStage: daysInStage + 1, // day 1 = first day
                daysToNext: daysToNext
            };
        }
        cumulative = stageEnd;
    }
    return { stage: "Elder", daysInStage: 0, daysToNext: "∞" };
}

function renderKingdoms() {
    const select = document.getElementById('kingdom-select');
    select.innerHTML = kingdoms.map(k => `<option value="${k}" ${k === currentKingdom ? 'selected' : ''}>${k}</option>`).join('');
    select.onchange = e => { currentKingdom = e.target.value; renderAll(); };
}

function renderSeasonHeader() {
    const header = document.getElementById('season-year');
    header.textContent = `${seasons[currentDate.seasonIdx]} — Year ${currentDate.year} (Day ${currentDate.day})`;
}

function renderCalendar() {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';

    for (let day = 1; day <= DAYS_PER_SEASON; day++) {
        const dayEvents = events.filter(e => 
            e.year === currentDate.year &&
            e.seasonIdx === currentDate.seasonIdx &&
            e.day === day &&
            e.kingdom === currentKingdom
        );

        let html = `<div onclick="showDayEvents(${day})">
            <span class="day-number">Day ${day}</span>`;

        dayEvents.slice(0, 3).forEach(ev => {
            html += `<div class="event ${ev.type}">${ev.title}</div>`;
        });
        if (dayEvents.length > 3) html += `<div class="event custom">+${dayEvents.length-3} more</div>`;

        html += `</div>`;
        calendar.innerHTML += html;
    }

    renderUpcoming();
    renderSims();
}

function prevSeason() {
    currentDate.seasonIdx--;
    if (currentDate.seasonIdx < 0) {
        currentDate.seasonIdx = 3;
        currentDate.year = Math.max(1, currentDate.year - 1);
    }
    renderAll();
}

function nextSeason() {
    currentDate.seasonIdx++;
    if (currentDate.seasonIdx > 3) {
        currentDate.seasonIdx = 0;
        currentDate.year++;
    }
    renderAll();
}

function renderAll() {
    renderSeasonHeader();
    renderCalendar();
}

function addEvent() {
    const modal = document.getElementById('event-modal');
    modal.style.display = 'flex';
    document.getElementById('modal-title').textContent = 'New Event';

    // Populate season select
    const seasonSelect = document.getElementById('event-season');
    seasonSelect.innerHTML = seasons.map((s, i) => `<option value="${i}" ${i === currentDate.seasonIdx ? 'selected' : ''}>${s}</option>`).join('');
    
    document.getElementById('event-day').value = currentDate.day;
    document.getElementById('event-year').value = currentDate.year;
    document.getElementById('event-title').value = '';
    document.getElementById('event-type').value = 'custom';
    document.getElementById('event-desc').value = '';
    window.currentEditingEvent = null;
}

function saveEvent() {
    const seasonIdx = parseInt(document.getElementById('event-season').value);
    const day = parseInt(document.getElementById('event-day').value);
    const year = parseInt(document.getElementById('event-year').value);
    const title = document.getElementById('event-title').value.trim();
    const type = document.getElementById('event-type').value;
    const desc = document.getElementById('event-desc').value.trim();

    if (!title || isNaN(day) || day < 1 || day > 30) {
        return alert("Valid day (1-30) and title are required!");
    }

    if (window.currentEditingEvent) {
        Object.assign(window.currentEditingEvent, { year, seasonIdx, day, title, type, desc });
    } else {
        events.push({ id: Date.now(), year, seasonIdx, day, title, type, desc, kingdom: currentKingdom });
    }

    saveEvents();
    closeModal();
    renderAll();
}

function closeModal() {
    document.getElementById('event-modal').style.display = 'none';
}

function showDayEvents(day) {
    const dayEvents = events.filter(e => 
        e.year === currentDate.year &&
        e.seasonIdx === currentDate.seasonIdx &&
        e.day === day &&
        e.kingdom === currentKingdom
    );

    if (dayEvents.length === 0) {
        // pre-fill modal for this day
        document.getElementById('event-season').value = currentDate.seasonIdx;
        document.getElementById('event-day').value = day;
        document.getElementById('event-year').value = currentDate.year;
        addEvent();
        return;
    }

    let msg = `Events on Day ${day}:\n\n`;
    dayEvents.forEach(e => msg += `• ${e.title} (${e.type})\n`);
    alert(msg); // you can replace this with a nicer modal later
}

function renderUpcoming() {
    const list = document.getElementById('upcoming-list');
    const nowTotal = getTotalDays(currentDate);

    const upcoming = events
        .filter(e => {
            const eTotal = getTotalDays({ year: e.year, seasonIdx: e.seasonIdx, day: e.day });
            return eTotal > nowTotal && e.kingdom === currentKingdom;
        })
        .sort((a, b) => getTotalDays(a) - getTotalDays(b))
        .slice(0, 8);

    list.innerHTML = upcoming.length 
        ? upcoming.map(e => {
            const seasonName = seasons[e.seasonIdx];
            return `<li>${seasonName} Day ${e.day}, Year ${e.year} — <strong>${e.title}</strong></li>`;
          }).join('')
        : '<li>No upcoming events</li>';
}

function renderSims() {
    const container = document.getElementById('sims-list');
    container.innerHTML = sims.map(sim => {
        const age = calculateAge(sim);
        return `
            <div style="margin:8px 0; padding:10px; background:#1a1a2e; border-radius:4px;">
                <strong>${sim.name}</strong><br>
                <small>Born: ${seasons[sim.birthSeasonIdx]} ${sim.birthDay}, Year ${sim.birthYear}</small><br>
                <span style="color:#e94560">Now: ${age.stage} (Day ${age.daysInStage} / ${age.daysToNext === '∞' ? '∞' : age.daysToNext + ' left'})</span>
            </div>
        `;
    }).join('');
}

function addSim() {
    const name = prompt("Sim name?");
    if (!name) return;

    const birthStr = prompt("Birth date?\nFormat → Season Day Year\nExample: Spring 10 1");
    const parts = birthStr.trim().split(/\s+/);
    if (parts.length !== 3) return alert("Use format: Season Day Year");

    const seasonName = parts[0];
    const birthDay = parseInt(parts[1]);
    const birthYear = parseInt(parts[2]);
    const birthSeasonIdx = seasons.indexOf(seasonName);

    if (birthSeasonIdx === -1 || isNaN(birthDay) || birthDay < 1 || birthDay > 30 || isNaN(birthYear)) {
        return alert("Invalid birth date! Example: Spring 10 1");
    }

    sims.push({
        id: Date.now(),
        name,
        birthYear,
        birthSeasonIdx,
        birthDay,
        kingdom: currentKingdom
    });

    saveSims();
    renderSims();
}

// Initialize everything
renderKingdoms();
renderAll();
