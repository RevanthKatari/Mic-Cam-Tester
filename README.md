# 🎤📹 Mic & Camera Tester

A beautiful, privacy-focused web application for testing microphones and cameras with real-time feedback. No data leaves your device - everything runs locally in your browser.

## 🚀 **Live Demo**
**👉 [https://mic-cam.vercel.app/](https://mic-cam.vercel.app/)**

![Mic Camera Tester](https://img.shields.io/badge/privacy-focused-green) ![Progressive Web App](https://img.shields.io/badge/PWA-enabled-blue) ![Mobile Friendly](https://img.shields.io/badge/mobile-friendly-brightgreen)

## ✨ Features

### 🎤 Microphone Testing
- **Device Selection**: List and select from all available microphones
- **Real-time Visualization**: Smooth, animated waveform display
- **Volume Indicator**: Live volume level with percentage display
- **Device Labels**: Shows actual microphone names (e.g., "Realtek Mic", "Sony WF-1000XM5")

### 📹 Camera Testing
- **Device Selection**: List and select from all available cameras
- **Live Preview**: Real-time video feed display
- **Resolution Display**: Shows current camera resolution (e.g., "1280 × 720")
- **Device Labels**: Shows actual camera names (e.g., "Logitech C270", "MacBook Camera")

### 🔒 Privacy & Permissions
- **Clear Permission Status**: Visual indicators for mic/camera access
- **Friendly Error Messages**: Helpful guidance when permissions are blocked
- **100% Local**: No data transmission - everything stays on your device

### 🎨 User Experience
- **Dark Mode**: Smooth theme toggle with system preference detection
- **Mobile-First**: Responsive design that works perfectly on all devices
- **Smooth Animations**: Buttery-smooth waveforms and transitions
- **Accessibility**: Full keyboard navigation and screen reader support

### 🌍 Internationalization
- **Auto Language Detection**: Automatically detects browser language
- **Multiple Languages**: English, Spanish, French, German support
- **RTL Support**: Ready for right-to-left languages

### 📱 Progressive Web App
- **Install as App**: Add to home screen on mobile devices
- **Offline Ready**: Works without internet connection
- **App Shortcuts**: Quick access to mic or camera testing

## 🚀 Quick Start

1. **Clone or Download**
   ```bash
   git clone https://github.com/yourusername/mic-camera-tester.git
   cd mic-camera-tester
   ```

2. **Serve the Files**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in Browser**
   Navigate to `http://localhost:8000`

## 🎯 How to Use

### Testing Your Microphone
1. Click the microphone dropdown to see available devices
2. Select your desired microphone
3. Allow microphone access when prompted
4. Speak into your microphone to see the real-time waveform
5. Monitor the volume indicator for input levels

### Testing Your Camera
1. Click the camera dropdown to see available devices
2. Select your desired camera
3. Allow camera access when prompted
4. View the live camera preview
5. Check the resolution display for video quality

### Keyboard Shortcuts
- `Alt + M`: Toggle microphone test
- `Alt + C`: Toggle camera test
- `Alt + T`: Toggle dark/light theme

## 🔧 Technical Details

### Browser Compatibility
- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support (iOS 14.3+)
- **Mobile Browsers**: Optimized for mobile use

### Technologies Used
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with custom properties and animations
- **JavaScript ES6+**: Modern JavaScript with async/await
- **Web APIs**:
  - MediaDevices API for device enumeration
  - getUserMedia API for media access
  - Web Audio API for microphone visualization
  - Canvas API for smooth waveform rendering

### Performance Features
- **Hardware Acceleration**: GPU-accelerated animations
- **Optimized Rendering**: Efficient canvas drawing with devicePixelRatio
- **Memory Management**: Proper cleanup of media streams
- **Smooth Framerate**: RequestAnimationFrame for 60fps animations

## 🛡️ Privacy & Security

### Data Protection
- **No Server Communication**: Everything runs in your browser
- **No Recording**: Audio and video are not saved
- **No Analytics**: No tracking or data collection
- **Permission Respect**: Only requests necessary permissions

### Security Features
- **Content Security Policy**: Prevents XSS attacks
- **HTTPS Ready**: Secure connection support
- **No External Dependencies**: All code is self-contained

## 🎨 Customization

### Themes
The app supports light and dark themes with smooth transitions:
- **Light Theme**: Clean, modern interface
- **Dark Theme**: Easy on the eyes for low-light use
- **System Preference**: Automatically matches your system setting

### Colors
Customize the color scheme by modifying CSS custom properties in `styles.css`:
```css
:root {
  --accent-primary: #667eea;
  --accent-secondary: #764ba2;
  /* ... other colors */
}
```

## 🌍 Adding New Languages

1. Open `script.js`
2. Add your language to the `translations` object:
```javascript
const translations = {
  // ... existing languages
  'your-lang': {
    title: "Your Translation",
    // ... other translations
  }
};
```

## 📱 Progressive Web App Features

### Installation
Users can install the app on their devices:
- **Desktop**: Click the install button in the address bar
- **Mobile**: Use "Add to Home Screen" option

### Offline Support
The app works offline after the first visit thanks to service worker caching.

### App Shortcuts
Quick actions available from the app icon:
- Test Microphone
- Test Camera

## 🚀 SEO Optimization

### Meta Tags
- Comprehensive Open Graph tags for social sharing
- Twitter Card support for rich previews
- Structured data for search engines

### Performance
- Optimized loading with critical CSS inlining
- Efficient asset delivery
- Fast Time to Interactive (TTI)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Icons and design inspiration from modern UI/UX principles
- Web API documentation from MDN
- Accessibility guidelines from WCAG 2.1

## 📞 Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Ensure your browser supports the required Web APIs
3. Verify microphone/camera permissions are granted
4. Try refreshing the page

---

**Made with ❤️ for privacy and user experience**

> This application respects your privacy. No data leaves your device, and no personal information is collected or transmitted. 