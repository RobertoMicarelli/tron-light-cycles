# 📊 Progressione Livelli - TRON Light Cycles

> **Guida completa alla progressione dei nemici e difficoltà AI**

---

## 🎯 **Logica di Progressione**

### **📈 Regola Principale:**
- **Livelli 1-3:** +1 nemico per livello (tutorial)
- **Livelli 4+:** +1 nemico ogni 2 livelli

### **🔢 Formula Matematica:**
```javascript
if (level <= 3) {
    return level;  // 1, 2, 3
} else {
    return 3 + Math.floor((level - 3) / 2);
}
```

---

## 📊 **Tabella Progressione Completa**

| Livello | Nemici | AI Level | Note | Cambio |
|---------|--------|----------|------|--------|
| **1** | 1 | 5 | Tutorial | +1 |
| **2** | 2 | 6 | Facile | +1 |
| **3** | 3 | 7 | Medio | +1 |
| **4** | 3 | 8 | Stabile | = |
| **5** | 4 | 9 | Aumenta! | +1 |
| **6** | 4 | 10 | Stabile | = |
| **7** | 5 | 10 | Aumenta! | +1 |
| **8** | 5 | 10 | Stabile | = |
| **9** | 6 | 10 | Aumenta! | +1 |
| **10** | 6 | 10 | Stabile | = |
| **11** | 7 | 10 | Aumenta! | +1 |
| **12** | 7 | 10 | Stabile | = |
| **13** | 8 | 10 | Aumenta! | +1 |
| **14** | 8 | 10 | Stabile | = |
| **15** | 9 | 10 | Aumenta! | +1 |
| **...** | **...** | **10** | **Continua...** | **+1 ogni 2** |

---

## 🎮 **Esperienza di Gioco**

### **🏁 Fase Tutorial (Livelli 1-3)**
- **Obiettivo:** Imparare i controlli
- **Nemici:** 1 → 2 → 3
- **AI:** Facile (Level 5-7)
- **Durata:** ~5 minuti

### **⚡ Fase Sviluppo (Livelli 4-6)**
- **Obiettivo:** Consolidare le strategie
- **Nemici:** 3 → 4 → 4
- **AI:** Media (Level 8-10)
- **Durata:** ~10 minuti

### **🔥 Fase Esperta (Livelli 7+)**
- **Obiettivo:** Sfida massima
- **Nemici:** 5+ (aumenta ogni 2 livelli)
- **AI:** Massima (Level 10)
- **Durata:** Infinita

---

## 🧠 **Intelligenza Artificiale**

### **📊 Livelli AI:**
- **Level 5-6:** 40-60% scelte ottimali (Facile)
- **Level 7-8:** 70-85% scelte ottimali (Medio)
- **Level 9-10:** 95% scelte ottimali (Difficile)

### **🎯 Comportamenti AI:**
- **Livelli 1-3:** Movimento casuale, errori frequenti
- **Livelli 4-6:** Strategia base, evita collisioni
- **Livelli 7-8:** Strategia aggressiva, cerca di bloccare
- **Livelli 9-10:** Strategia avanzata, predizione mosse

---

## 🔍 **Debug Console**

Quando giochi, nella console (F12) vedrai:

```
🔢 Calcolando nemici per livello 5:
   📊 Livelli 4+: 4 nemici (formula: 3 + floor((5 - 3) / 2))

👾 Livello 5: 4 nemici (AI Level 9)

📊 PROGRESSIONE LIVELLI:
┌─────────┬─────────┬─────────┬─────────┐
│ Livello │ Nemici  │ AI Level│ Note    │
├─────────┼─────────┼─────────┼─────────┤
│    1    │    1    │    5    │ Tutorial│
│    2    │    2    │    6    │ Tutorial│
│    3    │    3    │    7    │ Tutorial│
│    4    │    3    │    8    │ Stabile │
│    5    │    4    │    9    │ Aumenta!│ 👈
│    6    │    4    │   10    │ Stabile │
│    7    │    5    │   10    │ Aumenta!│
└─────────┴─────────┴─────────┴─────────┘
📈 REGOLA: +1 nemico ogni 2 livelli dal livello 4
```

---

## 🎯 **Obiettivi Formativi**

### **🏆 Competenze Sviluppate:**
1. **Decision-making rapido** - Pressione temporale crescente
2. **Gestione complessità** - Più nemici = più variabili
3. **Strategia adattiva** - AI più intelligente richiede nuove strategie
4. **Resilienza** - Fallimenti frequenti insegnano perseveranza

### **📚 Collegamento Ciclo Kolb:**
- **Concrete Experience:** Gioco attivo con difficoltà crescente
- **Reflective Observation:** Analisi errori e strategie vincenti
- **Abstract Conceptualization:** Principi generali di gestione complessità
- **Active Experimentation:** Nuove strategie nei livelli successivi

---

## 🛠️ **Personalizzazione**

### **Modificare la Progressione:**
```javascript
// In game.js, funzione calculateEnemies()
function calculateEnemies(level) {
    if (level <= 3) {
        return level;  // Tutorial: 1, 2, 3
    } else {
        // Cambia questa formula per modificare la progressione
        return 3 + Math.floor((level - 3) / 2);
    }
}
```

### **Esempi di Progressioni Alternative:**

#### **Progressione Lineare:**
```javascript
return Math.min(level, 10);  // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10...
```

#### **Progressione Esponenziale:**
```javascript
return Math.min(Math.floor(level * 1.5), 15);  // 1, 3, 4, 6, 7, 9, 10, 12, 13, 15, 15...
```

#### **Progressione Personalizzata:**
```javascript
const customProgression = [1, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10];
return customProgression[Math.min(level - 1, customProgression.length - 1)];
```

---

## 📈 **Metriche di Successo**

### **🎯 Indicatori di Apprendimento:**
- **Livello raggiunto:** Misura della perseveranza
- **Round vinti:** Misura della strategia
- **Tempo di sopravvivenza:** Misura della gestione stress
- **Velocità media:** Misura del bilanciamento rischio/controllo

### **📊 Profili di Giocatore:**
- **Aggressivo:** Alta velocità, bassa sopravvivenza
- **Difensivo:** Bassa velocità, alta sopravvivenza  
- **Bilanciato:** Velocità media, sopravvivenza media
- **Adattivo:** Cambia strategia in base al livello

---

**🎮 Buon gioco e buon apprendimento! 🧠**
