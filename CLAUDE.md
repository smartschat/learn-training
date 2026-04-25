# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive learning app for 5th grade German students learning English. Each module is an HTML application that shares common functionality via `common.js`. No build tools or server required.

## Development

Open any HTML file directly in a browser to test. No build or install steps.

**Files:**
- `index.html` - Main menu linking to all modules
- `common.js` - Shared utilities (shuffleArray, normalizeAnswer, showFeedback, celebrate, updateScore, completion modal)
- `can-cant.html` - Modal verbs (can/can't)
- `possessive-s.html` - Possessive forms
- `simple-present.html` - Present tense conjugation
- `pronunciation.html` - Pronunciation practice (/uː/ sounds, /ɔː/ sounds, s-sounds)
- `questions.html` - Questions in Simple Present (Do/Does, question words, short answers)
- `adverbs.html` - Adverbs of frequency (never, sometimes, often, usually, always) with word order rules
- `capitalization.html` - Capitalization rules (pronoun "I", names, days, months, countries, nationalities/languages)
- `club-writing.html` - Freeform writing about school clubs with LLM-generated scenarios and LLM grading (OpenAI API)
- `config.example.js` - Template for OpenAI API key configuration
- `config.js` - (gitignored) Actual API key file, copied from config.example.js
- `wortarten.html` - German grammar: Wortarten (parts of speech) and Satzglieder (sentence constituents)

## Architecture

Each module follows the same self-contained pattern:

1. **HTML + common.js** with embedded CSS and module-specific JavaScript; shared functions in `common.js`
2. **Question database** as JavaScript object with categories (e.g., `questions.statements`, `questions.negation`)
3. **Question types**: `translate` (German↔English), `choice` (multiple choice), `fill` (fill-in-blank), `order` (word ordering), `identify`/`s-identify` (sound identification), `column-sort` (drag words into columns), `word-tag` (assign Wortart to each word), `find-all` (find all words of a type), `span-bracket` (assign Satzglieder to word groups)
4. **State management**: `currentQuestion`, `currentCategory`, `score`, `streak`, `correctlyAnswered` (Set)
5. **Core functions**: `nextQuestion()`, `displayQuestion()`, `checkAnswer()` (module-specific); `normalizeAnswer()`, `showFeedback()`, `shuffleArray()`, `celebrate()`, `updateScore()`, `showCompletion()` (from common.js)
6. **Completion modal**: When all questions in a category are answered correctly, a "Geschafft!" modal appears. Configured per module via `initCommon()` with accent colors and restart callback.

## Key Patterns

- German UI throughout (`Richtig`, `Falsch`, `Nächste Frage`, etc.)
- Multiple choice options are shuffled; `data-original-index` attribute tracks correct answer
- Answer normalization removes punctuation and case for flexible matching
- `altEnglish`/`altGerman` fields allow multiple correct answers
- Collapsible grammar tips update based on selected category
- Streak counter triggers celebration animation every 5 correct answers
