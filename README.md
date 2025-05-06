# Focus App

A modern, elegant Pomodoro timer application built with Next.js and TypeScript. This app helps you maintain focus and productivity through structured work and rest cycles.

## Features

- 🎯 **Customizable Focus Sessions**
  - Adjustable focus duration
  - Configurable short and long break periods
  - Set your daily session goals

- 🎨 **Beautiful UI**
  - Clean, modern interface
  - Smooth animations and transitions
  - Dark/Light mode support
  - Responsive design

- ⏱️ **Smart Timer**
  - Visual countdown timer
  - Metronome feature for focus sessions
  - Audio notifications for session transitions
  - Session progress tracking

- ⚙️ **User Settings**
  - Customize session durations
  - Set daily session goals
  - Toggle between dark and light themes
  - Adjust audio preferences

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd focus-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to start using the app.

## Usage

1. **Starting a Session**
   - Click the "Start" button to begin your focus session
   - The timer will count down from your set focus duration
   - A metronome will help maintain your focus rhythm

2. **Break Time**
   - After each focus session, a short break will automatically start
   - Every 4 sessions, you'll get a longer break
   - Audio notifications will alert you when sessions change

3. **Customizing Settings**
   - Click the ⚙️ Settings button to adjust:
     - Focus duration (default: 25 minutes)
     - Short break duration (default: 5 minutes)
     - Long break duration (default: 30 minutes)
     - Daily session goal

4. **Theme Switching**
   - Toggle between dark and light modes using the theme button
   - Your preference will be maintained across sessions

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- Geist Font
- React Hooks

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
