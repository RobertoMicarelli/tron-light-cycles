# 🚀 Deploy su Vercel - TRON Light Cycles

> **Guida specifica per il deploy su Vercel con le differenze rispetto ad altre piattaforme**

---

## 🔄 **Cosa Cambia su Vercel**

### ⚠️ **Limitazioni Importanti**

1. **🚫 Backend Node.js NON supportato** - Vercel è ottimizzato per frontend statici
2. **🌐 Solo frontend** - Il multiplayer online non funzionerà
3. **📱 Modalità Campaign** - Funziona perfettamente (solo frontend)
4. **🔧 Configurazione speciale** - Serve file di configurazione specifico

---

## 🎯 **Cosa Funziona su Vercel**

### ✅ **Modalità Campaign**
- ✅ Gioco single-player vs AI
- ✅ Tutti i livelli progressivi
- ✅ Sistema educativo completo
- ✅ Debrief formativo
- ✅ Tutti gli effetti visivi e audio

### ❌ **Cosa NON Funziona**
- ❌ Multiplayer online (richiede server Node.js)
- ❌ Matchmaking automatico
- ❌ Chat integrata
- ❌ Sincronizzazione real-time

---

## 🛠️ **Configurazione per Vercel**

### 1️⃣ **Crea vercel.json**

Crea questo file nella root del progetto:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "functions": {
    "app/api/**/*.js": {
      "runtime": "nodejs18.x"
    }
  }
}
```

### 2️⃣ **Modifica game.js per Vercel**

Aggiungi questa configurazione all'inizio di `game.js`:

```javascript
// Configurazione per Vercel (solo frontend)
const IS_VERCEL = window.location.hostname.includes('vercel.app');

// Disabilita multiplayer su Vercel
if (IS_VERCEL) {
    console.log('🌐 Modalità Vercel: Solo Campaign disponibile');
    // Nascondi opzione multiplayer
    document.addEventListener('DOMContentLoaded', () => {
        const multiplayerCard = document.querySelector('.mode-card[onclick*="multiplayer"]');
        if (multiplayerCard) {
            multiplayerCard.style.display = 'none';
        }
    });
}
```

### 3️⃣ **Aggiorna index.html**

Modifica la sezione mode selection:

```html
<!-- Aggiungi questo script prima della chiusura </body> -->
<script>
// Nascondi multiplayer su Vercel
if (window.location.hostname.includes('vercel.app')) {
    document.addEventListener('DOMContentLoaded', () => {
        const multiplayerCard = document.querySelector('.mode-card[onclick*="multiplayer"]');
        if (multiplayerCard) {
            multiplayerCard.innerHTML = `
                <h2>🌐 MULTIPLAYER</h2>
                <p>Non disponibile su Vercel</p>
                <p class="mode-detail">• Usa Replit o Heroku per multiplayer</p>
                <p class="mode-detail">• Campaign mode funziona perfettamente</p>
                <button class="btn-secondary" disabled>NON DISPONIBILE</button>
            `;
        }
    });
}
</script>
```

---

## 🚀 **Deploy su Vercel**

### Opzione 1: Deploy da GitHub (Consigliato)

1. **Vai su [vercel.com](https://vercel.com)**
2. **Clicca "New Project"**
3. **Importa da GitHub:**
   ```
   Repository: RobertoMicarelli/tron-light-cycles
   Framework Preset: Other
   Root Directory: ./
   ```
4. **Configurazione:**
   ```
   Build Command: (lascia vuoto)
   Output Directory: ./
   Install Command: (lascia vuoto)
   ```
5. **Clicca "Deploy"**

### Opzione 2: Vercel CLI

```bash
# Installa Vercel CLI
npm i -g vercel

# Nel progetto
vercel

# Segui le istruzioni
# - Link to existing project: No
# - Project name: tron-light-cycles
# - Directory: ./
```

---

## ⚙️ **Configurazione Avanzata**

### 🔧 **vercel.json Completo**

```json
{
  "version": 2,
  "name": "tron-light-cycles",
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    },
    {
      "src": "game.js",
      "use": "@vercel/static"
    },
    {
      "src": "style.css",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/",
      "dest": "/index.html"
    },
    {
      "src": "/(.*\\.(js|css|html|png|jpg|jpeg|gif|ico|svg))",
      "dest": "/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 🎨 **Personalizzazione per Vercel**

Crea un file `vercel-custom.js`:

```javascript
// vercel-custom.js
const isVercel = window.location.hostname.includes('vercel.app');

if (isVercel) {
    // Personalizza l'esperienza per Vercel
    document.addEventListener('DOMContentLoaded', () => {
        // Aggiungi banner informativo
        const banner = document.createElement('div');
        banner.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(90deg, #00FFFF, #FFD700);
            color: #000;
            text-align: center;
            padding: 10px;
            font-family: 'Press Start 2P', monospace;
            font-size: 0.7rem;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,255,255,0.5);
        `;
        banner.innerHTML = '🌐 VERCEL MODE: Solo Campaign disponibile | Per multiplayer usa Replit/Heroku';
        document.body.appendChild(banner);
        
        // Aggiusta il padding del body
        document.body.style.paddingTop = '50px';
    });
}
```

---

## 📊 **Confronto Piattaforme**

| Funzionalità | Vercel | Replit | Heroku | Railway |
|--------------|--------|--------|--------|---------|
| **Campaign Mode** | ✅ | ✅ | ✅ | ✅ |
| **Multiplayer** | ❌ | ✅ | ✅ | ✅ |
| **Deploy Speed** | ⚡⚡⚡ | ⚡⚡ | ⚡ | ⚡⚡ |
| **Setup Complexity** | 🟢 Facile | 🟢 Facile | 🟡 Medio | 🟢 Facile |
| **Costo** | 🆓 Gratis | 🆓 Gratis | 💰 Freemium | 💰 Freemium |
| **Custom Domain** | ✅ | ❌ | ✅ | ✅ |

---

## 🎯 **Quando Usare Vercel**

### ✅ **Usa Vercel se:**
- Vuoi solo la modalità Campaign
- Hai bisogno di deploy ultra-veloce
- Vuoi un dominio personalizzato gratuito
- Preferisci un setup semplice
- Non ti serve multiplayer

### ❌ **Non usare Vercel se:**
- Hai bisogno di multiplayer online
- Vuoi tutte le funzionalità
- Hai bisogno di un backend completo

---

## 🚀 **Deploy Completo con Tutte le Funzionalità**

Per avere **tutte le funzionalità** (incluso multiplayer), usa:

### 🥇 **Replit (Consigliato)**
```bash
# Vai su replit.com
# Import from GitHub: RobertoMicarelli/tron-light-cycles
# Click Run
# FATTO! 🎉
```

### 🥈 **Heroku**
```bash
# Installa Heroku CLI
# heroku create tron-light-cycles-[tuo-nome]
# git push heroku main
```

### 🥉 **Railway**
```bash
# Vai su railway.app
# Deploy from GitHub
# Seleziona repository
# Deploy automatico
```

---

## 📝 **Checklist Vercel**

- [ ] ✅ Creato `vercel.json`
- [ ] ✅ Modificato `game.js` per Vercel
- [ ] ✅ Aggiornato `index.html`
- [ ] ✅ Testato modalità Campaign
- [ ] ✅ Verificato che multiplayer sia disabilitato
- [ ] ✅ Deploy completato
- [ ] ✅ Testato su URL Vercel

---

## 🎮 **Risultato Finale**

Con Vercel avrai:
- ✅ **Campaign mode completo** con tutti i livelli
- ✅ **Sistema educativo** funzionante
- ✅ **Deploy ultra-veloce** (30 secondi)
- ✅ **URL pubblico** immediato
- ✅ **Aggiornamenti automatici** da GitHub

**Perfetto per demo, test e uso educativo senza multiplayer!**

---

**🚀 Buon deploy su Vercel! 🎮**
