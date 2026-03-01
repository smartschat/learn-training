# Lern-Training

Interactive learning app for 5th grade students at German Gymnasium. Built as single-file HTML applications with no external dependencies.

## Modules

### English

- **Can / Can't** - Practice modal verbs for abilities: statements, questions, short answers, negation, and word order
- **Possessive 's** - Learn possessive forms: singular 's, plural s', irregular plurals, and when to use "of"
- **Simple Present** - Practice present tense: he/she/it + s, verbs ending in -y, special verbs (have/go/do), and negation with don't/doesn't
- **Pronunciation** - Train the long /uː/ sound, the /ɔː/ sound, and s-sounds (/s/ vs /z/ vs /ɪz/) in plurals
- **Questions** - Practice questions in Simple Present: Do/Does, question words, and short answers
- **Adverbs of Frequency** - Learn adverbs like never, sometimes, often, usually, always and their word order in sentences
- **Capitalization Rules** - Practice English capitalization: pronoun "I", names, days, months, countries, nationalities and languages
- **Club Writing** - Freeform writing about school clubs with LLM-generated scenarios and AI feedback on content, grammar, and vocabulary

## Features

- German UI for native German speakers learning English
- Multiple exercise types: multiple choice, fill-in-the-blank, translation, word ordering, verb conjugation, column sorting, sound identification, freeform writing
- Randomized answer order in multiple choice questions
- Score tracking with streak counter
- Collapsible grammar tips for each category
- Celebration animations for streaks
- Audio pronunciation using Web Speech API

## Usage

Open `index.html` in a browser to access the main menu, or open any module directly:

```
index.html          - Main menu
can-cant.html       - Can/Can't module
possessive-s.html   - Possessive 's module
simple-present.html - Simple Present module
pronunciation.html  - Pronunciation module
questions.html      - Questions module
adverbs.html        - Adverbs of Frequency module
capitalization.html - Capitalization Rules module
club-writing.html   - Club Writing module (requires API key)
```

No server required - works directly from the filesystem.

### Club Writing Setup

The Club Writing module uses the OpenAI API for generating scenarios and grading. To set it up:

1. Copy `config.example.js` to `config.js`
2. Add your OpenAI API key to `config.js`
