/* ===========================
   TRON LIGHT CYCLES - GAME LOGIC
   
   🧠 OBIETTIVO FORMATIVO:
   Sviluppare competenze di decision-making rapido,
   pensiero strategico e gestione dello stress
   
   📚 CICLO DI KOLB:
   1. Concrete Experience: Gioco attivo
   2. Reflective Observation: Analisi post-round
   3. Abstract Conceptualization: Pattern recognition
   4. Active Experimentation: Nuove strategie
   =========================== */

// ===========================
// SISTEMA MOBILE DETECTION
// ===========================

// Rilevamento device mobile e orientamento
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                 (navigator.maxTouchPoints && navigator.maxTouchPoints > 2) ||
                 window.innerWidth <= 768;

const isPortrait = window.innerHeight > window.innerWidth;
const isMobilePortrait = isMobile && isPortrait;

console.log(`📱 Device Detection:`, {
    isMobile,
    isPortrait,
    isMobilePortrait,
    screenSize: `${window.innerWidth}x${window.innerHeight}`,
    userAgent: navigator.userAgent.substring(0, 50) + '...'
});

// ===========================
// SISTEMA TOUCH CONTROLS
// ===========================

// Inizializza controlli touch per mobile
function initTouchControls() {
    if (!isMobile) return;
    
    console.log('📱 Inizializzando controlli touch...');
    
    // Aggiungi classe mobile al body
    document.body.classList.add('mobile-device');
    if (isMobilePortrait) {
        document.body.classList.add('mobile-portrait');
    }
    
    // Event listeners per frecce di movimento
    const touchArrows = document.querySelectorAll('.touch-arrow');
    touchArrows.forEach(arrow => {
        const direction = arrow.dataset.direction;
        
        // Touch start
        arrow.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleTouchDirection(direction, true);
            arrow.style.background = 'rgba(0, 255, 255, 0.4)';
        });
        
        // Touch end
        arrow.addEventListener('touchend', (e) => {
            e.preventDefault();
            handleTouchDirection(direction, false);
            arrow.style.background = 'rgba(0, 255, 255, 0.2)';
        });
        
        // Mouse events per testing su desktop
        arrow.addEventListener('mousedown', (e) => {
            e.preventDefault();
            handleTouchDirection(direction, true);
            arrow.style.background = 'rgba(0, 255, 255, 0.4)';
        });
        
        arrow.addEventListener('mouseup', (e) => {
            e.preventDefault();
            handleTouchDirection(direction, false);
            arrow.style.background = 'rgba(0, 255, 255, 0.2)';
        });
    });
    
    // Event listeners per controlli velocità
    const speedButtons = document.querySelectorAll('.touch-speed-btn');
    speedButtons.forEach(btn => {
        const action = btn.dataset.action;
        
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleTouchSpeed(action);
            btn.style.background = 'rgba(255, 215, 0, 0.4)';
        });
        
        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            btn.style.background = 'rgba(255, 215, 0, 0.2)';
        });
        
        // Mouse events per testing
        btn.addEventListener('mousedown', (e) => {
            e.preventDefault();
            handleTouchSpeed(action);
            btn.style.background = 'rgba(255, 215, 0, 0.4)';
        });
        
        btn.addEventListener('mouseup', (e) => {
            e.preventDefault();
            btn.style.background = 'rgba(255, 215, 0, 0.2)';
        });
    });
    
    console.log('✅ Controlli touch inizializzati');
}

// Ridimensiona canvas per mobile
function resizeCanvas() {
    const canvas = document.getElementById('gameCanvas');
    if (canvas) {
        // Su mobile, mantieni il canvas quadrato
        if (isMobilePortrait) {
            const maxSize = Math.min(window.innerWidth - 20, 400);
            canvas.width = maxSize;
            canvas.height = maxSize;
            canvasWidth = maxSize;
            canvasHeight = maxSize;
            console.log(`📱 Canvas mobile ridimensionato: ${maxSize}x${maxSize}`);
        } else {
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
        }
    }
}

// Gestisce input direzione da touch
function handleTouchDirection(direction, isPressed) {
    if (!gameRunning) return;
    
    const keyMap = {
        'up': 'ArrowUp',
        'down': 'ArrowDown',
        'left': 'ArrowLeft',
        'right': 'ArrowRight'
    };
    
    const key = keyMap[direction];
    if (key) {
        if (isPressed) {
            handleKeyDown({ code: key, preventDefault: () => {} });
        } else {
            handleKeyUp({ code: key, preventDefault: () => {} });
        }
    }
}

// Gestisce input velocità da touch
function handleTouchSpeed(action) {
    if (!gameRunning) return;
    
    const keyMap = {
        'speed-up': 'KeyZ',
        'speed-down': 'KeyX'
    };
    
    const key = keyMap[action];
    if (key) {
        handleKeyDown({ code: key, preventDefault: () => {} });
    }
}

// ===========================
// SISTEMA AUDIO
// ===========================

let audioContext = null;
let audioEnabled = true;
let backgroundMusic = null;
let musicGainNode = null;
let musicSource = null;

// Musica locale TRON - File MP3 inclusi nel progetto
const MUSIC_FILES = [
    'assets/music/corruption.mp3',
    'assets/music/the_net.mp3'
];
let currentMusicIndex = 0;
let musicChangeTimer = null;

// Inizializza audio context
function initAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        musicGainNode = audioContext.createGain();
        musicGainNode.connect(audioContext.destination);
        musicGainNode.gain.value = 0.3; // Volume musica
        
        // Avvia musica di sottofondo
        if (audioEnabled) {
            startBackgroundMusic();
        }
    } catch (e) {
        console.log('Audio non supportato:', e);
        audioEnabled = false;
    }
}

// Musica di sottofondo da file MP3 locali
function startBackgroundMusic() {
    if (!audioContext || !audioEnabled) return;
    
    // Fermia musica esistente
    if (musicSource) {
        try {
            musicSource.stop();
            musicSource.disconnect();
        } catch (e) {}
    }
    
    // Seleziona musica casuale
    const musicFile = MUSIC_FILES[currentMusicIndex];
    console.log(`🎵 Caricando musica: ${musicFile} (${currentMusicIndex + 1}/${MUSIC_FILES.length})`);
    currentMusicIndex = (currentMusicIndex + 1) % MUSIC_FILES.length;
    
    // Carica e riproduci MP3 locale
    fetch(musicFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.arrayBuffer();
        })
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            if (!audioEnabled) return;
            
            musicSource = audioContext.createBufferSource();
            musicSource.buffer = audioBuffer;
            musicSource.loop = true; // Loop infinito
            musicSource.connect(musicGainNode);
            musicSource.start(0);
            
            console.log(`🎵 Musica TRON caricata: ${musicFile}`);
            
            // Cambia musica automaticamente ogni 2 minuti
            if (musicChangeTimer) {
                clearTimeout(musicChangeTimer);
            }
            musicChangeTimer = setTimeout(() => {
                console.log('🔄 Cambio automatico musica...');
                startBackgroundMusic();
            }, 120000); // 2 minuti
        })
        .catch(error => {
            console.log('Errore caricamento musica locale, uso musica procedurale:', error);
            // Fallback a musica procedurale
            startProceduralMusic();
        });
}

// Musica procedurale di backup (più interessante della precedente)
function startProceduralMusic() {
    if (!audioContext || !audioEnabled) return;
    
    const playMusicLoop = () => {
        if (!audioEnabled) return;
        
        // Pattern più complesso e meno ripetitivo
        const notes = [
            // Frase 1
            { freq: 220, time: 0, duration: 0.3, vol: 0.08 },      // A3
            { freq: 277, time: 0.3, duration: 0.3, vol: 0.08 },    // C#4
            { freq: 330, time: 0.6, duration: 0.3, vol: 0.10 },    // E4
            { freq: 440, time: 0.9, duration: 0.3, vol: 0.08 },    // A4
            // Frase 2
            { freq: 392, time: 1.3, duration: 0.3, vol: 0.08 },    // G4
            { freq: 330, time: 1.6, duration: 0.3, vol: 0.08 },    // E4
            { freq: 277, time: 1.9, duration: 0.6, vol: 0.10 },    // C#4 lungo
            // Frase 3
            { freq: 247, time: 2.6, duration: 0.3, vol: 0.08 },    // B3
            { freq: 294, time: 2.9, duration: 0.3, vol: 0.08 },    // D4
            { freq: 330, time: 3.2, duration: 0.3, vol: 0.08 },    // E4
            { freq: 370, time: 3.5, duration: 0.4, vol: 0.10 },    // F#4
            // Frase 4 (climax)
            { freq: 440, time: 4.0, duration: 0.4, vol: 0.12 },    // A4
            { freq: 494, time: 4.4, duration: 0.4, vol: 0.10 },    // B4
            { freq: 440, time: 4.8, duration: 0.8, vol: 0.08 },    // A4 lungo
        ];
        
        const loopDuration = 6.0; // Loop più lungo = meno ripetitivo
        
        notes.forEach(note => {
            const osc = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            const filter = audioContext.createBiquadFilter();
            
            // Mix di square e sawtooth per suono più ricco
            osc.type = Math.random() > 0.5 ? 'square' : 'sawtooth';
            osc.frequency.setValueAtTime(note.freq, audioContext.currentTime + note.time);
            
            // Filtro per dare più carattere
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(note.freq * 4, audioContext.currentTime + note.time);
            filter.Q.setValueAtTime(2, audioContext.currentTime + note.time);
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime + note.time);
            gainNode.gain.linearRampToValueAtTime(note.vol, audioContext.currentTime + note.time + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + note.time + note.duration);
            
            osc.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(musicGainNode);
            
            osc.start(audioContext.currentTime + note.time);
            osc.stop(audioContext.currentTime + note.time + note.duration);
        });
        
        // Bass line per più profondità
        const bassNotes = [
            { freq: 110, time: 0, duration: 1.0 },
            { freq: 138, time: 1.3, duration: 1.3 },
            { freq: 123, time: 2.6, duration: 1.4 },
            { freq: 147, time: 4.0, duration: 2.0 },
        ];
        
        bassNotes.forEach(note => {
            const osc = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(note.freq, audioContext.currentTime + note.time);
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime + note.time);
            gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + note.time + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + note.time + note.duration);
            
            osc.connect(gainNode);
            gainNode.connect(musicGainNode);
            
            osc.start(audioContext.currentTime + note.time);
            osc.stop(audioContext.currentTime + note.time + note.duration);
        });
        
        // Loop
        setTimeout(playMusicLoop, loopDuration * 1000);
    };
    
    playMusicLoop();
}

// Suono accelerazione (pitch up)
function playSoundAccelerate() {
    if (!audioContext || !audioEnabled) return;
    
    const osc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    osc.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + 0.1);
}

// Suono decelerazione (pitch down)
function playSoundDecelerate() {
    if (!audioContext || !audioEnabled) return;
    
    const osc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    osc.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + 0.1);
}

// Suono movimento/turn (breve beep)
function playSoundTurn() {
    if (!audioContext || !audioEnabled) return;
    
    const osc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
    
    osc.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + 0.05);
}

// Suono crash/collision (noise burst)
function playSoundCrash() {
    if (!audioContext || !audioEnabled) return;
    
    const bufferSize = audioContext.sampleRate * 0.3; // 0.3 secondi
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Genera rumore bianco con decay
    for (let i = 0; i < bufferSize; i++) {
        const decay = 1 - (i / bufferSize);
        data[i] = (Math.random() * 2 - 1) * decay;
    }
    
    const source = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, audioContext.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    
    source.buffer = buffer;
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    source.start(audioContext.currentTime);
}

// Suono esplosione (più drammatico)
function playSoundExplosion() {
    if (!audioContext || !audioEnabled) return;
    
    // Componente noise
    const bufferSize = audioContext.sampleRate * 0.5;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
        const decay = 1 - (i / bufferSize);
        data[i] = (Math.random() * 2 - 1) * decay * decay;
    }
    
    const source = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(5000, audioContext.currentTime);
    filter.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.5);
    
    gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
    
    source.buffer = buffer;
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    source.start(audioContext.currentTime);
    
    // Aggiunge un suono profondo (sub bass)
    const osc = audioContext.createOscillator();
    const oscGain = audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(60, audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, audioContext.currentTime + 0.5);
    
    oscGain.gain.setValueAtTime(0.3, audioContext.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    osc.connect(oscGain);
    oscGain.connect(audioContext.destination);
    
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + 0.5);
}

// Suono vittoria (jingle positivo)
function playSoundVictory() {
    if (!audioContext || !audioEnabled) return;
    
    const notes = [
        { freq: 523, time: 0 },      // C5
        { freq: 659, time: 0.1 },    // E5
        { freq: 784, time: 0.2 },    // G5
        { freq: 1047, time: 0.3 },   // C6
    ];
    
    notes.forEach(note => {
        const osc = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.freq, audioContext.currentTime + note.time);
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime + note.time);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + note.time + 0.3);
        
        osc.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        osc.start(audioContext.currentTime + note.time);
        osc.stop(audioContext.currentTime + note.time + 0.3);
    });
}

// Toggle audio on/off
function toggleAudio() {
    audioEnabled = !audioEnabled;
    
    const btn = document.getElementById('audioBtn');
    if (btn) {
        btn.textContent = audioEnabled ? '🔊 AUDIO ON' : '🔇 AUDIO OFF';
    }
    
    if (audioEnabled) {
        if (!audioContext) {
            initAudio();
        } else {
            audioContext.resume();
            startBackgroundMusic();
        }
    } else {
        // Ferma la musica completamente
        if (musicSource) {
            try {
                musicSource.stop();
                musicSource.disconnect();
                musicSource = null;
            } catch (e) {}
        }
        if (audioContext) {
            audioContext.suspend();
        }
    }
}

// Cambia musica manualmente
function changeMusic() {
    if (!audioEnabled) {
        console.log('🎵 Audio disabilitato, non posso cambiare musica');
        return;
    }
    
    console.log('🎵 Cambio musica manuale...');
    startBackgroundMusic();
}

// ===========================
// CONFIGURAZIONE VERCEL
// ===========================

// Rileva se siamo su Vercel
const IS_VERCEL = window.location.hostname.includes('vercel.app');

// Disabilita multiplayer su Vercel
if (IS_VERCEL) {
    console.log('🌐 Modalità Vercel: Solo Campaign disponibile');
}

// ===========================
// VARIABILI GLOBALI
// ===========================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

// Dimensioni canvas
const GRID_SIZE = 10;
let canvasWidth = 800;
let canvasHeight = 600;

// Stati del gioco
let gameState = 'login'; // login, modeSelection, matchmaking, playing, roundEnd, gameOver, paused
let gameMode = null; // 'multiplayer' o 'campaign'
let currentLevel = 1;
let currentRound = 1;
let maxRounds = 3;

// Player data
let playerData = {
    name: '',
    id: null,
    isPlayer1: true // Nel multiplayer determina chi è player1
};

// Giocatori e nemici
let players = [];
let enemies = [];
let allEntities = []; // Tutti i bike (player + enemies)

// Input controls
let keys = {};

// Timer e velocità
let gameLoop = null;
let frameCount = 0;
let isPaused = false;

// Countdown
let countdown = 3;
let countdownActive = false;

// Socket.io per multiplayer
let socket = null;
let roomId = null;

// Statistiche
let stats = {
    roundsWon: 0,
    totalCollisions: 0,
    averageSpeed: 0,
    totalPlayTime: 0
};

// ===========================
// CLASSI - BIKE (Moto)
// ===========================

class Bike {
    constructor(x, y, direction, color, name, isPlayer = false, aiLevel = 1) {
        this.x = x;
        this.y = y;
        this.direction = direction; // 0=up, 1=right, 2=down, 3=left
        this.color = color;
        this.name = name;
        this.isPlayer = isPlayer;
        this.aiLevel = aiLevel; // Livello AI (1-10)
        this.alive = true;
        this.speed = 2; // Velocità 1-3
        this.speedFrameDelay = this.getSpeedDelay();
        this.frameCounter = 0;
        this.trail = []; // Array di coordinate della scia
        this.score = 0;
        
        // Aggiungi posizione iniziale alla scia
        this.trail.push({x: this.x, y: this.y});
    }
    
    // Calcola il delay in base alla velocità
    getSpeedDelay() {
        switch(this.speed) {
            case 1: return 8;  // Lento
            case 2: return 5;  // Medio
            case 3: return 3;  // Veloce
            default: return 5;
        }
    }
    
    // Cambia velocità
    changeSpeed(delta) {
        let oldSpeed = this.speed;
        this.speed = Math.max(1, Math.min(3, this.speed + delta));
        
        // Suono solo se la velocità cambia davvero
        if (oldSpeed !== this.speed) {
            if (delta > 0) {
                playSoundAccelerate();
            } else {
                playSoundDecelerate();
            }
        }
        
        this.speedFrameDelay = this.getSpeedDelay();
    }
    
    // Cambia direzione
    turn(newDirection) {
        // Previeni inversione a 180°
        if (Math.abs(this.direction - newDirection) !== 2) {
            if (this.direction !== newDirection) {
                playSoundTurn();
            }
            this.direction = newDirection;
        }
    }
    
    // Aggiorna posizione
    update() {
        if (!this.alive) return;
        
        this.frameCounter++;
        
        // Muovi solo ogni N frame in base alla velocità
        if (this.frameCounter >= this.speedFrameDelay) {
            this.frameCounter = 0;
            
            // Calcola nuova posizione in base alla direzione
            let newX = this.x;
            let newY = this.y;
            
            switch(this.direction) {
                case 0: newY -= GRID_SIZE; break; // Su
                case 1: newX += GRID_SIZE; break; // Destra
                case 2: newY += GRID_SIZE; break; // Giù
                case 3: newX -= GRID_SIZE; break; // Sinistra
            }
            
            // Aggiorna posizione
            this.x = newX;
            this.y = newY;
            
            // Aggiungi alla scia
            this.trail.push({x: this.x, y: this.y});
        }
    }
    
    // AI Decision Making - INTELLIGENZA AVANZATA
    aiDecide() {
        if (!this.alive || this.isPlayer) return;
        
        // Array di possibili direzioni (0=su, 1=dx, 2=giù, 3=sx)
        let possibleDirections = [0, 1, 2, 3];
        let directionEvaluations = [];
        
        // Valuta ogni direzione con algoritmo avanzato
        for (let dir of possibleDirections) {
            // Previeni inversione a 180°
            if (Math.abs(this.direction - dir) === 2) continue;
            
            let evaluation = this.evaluateDirectionAdvanced(dir);
            
            if (evaluation.score > -1000) { // Solo direzioni non immediatamente mortali
                directionEvaluations.push({
                    direction: dir,
                    score: evaluation.score,
                    openSpace: evaluation.openSpace,
                    danger: evaluation.danger
                });
            }
        }
        
        // Se non ci sono direzioni sicure, mantieni quella attuale (rischio calcolato)
        if (directionEvaluations.length === 0) {
            return;
        }
        
        // Ordina per punteggio decrescente
        directionEvaluations.sort((a, b) => b.score - a.score);
        
        // Strategia in base al livello AI
        let bestChoice;
        
        if (this.aiLevel >= 8) {
            // AI Esperta: sceglie sempre la migliore + piccola casualità
            if (Math.random() > 0.05) { // 95% tempo migliore scelta
                bestChoice = directionEvaluations[0];
            } else {
                bestChoice = directionEvaluations[Math.min(1, directionEvaluations.length - 1)];
            }
        } else if (this.aiLevel >= 5) {
            // AI Intermedia: sceglie tra le prime 2 migliori
            let topTwo = directionEvaluations.slice(0, 2);
            bestChoice = topTwo[Math.floor(Math.random() * topTwo.length)];
        } else {
            // AI Base: più casualità
            let randomFactor = (10 - this.aiLevel) / 10;
            if (Math.random() > randomFactor) {
                bestChoice = directionEvaluations[0];
            } else {
                bestChoice = directionEvaluations[Math.floor(Math.random() * Math.min(3, directionEvaluations.length))];
            }
        }
        
        this.turn(bestChoice.direction);
    }
    
    // Valutazione avanzata di una direzione
    evaluateDirectionAdvanced(dir) {
        let testX = this.x;
        let testY = this.y;
        
        // Calcola posizione test
        switch(dir) {
            case 0: testY -= GRID_SIZE; break; // Su
            case 1: testX += GRID_SIZE; break; // Destra
            case 2: testY += GRID_SIZE; break; // Giù
            case 3: testX -= GRID_SIZE; break; // Sinistra
        }
        
        let score = 0;
        
        // 1. CONTROLLO IMMEDIATO - collisione mortale
        if (testX < 0 || testX >= canvasWidth || testY < 0 || testY >= canvasHeight) {
            return { score: -10000, openSpace: 0, danger: 10 };
        }
        
        // Controlla collisione immediata con scie
        for (let entity of allEntities) {
            let trailToCheck = entity === this ? entity.trail.slice(0, -1) : entity.trail;
            if (this.checkCollisionWithTrail(testX, testY, trailToCheck)) {
                return { score: -10000, openSpace: 0, danger: 10 };
            }
        }
        
        // 2. SPAZIO APERTO DAVANTI (lookahead profondo)
        let openSpace = this.calculateOpenSpaceInDirection(testX, testY, dir, 15);
        score += openSpace * 50; // Molto importante!
        
        // 3. DISTANZA DAI BORDI - preferisce stare al centro
        let distFromBorders = Math.min(
            testX,
            canvasWidth - testX,
            testY,
            canvasHeight - testY
        );
        score += distFromBorders * 0.5;
        
        // 4. VICINANZA ALLE SCIE - penalità per essere vicino
        let minDistToTrail = this.getMinDistanceToAllTrails(testX, testY);
        if (minDistToTrail < GRID_SIZE * 3) {
            score -= (GRID_SIZE * 3 - minDistToTrail) * 2; // Forte penalità
        } else {
            score += Math.min(minDistToTrail, 100); // Bonus per stare lontano
        }
        
        // 5. STRATEGIA AGGRESSIVA vs GIOCATORE (AI alta)
        if (this.aiLevel >= 7 && players.length > 0) {
            let player = players.find(p => p.isPlayer);
            if (player && player.alive) {
                // Cerca di posizionarsi per limitare spazio al giocatore
                let distToPlayer = Math.sqrt(
                    Math.pow(testX - player.x, 2) + 
                    Math.pow(testY - player.y, 2)
                );
                
                // Vuole stare a distanza media (né troppo vicino né troppo lontano)
                let idealDist = canvasWidth * 0.3;
                let distScore = -Math.abs(distToPlayer - idealDist) * 0.1;
                score += distScore;
                
                // Cerca di "tagliare la strada" al giocatore
                if (this.isBlockingPlayerPath(testX, testY, player, dir)) {
                    score += 30; // Bonus strategico
                }
            }
        }
        
        // 6. VALUTAZIONE FUGA - quante vie di fuga ci sono da quella posizione?
        let escapeRoutes = this.countEscapeRoutes(testX, testY, dir);
        score += escapeRoutes * 20;
        
        // 7. PATTERN RECOGNITION - evita di creare trappole per sé stesso
        if (this.isCreatingSelfTrap(testX, testY, dir)) {
            score -= 100;
        }
        
        // 8. BONUS CENTRO GRIGLIA (posizione più sicura)
        let centerX = canvasWidth / 2;
        let centerY = canvasHeight / 2;
        let distFromCenter = Math.sqrt(
            Math.pow(testX - centerX, 2) + 
            Math.pow(testY - centerY, 2)
        );
        
        // Preferisce posizioni centrali ma non troppo
        if (distFromCenter < canvasWidth * 0.3) {
            score += 10;
        }
        
        let dangerLevel = minDistToTrail < GRID_SIZE * 5 ? 5 : 1;
        
        return {
            score: score,
            openSpace: openSpace,
            danger: dangerLevel
        };
    }
    
    // Calcola lo spazio aperto in una direzione (lookahead)
    calculateOpenSpaceInDirection(startX, startY, direction, maxDepth) {
        let count = 0;
        let currentX = startX;
        let currentY = startY;
        
        for (let depth = 0; depth < maxDepth; depth++) {
            // Avanza nella direzione
            switch(direction) {
                case 0: currentY -= GRID_SIZE; break;
                case 1: currentX += GRID_SIZE; break;
                case 2: currentY += GRID_SIZE; break;
                case 3: currentX -= GRID_SIZE; break;
            }
            
            // Controlla se fuori dai bordi
            if (currentX < 0 || currentX >= canvasWidth || 
                currentY < 0 || currentY >= canvasHeight) {
                break;
            }
            
            // Controlla collisioni
            let blocked = false;
            for (let entity of allEntities) {
                if (this.checkCollisionWithTrail(currentX, currentY, entity.trail)) {
                    blocked = true;
                    break;
                }
            }
            
            if (blocked) break;
            
            count++;
        }
        
        return count;
    }
    
    // Distanza minima da tutte le scie
    getMinDistanceToAllTrails(x, y) {
        let minDist = Infinity;
        
        for (let entity of allEntities) {
            for (let segment of entity.trail) {
                let dist = Math.sqrt(
                    Math.pow(segment.x - x, 2) + 
                    Math.pow(segment.y - y, 2)
                );
                minDist = Math.min(minDist, dist);
            }
        }
        
        return minDist;
    }
    
    // Conta quante vie di fuga ci sono da una posizione
    countEscapeRoutes(x, y, excludeDir) {
        let escapeCount = 0;
        
        for (let dir = 0; dir < 4; dir++) {
            if (dir === excludeDir) continue; // Non contare la direzione da cui veniamo
            
            let testX = x;
            let testY = y;
            
            switch(dir) {
                case 0: testY -= GRID_SIZE; break;
                case 1: testX += GRID_SIZE; break;
                case 2: testY += GRID_SIZE; break;
                case 3: testX -= GRID_SIZE; break;
            }
            
            // Controlla se è una via libera
            if (testX >= 0 && testX < canvasWidth && testY >= 0 && testY < canvasHeight) {
                let isFree = true;
                for (let entity of allEntities) {
                    if (this.checkCollisionWithTrail(testX, testY, entity.trail)) {
                        isFree = false;
                        break;
                    }
                }
                if (isFree) escapeCount++;
            }
        }
        
        return escapeCount;
    }
    
    // Rileva se sta creando una trappola per sé stesso
    isCreatingSelfTrap(x, y, direction) {
        // Simula di andare in quella direzione per alcuni step
        let simX = x;
        let simY = y;
        let simDir = direction;
        
        for (let i = 0; i < 5; i++) {
            switch(simDir) {
                case 0: simY -= GRID_SIZE; break;
                case 1: simX += GRID_SIZE; break;
                case 2: simY += GRID_SIZE; break;
                case 3: simX -= GRID_SIZE; break;
            }
            
            // Conta vie di fuga disponibili
            let exits = this.countEscapeRoutes(simX, simY, simDir);
            
            if (exits === 0) {
                return true; // Trappola rilevata!
            }
        }
        
        return false;
    }
    
    // Strategia aggressiva: cerca di bloccare il percorso del giocatore
    isBlockingPlayerPath(myX, myY, player, myDirection) {
        // Calcola dove sarà il giocatore nei prossimi step
        let playerFutureX = player.x;
        let playerFutureY = player.y;
        
        // Proietta movimento giocatore
        for (let i = 0; i < 5; i++) {
            switch(player.direction) {
                case 0: playerFutureY -= GRID_SIZE; break;
                case 1: playerFutureX += GRID_SIZE; break;
                case 2: playerFutureY += GRID_SIZE; break;
                case 3: playerFutureX -= GRID_SIZE; break;
            }
        }
        
        // Verifica se la mia posizione interseca o limita il percorso
        let dist = Math.sqrt(
            Math.pow(myX - playerFutureX, 2) + 
            Math.pow(myY - playerFutureY, 2)
        );
        
        return dist < GRID_SIZE * 8; // Se sono vicino al percorso futuro
    }
    
    // Controlla collisione con una scia specifica
    checkCollisionWithTrail(x, y, trail) {
        for (let segment of trail) {
            if (segment.x === x && segment.y === y) {
                return true;
            }
        }
        return false;
    }
    
    // Controlla collisioni con tutto
    checkCollisions() {
        if (!this.alive) return false;
        
        // Controllo bordi
        if (this.x < 0 || this.x >= canvasWidth || this.y < 0 || this.y >= canvasHeight) {
            this.alive = false;
            playSoundExplosion();
            return true;
        }
        
        // Controllo collisioni con tutte le scie (inclusa la propria)
        for (let entity of allEntities) {
            // Per la propria scia, ignora l'ultimo segmento
            let trailToCheck = entity === this ? entity.trail.slice(0, -1) : entity.trail;
            
            if (this.checkCollisionWithTrail(this.x, this.y, trailToCheck)) {
                this.alive = false;
                playSoundCrash();
                return true;
            }
        }
        
        return false;
    }
    
    // Disegna la moto e la scia
    draw() {
        // Disegna scia
        ctx.strokeStyle = this.color;
        ctx.lineWidth = GRID_SIZE - 2;
        ctx.lineCap = 'square';
        
        // Effetto glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        
        ctx.beginPath();
        for (let i = 0; i < this.trail.length; i++) {
            if (i === 0) {
                ctx.moveTo(this.trail[i].x + GRID_SIZE/2, this.trail[i].y + GRID_SIZE/2);
            } else {
                ctx.lineTo(this.trail[i].x + GRID_SIZE/2, this.trail[i].y + GRID_SIZE/2);
            }
        }
        ctx.stroke();
        
        // Disegna la moto (cerchio più grande)
        if (this.alive) {
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.arc(this.x + GRID_SIZE/2, this.y + GRID_SIZE/2, GRID_SIZE, 0, Math.PI * 2);
            ctx.fill();
            
            // Disegna direzione (linea)
            ctx.strokeStyle = '#FFF';
            ctx.lineWidth = 2;
            ctx.shadowBlur = 5;
            let dirX = 0, dirY = 0;
            switch(this.direction) {
                case 0: dirY = -GRID_SIZE; break;
                case 1: dirX = GRID_SIZE; break;
                case 2: dirY = GRID_SIZE; break;
                case 3: dirX = -GRID_SIZE; break;
            }
            ctx.beginPath();
            ctx.moveTo(this.x + GRID_SIZE/2, this.y + GRID_SIZE/2);
            ctx.lineTo(this.x + GRID_SIZE/2 + dirX/2, this.y + GRID_SIZE/2 + dirY/2);
            ctx.stroke();
        } else {
            // Disegna esplosione
            this.drawExplosion();
        }
        
        ctx.shadowBlur = 0;
    }
    
    // Effetto esplosione
    drawExplosion() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 30;
        ctx.shadowColor = this.color;
        
        for (let i = 0; i < 8; i++) {
            let angle = (Math.PI * 2 / 8) * i;
            let dist = 20 + Math.random() * 10;
            let px = this.x + GRID_SIZE/2 + Math.cos(angle) * dist;
            let py = this.y + GRID_SIZE/2 + Math.sin(angle) * dist;
            
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// ===========================
// GESTIONE SCHERMATE
// ===========================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    gameState = screenId.replace('Screen', '');
}

// ===========================
// LOGIN E AUTENTICAZIONE
// ===========================

function login() {
    const nameInput = document.getElementById('playerName');
    const name = nameInput.value.trim();
    
    if (name.length < 2) {
        alert('Inserisci un nome valido (minimo 2 caratteri)');
        return;
    }
    
    playerData.name = name;
    playerData.id = 'player_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    document.getElementById('welcomeName').textContent = name;
    showScreen('modeScreen');
}

function logout() {
    playerData = { name: '', id: null, isPlayer1: true };
    showScreen('loginScreen');
}

// ===========================
// SELEZIONE MODALITÀ
// ===========================

function selectMode(mode) {
    gameMode = mode;
    
    if (mode === 'multiplayer') {
        if (IS_VERCEL) {
            alert('🌐 Multiplayer non disponibile su Vercel!\n\nPer giocare in multiplayer usa:\n• Replit (replit.com)\n• Heroku (heroku.com)\n• Railway (railway.app)\n\nLa modalità Campaign funziona perfettamente qui!');
            return;
        }
        initMultiplayer();
    } else if (mode === 'campaign') {
        initCampaign();
    }
}

function backToModes() {
    currentLevel = 1;
    currentRound = 1;
    stats = { roundsWon: 0, totalCollisions: 0, averageSpeed: 0, totalPlayTime: 0 };
    showScreen('modeScreen');
}

// ===========================
// MULTIPLAYER ONLINE
// ===========================

function initMultiplayer() {
    showScreen('matchmakingScreen');
    
    // Inizializza Socket.io
    if (!socket) {
        socket = io();
        
        socket.on('connect', () => {
            console.log('Connesso al server');
            socket.emit('findMatch', playerData);
        });
        
        socket.on('waitingForOpponent', (data) => {
            document.getElementById('waitingPlayers').textContent = 
                `Giocatori in attesa: ${data.waitingCount}`;
        });
        
        socket.on('matchFound', (data) => {
            roomId = data.roomId;
            playerData.isPlayer1 = data.isPlayer1;
            
            // Setup gioco multiplayer
            setupMultiplayerGame(data);
        });
        
        socket.on('opponentMove', (data) => {
            // Aggiorna posizione avversario
            updateOpponentPosition(data);
        });
        
        socket.on('opponentDisconnected', () => {
            alert('Avversario disconnesso!');
            backToModes();
        });
    } else {
        socket.emit('findMatch', playerData);
    }
}

function setupMultiplayerGame(matchData) {
    // Reset canvas
    if (canvas) {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
    }
    
    // Crea i due giocatori
    players = [];
    
    if (playerData.isPlayer1) {
        // Player 1 - Blu - parte da sinistra
        let p1 = new Bike(50, canvasHeight/2, 1, '#00FFFF', playerData.name, true);
        let p2 = new Bike(canvasWidth-50, canvasHeight/2, 3, '#FFD700', matchData.opponentName, false);
        players = [p1, p2];
    } else {
        // Player 2 - Giallo - parte da destra
        let p1 = new Bike(50, canvasHeight/2, 1, '#00FFFF', matchData.opponentName, false);
        let p2 = new Bike(canvasWidth-50, canvasHeight/2, 3, '#FFD700', playerData.name, true);
        players = [p2, p1]; // Player2 è il secondo
    }
    
    allEntities = [...players];
    
    // Update HUD
    updateHUD();
    
    // Mostra schermata gioco e inizia countdown
    showScreen('gameScreen');
    startCountdown();
}

function updateOpponentPosition(data) {
    // Trova l'avversario
    let opponent = players.find(p => !p.isPlayer);
    if (opponent) {
        opponent.x = data.x;
        opponent.y = data.y;
        opponent.direction = data.direction;
        opponent.speed = data.speed;
        opponent.trail = data.trail;
        opponent.alive = data.alive;
    }
}

function sendMyPosition() {
    if (socket && roomId) {
        let myBike = players.find(p => p.isPlayer);
        if (myBike) {
            socket.emit('playerMove', {
                roomId: roomId,
                x: myBike.x,
                y: myBike.y,
                direction: myBike.direction,
                speed: myBike.speed,
                trail: myBike.trail,
                alive: myBike.alive
            });
        }
    }
}

function cancelMatchmaking() {
    if (socket) {
        socket.emit('cancelMatch');
    }
    backToModes();
}

// ===========================
// CAMPAIGN MODE (AI PROGRESSIVA)
// ===========================

function initCampaign() {
    currentLevel = 1;
    currentRound = 1;
    stats.roundsWon = 0;
    
    startCampaignLevel();
}

function startCampaignLevel() {
    console.log(`🎮 Iniziando livello ${currentLevel}, round ${currentRound}`);
    
    // Reset canvas
    if (canvas) {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
    }
    
    // Salva score corrente del player se siamo nello stesso livello
    let playerScore = 0;
    if (players.length > 0 && players[0].isPlayer) {
        playerScore = players[0].score;
    }
    
    // Calcola numero di nemici in base al livello
    let numEnemies = calculateEnemies(currentLevel);
    console.log(`👾 Livello ${currentLevel}: ${numEnemies} nemici (AI Level ${Math.min(10, 4 + currentLevel)})`);
    
    // Mostra progressione completa per debug
    showLevelProgression();
    
    // Crea player
    let player = new Bike(canvasWidth/2, canvasHeight/2, 1, '#00FFFF', playerData.name, true);
    player.score = playerScore; // Mantieni score tra i round
    players = [player];
    
    // Crea nemici
    enemies = [];
    let colors = ['#FFD700', '#FF6600', '#FF0099', '#00FF00', '#FF00FF', '#00FFFF'];
    let positions = [
        {x: 50, y: 50, dir: 2},
        {x: canvasWidth-50, y: 50, dir: 2},
        {x: 50, y: canvasHeight-50, dir: 0},
        {x: canvasWidth-50, y: canvasHeight-50, dir: 0},
        {x: canvasWidth/2, y: 50, dir: 2},
        {x: canvasWidth/2, y: canvasHeight-50, dir: 0}
    ];
    
    for (let i = 0; i < numEnemies; i++) {
        let pos = positions[i % positions.length];
        // AI parte da livello 4 e aumenta con il livello di gioco
        let aiLevel = Math.min(10, 4 + currentLevel); 
        let enemy = new Bike(pos.x, pos.y, pos.dir, colors[i % colors.length], `CPU ${i+1}`, false, aiLevel);
        enemies.push(enemy);
    }
    
    allEntities = [...players, ...enemies];
    
    // Update HUD
    updateHUD();
    
    // Mostra schermata gioco
    showScreen('gameScreen');
    startCountdown();
}

// Calcola numero di nemici in base al livello
// NUOVA LOGICA SEMPLIFICATA E CHIARA:
// Livello 1-3: +1 nemico per livello (1, 2, 3)
// Livello 4-5: 3 nemici (non aumenta)
// Livello 6-7: 4 nemici (+1)
// Livello 8-9: 5 nemici (+1)
// Livello 10-11: 6 nemici (+1)
// E così via...
function calculateEnemies(level) {
    console.log(`🔢 Calcolando nemici per livello ${level}:`);
    
    if (level <= 3) {
        // Livelli 1-3: +1 nemico per livello
        const enemies = level;
        console.log(`   📊 Livelli 1-3: ${enemies} nemici (tutorial)`);
        return enemies;
    } else {
        // Dal livello 4: +1 nemico ogni 2 livelli
        // Formula: 3 + floor((level - 3) / 2)
        // L4: 3+floor(1/2)=3, L5: 3+floor(2/2)=4
        // L6: 3+floor(3/2)=4, L7: 3+floor(4/2)=5
        // L8: 3+floor(5/2)=5, L9: 3+floor(6/2)=6
        const enemies = 3 + Math.floor((level - 3) / 2);
        console.log(`   📊 Livelli 4+: ${enemies} nemici (formula: 3 + floor((${level} - 3) / 2))`);
        return enemies;
    }
}

// Mostra la progressione dei livelli per debug
function showLevelProgression() {
    console.log('📊 PROGRESSIONE LIVELLI:');
    console.log('┌─────────┬─────────┬─────────┬─────────┐');
    console.log('│ Livello │ Nemici  │ AI Level│ Note    │');
    console.log('├─────────┼─────────┼─────────┼─────────┤');
    
    for (let i = 1; i <= Math.min(currentLevel + 5, 15); i++) {
        const enemies = calculateEnemies(i);
        const aiLevel = Math.min(10, 4 + i);
        const note = i <= 3 ? 'Tutorial' : 
                    i === 4 || i === 5 ? 'Stabile' :
                    i % 2 === 0 ? 'Aumenta!' : 'Stabile';
        
        const marker = i === currentLevel ? ' 👈' : '';
        console.log(`│   ${i.toString().padStart(2)}    │    ${enemies}    │    ${aiLevel}    │ ${note.padEnd(8)} │${marker}`);
    }
    
    console.log('└─────────┴─────────┴─────────┴─────────┘');
    console.log('📈 REGOLA: +1 nemico ogni 2 livelli dal livello 4');
}

// ===========================
// GAME LOOP
// ===========================

function startCountdown() {
    countdown = 3;
    countdownActive = true;
    document.getElementById('countdown').textContent = countdown;
    
    let countdownInterval = setInterval(() => {
        countdown--;
        
        if (countdown > 0) {
            document.getElementById('countdown').textContent = countdown;
        } else if (countdown === 0) {
            document.getElementById('countdown').textContent = 'GO!';
        } else {
            document.getElementById('countdown').textContent = '';
            countdownActive = false;
            clearInterval(countdownInterval);
            startGame();
        }
    }, 1000);
}

function startGame() {
    gameState = 'playing';
    frameCount = 0;
    
    // Avvia game loop
    gameLoop = setInterval(update, 1000/60); // 60 FPS
}

function update() {
    if (isPaused || countdownActive) return;
    
    frameCount++;
    
    // Aggiorna AI
    for (let enemy of enemies) {
        if (frameCount % 2 === 0) { // AI decide ogni 2 frame
            enemy.aiDecide();
        }
    }
    
    // Aggiorna tutte le entità
    for (let entity of allEntities) {
        entity.update();
        entity.checkCollisions();
    }
    
    // Invia posizione al server se multiplayer
    if (gameMode === 'multiplayer' && frameCount % 3 === 0) {
        sendMyPosition();
    }
    
    // Disegna tutto
    draw();
    
    // Controlla fine round
    checkRoundEnd();
}

function draw() {
    if (!ctx) return;
    
    // Pulisci canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Disegna griglia
    drawGrid();
    
    // Disegna tutte le entità
    for (let entity of allEntities) {
        entity.draw();
    }
}

function drawGrid() {
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    for (let x = 0; x < canvasWidth; x += GRID_SIZE * 5) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
    }
    
    for (let y = 0; y < canvasHeight; y += GRID_SIZE * 5) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();
    }
}

// ===========================
// INPUT CONTROLS
// ===========================

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    
    if (gameState !== 'playing' || countdownActive) return;
    
    let myBike = players.find(p => p.isPlayer);
    if (!myBike || !myBike.alive) return;
    
    // Movimento - Frecce
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        myBike.turn(0);
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        myBike.turn(1);
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        myBike.turn(2);
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        myBike.turn(3);
    }
    
    // Velocità
    if (e.key === 'z' || e.key === 'Z') {
        myBike.changeSpeed(1);
        updateSpeedDisplay();
    } else if (e.key === 'x' || e.key === 'X') {
        myBike.changeSpeed(-1);
        updateSpeedDisplay();
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// ===========================
// HUD UPDATE
// ===========================

function updateHUD() {
    // Update nomi e score
    document.getElementById('player1Name').textContent = players[0].name;
    document.getElementById('player1Score').textContent = players[0].score;
    
    // Update level e round
    document.getElementById('levelText').textContent = `LIVELLO ${currentLevel}`;
    document.getElementById('roundText').textContent = `ROUND ${currentRound}/${maxRounds}`;
    
    // Update opponents container
    let opponentsContainer = document.getElementById('opponentsContainer');
    opponentsContainer.innerHTML = '';
    
    if (gameMode === 'multiplayer' && players.length > 1) {
        let opponent = players[1];
        opponentsContainer.innerHTML = `
            <span class="player-name">${opponent.name}</span>
            <span class="player-score">${opponent.score}</span>
        `;
    } else if (gameMode === 'campaign') {
        let aliveEnemies = enemies.filter(e => e.alive).length;
        opponentsContainer.innerHTML = `
            <span class="player-name">NEMICI</span>
            <span class="player-score">${aliveEnemies}/${enemies.length}</span>
        `;
    }
    
    updateSpeedDisplay();
}

function updateSpeedDisplay() {
    let myBike = players.find(p => p.isPlayer);
    if (!myBike) return;
    
    for (let i = 1; i <= 3; i++) {
        let bar = document.getElementById(`p1speed${i}`);
        if (bar) {
            bar.classList.toggle('active', i <= myBike.speed);
        }
    }
}

// ===========================
// FINE ROUND / GAME OVER
// ===========================

function checkRoundEnd() {
    let alivePlayers = allEntities.filter(e => e.alive);
    
    if (alivePlayers.length <= 1) {
        stopGame();
        
        let winner = alivePlayers.length === 1 ? alivePlayers[0] : null;
        
        if (winner) {
            winner.score++;
            if (winner.isPlayer) {
                stats.roundsWon++;
                console.log(`🏆 Giocatore vince round! Score: ${winner.score}/2`);
            }
        }
        
        updateHUD();
        showRoundEnd(winner);
    }
}

function stopGame() {
    if (gameLoop) {
        clearInterval(gameLoop);
        gameLoop = null;
    }
}

function showRoundEnd(winner) {
    let winnerText = winner ? `${winner.name.toUpperCase()} VINCE!` : 'PAREGGIO!';
    document.getElementById('roundWinner').textContent = winnerText;
    
    // Statistiche round
    let statsHTML = '';
    
    if (gameMode === 'campaign') {
        let aliveCount = allEntities.filter(e => e.alive).length;
        statsHTML = `
            <div class="stat-line">
                <span>Livello ${currentLevel} - Round ${currentRound} / ${maxRounds}</span>
            </div>
            <div class="stat-line">
                <span>Nemici eliminati:</span>
                <span>${enemies.length - (aliveCount - 1)}</span>
            </div>
        `;
    } else {
        statsHTML = `
            <div class="stat-line">
                <span>Round completato:</span>
                <span>${currentRound} / ${maxRounds}</span>
            </div>
        `;
    }
    
    document.getElementById('roundStats').innerHTML = statsHTML;
    showScreen('roundEndScreen');
}

// Nuova funzione per continuare al prossimo livello/round
function continueToNextLevel() {
    // Se siamo in multiplayer, logica diversa
    if (gameMode === 'multiplayer') {
        currentRound++;
        
        if (currentRound > maxRounds) {
            showGameOver(); // Fine match
        } else {
            setupMultiplayerGame({opponentName: players[1].name});
        }
        return;
    }
    
    // CAMPAIGN MODE
    // Controlla se qualcuno ha già vinto (2 round su 3)
    let player = players[0];
    let maxEnemyScore = Math.max(...enemies.map(e => e.score || 0));
    
    if (player.score >= 2) {
        // Player ha vinto il livello! Avanza
        showGameOver(); // Questa funzione gestirà l'avanzamento livello
        return;
    }
    
    if (maxEnemyScore >= 2) {
        // Un nemico ha vinto - game over
        showGameOver();
        return;
    }
    
    // Nessuno ha ancora vinto - controlla se abbiamo finito i round
    currentRound++;
    
    if (currentRound > maxRounds) {
        // Finiti tutti i round - chi ha più punti vince
        showGameOver();
    } else {
        // Continua al prossimo round dello stesso livello
        startCampaignLevel();
    }
}

function nextRound() {
    currentRound++;
    
    if (currentRound > maxRounds) {
        // Fine partita - vai a game over
        showGameOver();
    } else {
        // Prossimo round - continua automaticamente
        if (gameMode === 'campaign') {
            setTimeout(() => {
                startCampaignLevel();
            }, 1000);
        } else if (gameMode === 'multiplayer') {
            // Re-setup multiplayer
            setTimeout(() => {
                setupMultiplayerGame({opponentName: players[1].name});
            }, 1000);
        }
    }
}

function showGameOver() {
    let winner;
    
    if (gameMode === 'multiplayer') {
        winner = players[0].score > players[1].score ? players[0] : players[1];
        
        // Multiplayer game over
        document.getElementById('finalWinner').textContent = 
            `VITTORIA: ${winner.name.toUpperCase()}`;
        
        let finalStatsHTML = `
            <div class="stat-line">
                <span>Round vinti:</span>
                <span>${winner.score} / ${maxRounds}</span>
            </div>
        `;
        
        document.getElementById('finalStats').innerHTML = finalStatsHTML;
        document.getElementById('debriefBox').style.display = 'none';
        document.getElementById('notYetDebriefMessage').style.display = 'none';
        
        showScreen('gameOverScreen');
        return;
    }
    
    // CAMPAIGN MODE
    winner = players[0];
    
    // Se il player ha vinto questo livello (2 round su 3)
    if (winner.score >= 2) {
        playSoundVictory();
        
        console.log(`🎉 Livello ${currentLevel} completato! Score: ${winner.score}`);
        
        // Avanza al prossimo livello
        currentLevel++;
        
        // RESET IMPORTANTE: Resetta round e score per il nuovo livello
        currentRound = 1;
        winner.score = 0;
        
        console.log(`🚀 Avanzato al livello ${currentLevel}. Round resettato a ${currentRound}`);
        
        // Mostra debrief completo solo dopo livello 7
        if (currentLevel > 7) {
            document.getElementById('finalWinner').textContent = 
                `🎉 LIVELLO ${currentLevel - 1} COMPLETATO! 🎉`;
            
            let finalStatsHTML = `
                <div class="stat-line">
                    <span>Complimenti!</span>
                    <span>Hai superato il Livello ${currentLevel - 1}</span>
                </div>
                <div class="stat-line">
                    <span>Nemici sconfitti:</span>
                    <span>${calculateEnemies(currentLevel - 1)}</span>
                </div>
                <div class="stat-line">
                    <span>Prossimo livello:</span>
                    <span>LIVELLO ${currentLevel} (${calculateEnemies(currentLevel)} nemici)</span>
                </div>
            `;
            
            document.getElementById('finalStats').innerHTML = finalStatsHTML;
            document.getElementById('debriefBox').style.display = 'block';
            document.getElementById('notYetDebriefMessage').style.display = 'none';
            
            showScreen('gameOverScreen');
        } else {
            // Livello 1-6: mostra schermata intermedia e continua
            document.getElementById('roundWinner').textContent = 
                `✅ LIVELLO ${currentLevel - 1} COMPLETATO!`;
            
            let statsHTML = `
                <div class="stat-line">
                    <span style="color: #00FFFF; font-size: 1.2rem;">🎯 Preparati per il prossimo livello!</span>
                </div>
                <div class="stat-line">
                    <span>Prossimo:</span>
                    <span style="color: #FFD700;">LIVELLO ${currentLevel}</span>
                </div>
                <div class="stat-line">
                    <span>Nemici:</span>
                    <span style="color: #FF6600;">${calculateEnemies(currentLevel)}</span>
                </div>
                <div class="stat-line">
                    <span>Difficoltà AI:</span>
                    <span style="color: #FF0000;">Level ${Math.min(10, 4 + currentLevel)}</span>
                </div>
                <div class="stat-line" style="margin-top: 20px;">
                    <span style="color: #888; font-size: 0.6rem;">Debrief completo disponibile al livello 7</span>
                </div>
            `;
            
            document.getElementById('roundStats').innerHTML = statsHTML;
            
            // Cambia testo pulsante
            const continueBtn = document.getElementById('continueBtn');
            if (continueBtn) {
                continueBtn.textContent = `🚀 LIVELLO ${currentLevel}`;
                continueBtn.onclick = startNextCampaignLevel;
            }
            
            showScreen('roundEndScreen');
        }
        
    } else {
        // Player ha perso - GAME OVER
        document.getElementById('finalWinner').textContent = 'GAME OVER';
        
        let finalStatsHTML = `
            <div class="stat-line">
                <span>Livello raggiunto:</span>
                <span>${currentLevel}</span>
            </div>
            <div class="stat-line">
                <span>Round vinti nel livello:</span>
                <span>${winner.score} / ${maxRounds}</span>
            </div>
        `;
        
        document.getElementById('finalStats').innerHTML = finalStatsHTML;
        
        // Mostra messaggio motivazionale se non ha raggiunto livello 7
        if (currentLevel < 7) {
            document.getElementById('debriefBox').style.display = 'none';
            document.getElementById('notYetDebriefMessage').style.display = 'block';
            document.getElementById('currentLevelDisplay').textContent = currentLevel;
        } else {
            // Ha perso ma aveva raggiunto livello 7+, mostra debrief
            document.getElementById('debriefBox').style.display = 'block';
            document.getElementById('notYetDebriefMessage').style.display = 'none';
        }
        
        showScreen('gameOverScreen');
    }
}

// Funzione per iniziare il prossimo livello campaign
function startNextCampaignLevel() {
    startCampaignLevel();
}

// ===========================
// PAUSE / RESTART
// ===========================

function pauseGame() {
    isPaused = true;
    showScreen('pauseScreen');
}

function resumeGame() {
    isPaused = false;
    showScreen('gameScreen');
}

function exitToMenu() {
    stopGame();
    backToModes();
}

function restart() {
    stopGame();
    currentRound = 1;
    
    if (gameMode === 'campaign') {
        startCampaignLevel();
    } else if (gameMode === 'multiplayer') {
        initMultiplayer();
    }
}

// ===========================
// INIZIALIZZAZIONE
// ===========================

window.addEventListener('load', () => {
    // Adatta canvas alle dimensioni finestra
    if (window.innerWidth < 800) {
        canvasWidth = window.innerWidth - 40;
        canvasHeight = window.innerHeight - 200;
    }
    
    if (canvas) {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
    }
    
    console.log('🎮 TRON Light Cycles caricato!');
    console.log('🧠 Sistema formativo pronto');
    
    // Inizializza controlli touch per mobile
    initTouchControls();
    
    // Gestione cambio orientamento
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            console.log('📱 Orientamento cambiato:', {
                width: window.innerWidth,
                height: window.innerHeight,
                orientation: window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
            });
            
            // Riapplica classi mobile
            document.body.classList.toggle('mobile-portrait', window.innerHeight > window.innerWidth);
            
            // Ridimensiona canvas se necessario
            if (gameRunning) {
                resizeCanvas();
            }
        }, 100);
    });
    
    // Gestione resize finestra
    window.addEventListener('resize', () => {
        if (gameRunning) {
            resizeCanvas();
        }
    });
    
    // Inizializza audio al primo click/interazione
    document.addEventListener('click', () => {
        if (!audioContext) {
            initAudio();
        }
    }, { once: true });
});
