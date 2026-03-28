const seasons = ["Spring", "Summer", "Autumn", "Winter"];
const DAYS_PER_SEASON = 30;
const STAGE_DURATIONS = [1, 5, 7, 14, 21, 28, 42, Infinity];
const STAGE_NAMES = ["Baby", "Infant", "Toddler", "Child", "Teen", "Young Adult", "Adult", "Elder"];

let currentDate = { year: 1, seasonIdx: 0, day: 15 };
let currentKingdom = "Willow Creek";
let events = JSON.parse(localStorage.getItem('simsEvents')) || [];
let sims = JSON.parse(localStorage.getItem('simsData')) || [];

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
                daysInStage: daysInStage + 1,
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

function prevSeason() { /* unchanged */ 
    currentDate.seasonIdx--;
    if (currentDate.seasonIdx < 0) {
        currentDate.seasonIdx = 3;
        currentDate.year = Math.max(1, currentDate.year - 1);
    }
    renderAll();
}

function nextSeason() { /* unchanged */ 
    currentDate.seasonIdx++;
    if (currentDate.seasonIdx > 3) {
        currentDate.seasonIdx = 0;
        currentDate.year++;
    }
    renderAll();
}

function advanceOneDay() {
    currentDate.day++;
    if (currentDate.day > DAYS_PER_SEASON) {
        currentDate.day = 1;
        currentDate.seasonIdx++;
        if (currentDate.seasonIdx > 3) {
            currentDate.seasonIdx = 0;
            currentDate.year++;
        }
    }
    renderAll();
}

function renderAll() {
    renderSeasonHeader();
    renderCalendar();
}

let currentEditingEvent = null;

function addEvent() {
    currentEditingEvent = null;
    document.getElementById('modal-title').textContent = 'New Event';
    const modal = document.getElementById('event-modal');
    modal.style.display = 'flex';

    const seasonSelect = document.getElementById('event-season');
    seasonSelect.innerHTML = seasons.map((s, i) => `<option value="${i}" ${i === currentDate.seasonIdx ? 'selected' : ''}>${s}</option>`).join('');
    
    document.getElementById('event-day').value = currentDate.day;
    document.getElementById('event-year').value = currentDate.year;
    document.getElementById('event-title').value = '';
    document.getElementById('event-type').value = 'custom';
    document.getElementById('event-desc').value = '';
}

function editEvent(eventId) {
    currentEditingEvent = events.find(e => e.id === eventId);
    if (!currentEditingEvent) return;

    document.getElementById('modal-title').textContent = 'Edit Event';
    const modal = document.getElementById('event-modal');
    modal.style.display = 'flex';

    const seasonSelect = document.getElementById('event-season');
    seasonSelect.innerHTML = seasons.map((s, i) => `<option value="${i}" ${i === currentEditingEvent.seasonIdx ? 'selected' : ''}>${s}</option>`).join('');
    
    document.getElementById('event-day').value = currentEditingEvent.day;
    document.getElementById('event-year').value = currentEditingEvent.year;
    document.getElementById('event-title').value = currentEditingEvent.title;
    document.getElementById('event-type').value = currentEditingEvent.type || 'custom';
    document.getElementById('event-desc').value = currentEditingEvent.desc || '';
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

    if (currentEditingEvent) {
        Object.assign(currentEditingEvent, { year, seasonIdx, day, title, type, desc });
    } else {
        events.push({ 
            id: Date.now(), 
            year, seasonIdx, day, title, type, desc, 
            kingdom: currentKingdom 
        });
    }

    saveEvents();
    closeModal();
    renderAll();
}

function deleteEvent(eventId) {
    if (!confirm("Delete this event?")) return;
    events = events.filter(e => e.id !== eventId);
    saveEvents();
    renderAll();
}

function closeModal() {
    document.getElementById('event-modal').style.display = 'none';
    currentEditingEvent = null;
}

function showDayEvents(day) {
    const dayEvents = events.filter(e => 
        e.year === currentDate.year &&
        e.seasonIdx === currentDate.seasonIdx &&
        e.day === day &&
        e.kingdom === currentKingdom
    );

    if (dayEvents.length === 0) {
        document.getElementById('event-season').value = currentDate.seasonIdx;
        document.getElementById('event-day').value = day;
        document.getElementById('event-year').value = currentDate.year;
        addEvent();
        return;
    }

    let msg = `Events on Day ${day}:\n\n`;
    dayEvents.forEach(e => {
        msg += `• ${e.title} (${e.type})\n`;
        msg += `  [Edit] [Delete]\n\n`; // placeholder - real buttons added below
    });

    // Better: show in a custom way or just use alert for now, but we improved upcoming list too
    alert(msg); // You can expand this later into a better modal if you want
}

function renderUpcoming() {
    const list = document.getElementById('upcoming-list');
    const nowTotal = getTotalDays(currentDate);

    const upcoming = events
        .filter(e => {
            const eTotal = getTotalDays({ year: e.year, seasonIdx: e.seasonIdx, day: e.day });
            return eTotal >= nowTotal && e.kingdom === currentKingdom;
        })
        .sort((a, b) => getTotalDays(a) - getTotalDays(b))
        .slice(0, 10);

    let html = '';
    upcoming.forEach(e => {
        const seasonName = seasons[e.seasonIdx];
        html += `<li style="margin:6px 0;">
            ${seasonName} Day ${e.day}, Year ${e.year} — <strong>${e.title}</strong> 
            <button onclick="editEvent(${e.id}); event.stopImmediatePropagation();" style="margin-left:8px; font-size:0.8rem;">Edit</button>
            <button onclick="deleteEvent(${e.id}); event.stopImmediatePropagation();" style="margin-left:4px; font-size:0.8rem; background:#e74c3c;">Delete</button>
        </li>`;
    });

    list.innerHTML = html || '<li>No upcoming events</li>';
}

function renderSims() {
    const container = document.getElementById('sims-list');
    container.innerHTML = sims.map(sim => {
        const age = calculateAge(sim);
        return `
            <div style="margin:10px 0; padding:12px; background:#1a1a2e; border-radius:6px;">
                <strong>${sim.name}</strong><br>
                <small>Born: ${seasons[sim.birthSeasonIdx]} ${sim.birthDay}, Year ${sim.birthYear}</small><br>
                <span style="color:#e94560">Now: ${age.stage} (Day ${age.daysInStage} / ${age.daysToNext === '∞' ? '∞' : age.daysToNext + ' left'})</span>
                <div style="margin-top:8px;">
                    <button onclick="editSim(${sim.id})" style="font-size:0.85rem;">Edit</button>
                    <button onclick="deleteSim(${sim.id})" style="font-size:0.85rem; background:#e74c3c; margin-left:6px;">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

function editSim(simId) {
    const sim = sims.find(s => s.id === simId);
    if (!sim) return;

    const name = prompt("New name?", sim.name);
    if (name === null) return;

    const birthStr = prompt("New birth date?\nFormat: Season Day Year\nExample: Spring 10 1", 
        `${seasons[sim.birthSeasonIdx]} ${sim.birthDay} ${sim.birthYear}`);
    
    if (!birthStr) return;

    const parts = birthStr.trim().split(/\s+/);
    if (parts.length !== 3) return alert("Invalid format!");

    const seasonName = parts[0];
    const birthDay = parseInt(parts[1]);
    const birthYear = parseInt(parts[2]);
    const birthSeasonIdx = seasons.indexOf(seasonName);

    if (birthSeasonIdx === -1 || isNaN(birthDay) || birthDay < 1 || birthDay > 30 || isNaN(birthYear)) {
        return alert("Invalid birth date!");
    }

    sim.name = name;
    sim.birthYear = birthYear;
    sim.birthSeasonIdx = birthSeasonIdx;
    sim.birthDay = birthDay;

    saveSims();
    renderSims();
}

function deleteSim(simId) {
    if (!confirm("Delete this Sim?")) return;
    sims = sims.filter(s => s.id !== simId);
    saveSims();
    renderSims();
}

function addSim() {
    const name = prompt("Sim name?");
    if (!name) return;

    const birthStr = prompt("Birth date?\nFormat → Season Day Year\nExample: Spring 10 1");
    const parts = birthStr ? birthStr.trim().split(/\s+/) : [];
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

// Initialize
renderKingdoms();
renderAll();
