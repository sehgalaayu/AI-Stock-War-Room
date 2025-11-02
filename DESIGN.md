# 🎨 AI Stock War Room - UI Design Guide

## 🌙 Dark Theme Design

### Color Palette
- **Background**: Dark gradient (gray-900 → purple-900 → gray-900)
- **Cards**: Glass morphism effect (backdrop-blur + white/10)
- **Primary**: Purple-600 to Pink-600 gradient
- **Text**: White with gray-400 for secondary
- **Success**: Green-400 to Emerald-400 gradient
- **Borders**: White/20 opacity

### Visual Effects
- ✨ **Glass Morphism**: Backdrop blur with semi-transparent backgrounds
- 🌈 **Gradient Text**: Purple to pink for headings
- 💫 **Transparent Borders**: Subtle white borders with 20% opacity
- 🎯 **Hover Effects**: Smooth transitions on interactive elements
- 📊 **Charts**: Green gradient areas with smooth curves

## 📱 Layout Structure

### Header
- Title with gradient text
- Connection status indicator (Live/Offline)
- Logout button

### Tabs Navigation
- **All Stocks**: View all available stocks
- **Watchlists**: Manage custom watchlists

### Stock Cards
- Symbol and company name
- Current price with gradient
- Mini price chart (last 20 updates)
- AI Analysis button

### AI Analysis Panel
- Expandable modal
- Formatted analysis text
- Timestamp

### Watchlists Section
- Create new watchlist input
- List of existing watchlists
- Empty state message

## 🎯 Features

### Real-time Updates
- Prices update every 30 seconds via WebSocket
- Charts show last 20 price points
- Smooth animations

### Interactive Elements
- AI Analysis buttons per stock
- Create watchlist input
- Tab switching
- Responsive design

### Charts
- Green gradient area charts
- Responsive to container width
- Shows price trends
- Clean minimalist design

## 💻 Responsive Design

- **Mobile**: 1 column grid
- **Tablet**: 2 columns
- **Desktop**: 3 columns

## 🎨 Component Styles

### Cards
```css
backdrop-blur-xl
bg-white/10
border border-white/20
rounded-2xl
shadow-2xl
```

### Buttons
```css
Primary: bg-gradient-to-r from-purple-600 to-pink-600
Secondary: bg-white/10 backdrop-blur-sm
Hover: Enhanced opacity/color transitions
```

### Text
```css
Headings: gradient-to-r from-purple-400 to-pink-400
Body: text-white
Secondary: text-gray-400
```

## 🚀 Future Enhancements

- [ ] Dark/Light theme toggle
- [ ] More chart types (candlestick, volume)
- [ ] Interactive chart zoom
- [ ] Watchlist customization
- [ ] Stock comparison view
- [ ] Mobile app version

---

**Design Philosophy**: Minimal, modern, dark-focused with glass morphism effects for a premium feel.
