# 🤝 Contributing to TRON Light Cycles

Grazie per il tuo interesse a contribuire a TRON Light Cycles! Questo documento fornisce linee guida per contribuire al progetto.

## 🎯 **Come Contribuire**

### 🐛 **Segnalare Bug**
1. Controlla se il bug è già stato segnalato
2. Crea una nuova issue usando il template "Bug Report"
3. Fornisci informazioni dettagliate su come riprodurre il problema

### 💡 **Suggerire Nuove Funzionalità**
1. Controlla se la funzionalità è già stata richiesta
2. Crea una nuova issue usando il template "Feature Request"
3. Spiega come la funzionalità migliorerebbe l'esperienza educativa

### 🔧 **Contribuire con il Codice**
1. Fork del repository
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📋 **Linee Guida per il Codice**

### 🎨 **Stile del Codice**
- Usa indentazione a 4 spazi
- Nomi di variabili e funzioni in camelCase
- Commenti in inglese per il codice, italiano per i commenti educativi
- Mantieni le funzioni piccole e focalizzate

### 🧪 **Testing**
- Testa sempre le modifiche localmente
- Verifica che multiplayer e campaign mode funzionino
- Testa su diversi browser (Chrome, Firefox, Safari)
- Assicurati che non ci siano errori nella console

### 📚 **Documentazione**
- Aggiorna la documentazione per nuove funzionalità
- Aggiungi commenti per codice complesso
- Mantieni aggiornato il README.md se necessario

## 🎮 **Aree di Sviluppo**

### 🚀 **Priorità Alta**
- [ ] Miglioramenti all'AI
- [ ] Sistema di power-ups
- [ ] Controlli touch per mobile
- [ ] Sistema di achievement

### 🎯 **Priorità Media**
- [ ] Modalità team (2v2)
- [ ] Sistema replay
- [ ] Dashboard analytics
- [ ] Integrazione LMS

### 🔮 **Idee Future**
- [ ] Modalità VR
- [ ] Integrazione con piattaforme educative
- [ ] Sistema di leaderboard globale
- [ ] Modalità personalizzate

## 🎓 **Focus Educativo**

Ricorda che questo è un **gioco educativo**. Ogni modifica dovrebbe:

1. **Mantenere l'aspetto formativo** - Non compromettere gli obiettivi pedagogici
2. **Migliorare l'esperienza di apprendimento** - Rendere il gioco più coinvolgente
3. **Supportare il Ciclo di Kolb** - Facilitare l'apprendimento esperienziale
4. **Essere accessibile** - Funzionare per diversi tipi di utenti

## 🔧 **Setup di Sviluppo**

### Prerequisiti
- Node.js 14+
- NPM 6+
- Git

### Installazione
```bash
# Clone del repository
git clone https://github.com/[tuo-username]/tron-light-cycles.git
cd tron-light-cycles

# Installazione dipendenze
npm install

# Avvio in modalità sviluppo
npm run dev
```

### Struttura del Progetto
```
tron-light-cycles/
├── game.js              # Logica principale del gioco
├── server.js            # Backend Node.js
├── style.css            # Stili CSS
├── index.html           # Interfaccia utente
├── package.json         # Configurazione progetto
└── docs/                # Documentazione
```

## 📝 **Processo di Review**

### Pull Request
1. **Descrizione chiara** - Spiega cosa fa la modifica
2. **Impatto educativo** - Come migliora l'esperienza formativa
3. **Testing** - Evidenza che funziona correttamente
4. **Documentazione** - Aggiornamenti necessari

### Review Criteria
- ✅ Codice funzionante e testato
- ✅ Mantiene gli obiettivi educativi
- ✅ Non introduce bug
- ✅ Documentazione aggiornata
- ✅ Stile del codice consistente

## 🎯 **Esempi di Contributi**

### 🐛 **Bug Fix**
```javascript
// Prima (bug)
if (player.x < 0) {
    player.alive = false; // Crash immediato
}

// Dopo (fix)
if (player.x < 0 || player.x >= canvasWidth) {
    player.alive = false;
    playSoundExplosion(); // Feedback audio
}
```

### 💡 **Nuova Funzionalità**
```javascript
// Aggiunta di un power-up
class PowerUp {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type; // 'speed', 'shield', 'slow'
        this.active = true;
    }
    
    applyEffect(player) {
        switch(this.type) {
            case 'speed':
                player.changeSpeed(1);
                break;
            case 'shield':
                player.shield = true;
                break;
        }
    }
}
```

## 📞 **Supporto**

- 💬 **Discussioni**: Usa le GitHub Discussions per domande generali
- 🐛 **Bug**: Crea un issue con il template appropriato
- 💡 **Feature**: Proponi nuove idee
- 📧 **Contatto**: [Email del team]

## 📄 **Licenza**

Contribuendo a questo progetto, accetti che le tue modifiche saranno rilasciate sotto la licenza MIT.

## 🙏 **Grazie**

Ogni contributo, grande o piccolo, è apprezzato! Insieme possiamo rendere TRON Light Cycles un strumento educativo ancora più potente.

---

**🎮 Buon coding e buona formazione! 🧠**
