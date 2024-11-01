# Career Orientation Quiz

An interactive web application that helps users discover career opportunities in the beauty and cosmetics industry based on their preferences and competencies.

## Overview

This quiz application guides users through a series of questions across three main categories:
- Functional Fields (Sales, Marketing, Management, etc.)
- Career Levels (Entry-Level to Executive Leadership)
- Competencies (Communication, Leadership, Technical Skills, etc.)

Based on user responses, the application recommends suitable career paths within the beauty and cosmetics sector.

## Features

- Interactive questionnaire with multiple-choice questions
- Three distinct assessment categories
- Dynamic job recommendations based on user responses
- Mobile-responsive design
- French language interface

## Technical Stack

- HTML5
- CSS (with Tailwind CSS framework)
- Vanilla JavaScript (ES6+)
- Modular JavaScript architecture

## Project Structure

```
├── index.html
├── script.js
├── data/
│   ├── categories.js
│   ├── jobs.js
│   └── questions.js
└── scripts/
    └── generate-jobs-json.js
```

## Setup

1. Clone the repository
2. No build process required - open `index.html` in a web browser
3. For development, serve the files through a local web server due to ES6 modules

## Data Structure

The application uses several data categories:

- **Functional Fields**: Different business areas (Sales, Marketing, etc.)
- **Career Levels**: Professional experience levels
- **Competencies**: Key skills and abilities
- **Jobs**: Comprehensive list of career opportunities