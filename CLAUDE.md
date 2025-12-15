# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive learning app for 5th grade German students learning English. Each module is a standalone single-file HTML application with no external dependencies, build tools, or server required.

## Development

Open any HTML file directly in a browser to test. No build or install steps.

**Files:**
- `index.html` - Main menu linking to all modules
- `can-cant.html` - Modal verbs (can/can't)
- `possessive-s.html` - Possessive forms
- `simple-present.html` - Present tense conjugation
- `pronunciation.html` - Audio pronunciation (/uː/ sounds, s-sounds) using Web Speech API

## Architecture

Each module follows the same self-contained pattern:

1. **Single-file HTML** with embedded CSS and JavaScript (no external files)
2. **Question database** as JavaScript object with categories (e.g., `questions.statements`, `questions.negation`)
3. **Question types**: `translate` (German↔English), `choice` (multiple choice), `fill` (fill-in-blank), `order` (word ordering), `identify`/`s-identify` (sound identification), `column-sort` (drag words into columns)
4. **State management**: `currentQuestion`, `currentCategory`, `score`, `streak`, `answeredQuestions`
5. **Core functions**: `nextQuestion()`, `displayQuestion()`, `checkAnswer()`, `normalizeAnswer()`

## Key Patterns

- German UI throughout (`Richtig`, `Falsch`, `Nächste Frage`, etc.)
- Multiple choice options are shuffled; `data-original-index` attribute tracks correct answer
- Answer normalization removes punctuation and case for flexible matching
- `altEnglish`/`altGerman` fields allow multiple correct answers
- Collapsible grammar tips update based on selected category
- Streak counter triggers celebration animation every 5 correct answers
