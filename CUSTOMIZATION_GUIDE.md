# 🔧 GUIDA PERSONALIZZAZIONE - TRON Light Cycles

Vuoi estendere il gioco con nuove funzionalità? Questa guida ti mostra come!

---

## 🎨 MODIFICHE FACILI (No Coding)

### 1️⃣ Cambia i Colori

**File:** `game.js`  
**Cerca:** Riga ~360

```javascript
// PRIMA:
let colors = ['#FFD700', '#FF6600', '#FF0099', '#00FF00', '#FF00FF', '#00FFFF'];

// DOPO (esempio brand aziendale):
let colors = ['#FF5733', '#3357FF', '#33FF57', '#FF33F5', '#F5FF33', '#33FFF5'];
```

**🎨 Palette Suggerite:**
```javascript
// Neon Classico
['#00FFFF', '#FF00FF', '#FFFF00', '#00FF00', '#FF0000', '#0000FF']

// Corporate
['#003366', '#0066CC', '#3399FF', '#66CCFF', '#99DDFF', '#CCEEFF']

// Sunset
['#FF6B35', '#FF8C42', '#FFA64D', '#FFB84D', '#FFC857', '#FFDB5C']

// Matrix
['#00FF00', '#00DD00', '#00BB00', '#009900', '#007700', '#005500']
```

---

### 2️⃣ Regola la Difficoltà

**File:** `game.js`  
**Cerca:** Riga ~115

```javascript
// VELOCITÀ MOTO
getSpeedDelay() {
    switch(this.speed) {
        case 1: return 8;  // ← Aumenta per PIÙ FACILE (es. 10)
        case 2: return 5;  // ← Valore medio
        case 3: return 3;  // ← Diminuisci per PIÙ DIFFICILE (es. 2)
    }
}
```

**🎯 Preset Difficoltà:**
```javascript
// EASY MODE (per principianti)
case 1: return 10;
case 2: return 7;
case 3: return 5;

// HARD MODE (per esperti)
case 1: return 6;
case 2: return 4;
case 3: return 2;

// EXPERT MODE (estremo)
case 1: return 4;
case 2: return 2;
case 3: return 1;
```

---

### 3️⃣ Modifica Dimensioni Griglia

**File:** `game.js`  
**Cerca:** Riga ~25

```javascript
// PRIMA:
let canvasWidth = 800;
let canvasHeight = 600;

// DOPO (esempio griglia più grande):
let canvasWidth = 1000;
let canvasHeight = 750;
```

⚠️ **Nota:** Griglia più grande = partite più lunghe

---

### 4️⃣ Cambia Numero di Round

**File:** `game.js`  
**Cerca:** Riga ~34

```javascript
// PRIMA:
let maxRounds = 3;

// DOPO (esempio best of 5):
let maxRounds = 5;
```

---

## 🚀 ESTENSIONI AVANZATE

### 🎁 1. POWER-UPS

Aggiungi power-ups che appaiono casualmente nella griglia!

#### File: `game.js` - Aggiungi questa classe

```javascript
// ===========================
// CLASSE POWER-UP
// ===========================
class PowerUp {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type; // 'speed', 'shield', 'slow', 'clear'
        this.active = true;
        this.duration = 5000; // Durata effetto in ms
    }
    
    draw() {
        if (!this.active) return;
        
        ctx.save();
        ctx.shadowBlur = 20;
        
        // Colore in base al tipo
        switch(this.type) {
            case 'speed':
                ctx.fillStyle = '#FFFF00'; // Giallo
                break;
            case 'shield':
                ctx.fillStyle = '#00FF00'; // Verde
                break;
            case 'slow':
                ctx.fillStyle = '#FF0000'; // Rosso
                break;
            case 'clear':
                ctx.fillStyle = '#00FFFF'; // Cyan
                break;
        }
        
        ctx.shadowColor = ctx.fillStyle;
        
        // Disegna diamante
        ctx.beginPath();
        ctx.moveTo(this.x + GRID_SIZE/2, this.y);
        ctx.lineTo(this.x + GRID_SIZE, this.y + GRID_SIZE/2);
        ctx.lineTo(this.x + GRID_SIZE/2, this.y + GRID_SIZE);
        ctx.lineTo(this.x, this.y + GRID_SIZE/2);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }
    
    checkCollision(bike) {
        if (!this.active) return false;
        
        let distance = Math.sqrt(
            Math.pow(bike.x - this.x, 2) + 
            Math.pow(bike.y - this.y, 2)
        );
        
        if (distance < GRID_SIZE) {
            this.activate(bike);
            this.active = false;
            return true;
        }
        return false;
    }
    
    activate(bike) {
        switch(this.type) {
            case 'speed':
                bike.speed = 3;
                setTimeout(() => bike.speed = 2, this.duration);
                break;
            case 'shield':
                bike.shielded = true;
                setTimeout(() => bike.shielded = false, this.duration);
                break;
            case 'slow':
                // Rallenta tutti gli avversari
                for (let enemy of enemies) {
                    if (enemy !== bike) {
                        enemy.speed = 1;
                    }
                }
                setTimeout(() => {
                    for (let enemy of enemies) {
                        enemy.speed = 2;
                    }
                }, this.duration);
                break;
            case 'clear':
                // Cancella parzialmente la scia
                if (bike.trail.length > 20) {
                    bike.trail = bike.trail.slice(-20);
                }
                break;
        }
    }
}

// Array globale per power-ups
let powerUps = [];

// Funzione per generare power-ups casuali
function spawnPowerUp() {
    if (powerUps.length >= 3) return; // Max 3 power-ups contemporaneamente
    
    let types = ['speed', 'shield', 'slow', 'clear'];
    let type = types[Math.floor(Math.random() * types.length)];
    
    let x = Math.floor(Math.random() * (canvasWidth / GRID_SIZE)) * GRID_SIZE;
    let y = Math.floor(Math.random() * (canvasHeight / GRID_SIZE)) * GRID_SIZE;
    
    powerUps.push(new PowerUp(x, y, type));
}

// Nel game loop (funzione update), aggiungi:
if (frameCount % 300 === 0) { // Ogni 5 secondi circa
    spawnPowerUp();
}

// Nel draw(), aggiungi:
for (let powerUp of powerUps) {
    powerUp.draw();
}

// Controllo collisioni power-ups
for (let bike of allEntities) {
    for (let powerUp of powerUps) {
        powerUp.checkCollision(bike);
    }
}
```

---

### 🛡️ 2. SHIELD SYSTEM

Aggiungi uno scudo che protegge da 1 collisione!

#### Modifica classe Bike:

```javascript
// Aggiungi al constructor:
this.shielded = false;
this.shieldCharges = 0;

// Modifica checkCollisions():
checkCollisions() {
    if (!this.alive) return false;
    
    // Controllo bordi e collisioni...
    let collisionDetected = false;
    
    // [... codice esistente collisioni ...]
    
    if (collisionDetected) {
        if (this.shielded || this.shieldCharges > 0) {
            // Consuma scudo invece di morire
            if (this.shielded) {
                this.shielded = false;
            } else {
                this.shieldCharges--;
            }
            
            // Effetto visivo
            this.flashShield();
            return false; // Non muore!
        } else {
            this.alive = false;
            return true;
        }
    }
    
    return false;
}

// Aggiungi metodo per effetto visivo:
flashShield() {
    let originalColor = this.color;
    this.color = '#FFFFFF';
    setTimeout(() => {
        this.color = originalColor;
    }, 200);
}
```

---

### 📊 3. LEADERBOARD LOCALE

Salva i migliori punteggi nel browser!

```javascript
// ===========================
// LEADERBOARD SYSTEM
// ===========================

// Funzione per salvare score
function saveScore(playerName, level, score) {
    let leaderboard = JSON.parse(localStorage.getItem('tronLeaderboard') || '[]');
    
    leaderboard.push({
        name: playerName,
        level: level,
        score: score,
        date: new Date().toISOString()
    });
    
    // Ordina per livello e score
    leaderboard.sort((a, b) => {
        if (b.level !== a.level) return b.level - a.level;
        return b.score - a.score;
    });
    
    // Mantieni solo top 10
    leaderboard = leaderboard.slice(0, 10);
    
    localStorage.setItem('tronLeaderboard', JSON.stringify(leaderboard));
}

// Funzione per mostrare leaderboard
function showLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem('tronLeaderboard') || '[]');
    
    let html = '<h2>🏆 TOP 10 LEADERBOARD</h2><table>';
    html += '<tr><th>#</th><th>Nome</th><th>Livello</th><th>Score</th><th>Data</th></tr>';
    
    leaderboard.forEach((entry, index) => {
        let date = new Date(entry.date).toLocaleDateString();
        html += `<tr>
            <td>${index + 1}</td>
            <td>${entry.name}</td>
            <td>${entry.level}</td>
            <td>${entry.score}</td>
            <td>${date}</td>
        </tr>`;
    });
    
    html += '</table>';
    
    // Mostra in una modal o schermata dedicata
    document.getElementById('leaderboardContent').innerHTML = html;
}

// Chiamala alla fine di ogni partita:
// showLeaderboard();
```

#### Aggiungi HTML per leaderboard:

```html
<!-- In index.html, aggiungi una nuova schermata -->
<div id="leaderboardScreen" class="screen">
    <div class="container">
        <div id="leaderboardContent"></div>
        <button onclick="backToModes()" class="btn-primary">CHIUDI</button>
    </div>
</div>
```

---

### 🎥 4. REPLAY SYSTEM

Registra e rivedi le partite!

```javascript
// ===========================
// REPLAY SYSTEM
// ===========================

let gameRecording = [];
let isRecording = false;
let isReplaying = false;

function startRecording() {
    gameRecording = [];
    isRecording = true;
}

function stopRecording() {
    isRecording = false;
}

// Nel game loop (update):
if (isRecording) {
    gameRecording.push({
        frame: frameCount,
        entities: allEntities.map(e => ({
            x: e.x,
            y: e.y,
            direction: e.direction,
            speed: e.speed,
            alive: e.alive,
            color: e.color,
            trail: [...e.trail]
        }))
    });
}

function playReplay() {
    isReplaying = true;
    let replayFrame = 0;
    
    let replayInterval = setInterval(() => {
        if (replayFrame >= gameRecording.length) {
            clearInterval(replayInterval);
            isReplaying = false;
            return;
        }
        
        let frame = gameRecording[replayFrame];
        
        // Disegna il frame
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        drawGrid();
        
        // Disegna entità dal replay
        for (let entityData of frame.entities) {
            // Crea entità temporanea per disegno
            let tempBike = new Bike(entityData.x, entityData.y, entityData.direction, entityData.color, '', false);
            tempBike.trail = entityData.trail;
            tempBike.alive = entityData.alive;
            tempBike.draw();
        }
        
        replayFrame++;
    }, 1000/60);
}

// Aggiungi pulsante per vedere replay:
// <button onclick="playReplay()">▶️ RIVEDI PARTITA</button>
```

---

### 🎵 5. SOUND EFFECTS

Aggiungi effetti sonori!

```javascript
// ===========================
// AUDIO SYSTEM
// ===========================

// Crea oggetti Audio
const sounds = {
    move: new Audio('data:audio/wav;base64,...'), // Usa generator online
    crash: new Audio('data:audio/wav;base64,...'),
    powerup: new Audio('data:audio/wav;base64,...'),
    win: new Audio('data:audio/wav;base64,...')
};

// Funzione per suonare
function playSound(soundName) {
    if (sounds[soundName]) {
        sounds[soundName].currentTime = 0;
        sounds[soundName].play().catch(e => console.log('Audio blocked'));
    }
}

// Usa nei momenti chiave:
// Quando bike gira: playSound('move');
// Quando bike crasha: playSound('crash');
// Quando prendi powerup: playSound('powerup');
// Quando vinci: playSound('win');
```

**🔊 Generatori Audio Gratuiti:**
- https://www.bfxr.net/ (retro sounds)
- https://freesound.org/ (sound effects library)
- https://sfxr.me/ (8-bit generator)

---

### 🤖 6. AI PIÙ INTELLIGENTE

Migliora l'intelligenza artificiale dei nemici!

```javascript
// Sostituisci il metodo aiDecide() con questo:

aiDecide() {
    if (!this.alive || this.isPlayer) return;
    
    // Valuta tutte le direzioni con punteggio
    let directionScores = [];
    
    for (let dir = 0; dir < 4; dir++) {
        // Previeni inversione a 180°
        if (Math.abs(this.direction - dir) === 2) continue;
        
        let score = this.evaluateDirection(dir);
        directionScores.push({ direction: dir, score: score });
    }
    
    // Ordina per punteggio
    directionScores.sort((a, b) => b.score - a.score);
    
    // Scelta più intelligente basata su aiLevel
    let randomFactor = (10 - this.aiLevel) / 10;
    
    if (Math.random() > randomFactor && directionScores.length > 0) {
        // Scegli la migliore
        this.turn(directionScores[0].direction);
    } else if (directionScores.length > 1) {
        // Scegli una delle prime 2 (più variabile)
        let choice = Math.floor(Math.random() * 2);
        this.turn(directionScores[choice].direction);
    }
}

evaluateDirection(dir) {
    let testX = this.x;
    let testY = this.y;
    
    // Calcola posizione test
    switch(dir) {
        case 0: testY -= GRID_SIZE; break;
        case 1: testX += GRID_SIZE; break;
        case 2: testY += GRID_SIZE; break;
        case 3: testX -= GRID_SIZE; break;
    }
    
    let score = 100;
    
    // Penalità per bordi
    let distToBorder = Math.min(
        testX,
        canvasWidth - testX,
        testY,
        canvasHeight - testY
    );
    score += distToBorder / 10;
    
    // Penalità per vicinanza a scie
    let minDistToTrail = Infinity;
    for (let entity of allEntities) {
        for (let segment of entity.trail) {
            let dist = Math.sqrt(
                Math.pow(segment.x - testX, 2) + 
                Math.pow(segment.y - testY, 2)
            );
            minDistToTrail = Math.min(minDistToTrail, dist);
        }
    }
    score += minDistToTrail;
    
    // Bonus per spazio aperto davanti
    let openSpace = this.countOpenSpaceAhead(testX, testY, dir);
    score += openSpace * 5;
    
    return score;
}

countOpenSpaceAhead(x, y, dir) {
    let count = 0;
    let checkDist = 50;
    
    for (let i = 1; i <= checkDist / GRID_SIZE; i++) {
        let checkX = x;
        let checkY = y;
        
        switch(dir) {
            case 0: checkY -= GRID_SIZE * i; break;
            case 1: checkX += GRID_SIZE * i; break;
            case 2: checkY += GRID_SIZE * i; break;
            case 3: checkX -= GRID_SIZE * i; break;
        }
        
        // Controlla se libero
        if (checkX < 0 || checkX >= canvasWidth || 
            checkY < 0 || checkY >= canvasHeight) break;
        
        let blocked = false;
        for (let entity of allEntities) {
            if (this.checkCollisionWithTrail(checkX, checkY, entity.trail)) {
                blocked = true;
                break;
            }
        }
        
        if (blocked) break;
        count++;
    }
    
    return count;
}
```

---

## 📊 ANALYTICS & TRACKING

Traccia metriche di gioco per analisi formative!

```javascript
// ===========================
// ANALYTICS SYSTEM
// ===========================

let sessionAnalytics = {
    startTime: null,
    endTime: null,
    totalRounds: 0,
    decisionsPerSecond: [],
    velocityChanges: [],
    nearMissCount: 0,
    panicMoments: []
};

function trackDecision(decisionType) {
    sessionAnalytics.decisionsPerSecond.push({
        type: decisionType,
        timestamp: Date.now(),
        gameTime: frameCount
    });
}

function detectPanicMoment(bike) {
    // Rileva "panic" quando molte decisioni rapide
    let recentDecisions = sessionAnalytics.decisionsPerSecond
        .filter(d => Date.now() - d.timestamp < 1000);
    
    if (recentDecisions.length > 5) {
        sessionAnalytics.panicMoments.push({
            timestamp: Date.now(),
            gameTime: frameCount,
            surroundingEntities: allEntities.length
        });
    }
}

function generateAnalyticsReport() {
    return {
        totalPlayTime: (Date.now() - sessionAnalytics.startTime) / 1000,
        averageDecisionsPerMinute: (sessionAnalytics.decisionsPerSecond.length / 
            ((Date.now() - sessionAnalytics.startTime) / 60000)),
        panicMomentsCount: sessionAnalytics.panicMoments.length,
        // ... altre metriche
    };
}
```

---

## 🎓 INTEGRAZIONE LMS

Esporta dati per Learning Management Systems!

```javascript
// Formato SCORM-like per export
function exportSCORMData() {
    return {
        student: {
            name: playerData.name,
            id: playerData.id
        },
        activity: {
            id: 'tron-light-cycles',
            type: 'simulation',
            duration: sessionAnalytics.totalPlayTime
        },
        result: {
            score: calculateFinalScore(),
            success: currentLevel > 3,
            completion: true
        },
        context: {
            competencies: [
                'decision-making',
                'stress-management',
                'strategic-thinking'
            ],
            kolb_stage: 'concrete_experience'
        }
    };
}

// Salva su server/LMS
function sendToLMS() {
    fetch('/api/lms/record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exportSCORMData())
    });
}
```

---

## 📚 RISORSE SVILUPPO

### 🔗 Librerie Utili
- **Howler.js** - Audio system avanzato
- **Particle.js** - Effetti particelle
- **Chart.js** - Grafici analitici
- **Three.js** - Per versione 3D!

### 📖 Tutorial Consigliati
- Canvas API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- Socket.io: https://socket.io/docs/
- Game Dev: https://eloquentjavascript.net/

---

**🚀 Ora hai tutto per creare la tua versione unica di TRON! 🎮**

*Happy coding! 💻*
