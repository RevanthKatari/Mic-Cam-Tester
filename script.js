// Global Variables
let audioContext = null;
let analyser = null;
let microphone = null;
let dataArray = null;
let animationId = null;
let currentMicStream = null;
let currentCameraStream = null;
let currentLanguage = 'en';

// DOM Elements
const elements = {
    loadingScreen: null,
    themeToggle: null,
    micSelect: null,
    cameraSelect: null,
    micTestBtn: null,
    cameraTestBtn: null,
    micVisualizer: null,
    cameraPreview: null,
    cameraPlaceholder: null,
    volumeFill: null,
    volumeLevel: null,
    resolutionDisplay: null,
    micInfo: null,
    cameraInfo: null,
    micPermissionIcon: null,
    cameraPermissionIcon: null,
    micPermissionText: null,
    cameraPermissionText: null,
    errorContainer: null
};

// Localization data
const translations = {
    en: {
        loading: "Loading...",
        title: "Mic & Camera Tester",
        subtitle: "Test your audio and video devices with real-time feedback",
        mic_permission: "Microphone Access",
        camera_permission: "Camera Access",
        checking: "Checking...",
        granted: "Granted",
        denied: "Denied",
        microphone: "Microphone",
        camera: "Camera",
        select_microphone: "Select Microphone:",
        select_camera: "Select Camera:",
        no_devices: "No devices found",
        start_test: "Start Test",
        stop_test: "Stop Test",
        start_preview: "Start Preview",
        stop_preview: "Stop Preview",
        volume: "Volume:",
        resolution: "Resolution:",
        select_mic_to_start: "Select a microphone to start testing",
        select_camera_to_start: "Select a camera to start preview",
        privacy_note: "Your audio and video data stays on your device - nothing is recorded or transmitted.",
        made_with: "Made with ❤️ for privacy",
        error_no_microphone: "No microphone devices found. Please connect a microphone and refresh the page.",
        error_no_camera: "No camera devices found. Please connect a camera and refresh the page.",
        error_mic_permission: "Microphone access denied. Please allow microphone access and refresh the page.",
        error_camera_permission: "Camera access denied. Please allow camera access and refresh the page.",
        error_mic_failed: "Failed to access microphone. Please check your device and try again.",
        error_camera_failed: "Failed to access camera. Please check your device and try again.",
        error_not_supported: "Your browser doesn't support this feature. Please use a modern browser."
    },
    es: {
        loading: "Cargando...",
        title: "Probador de Micrófono y Cámara",
        subtitle: "Prueba tus dispositivos de audio y video con retroalimentación en tiempo real",
        mic_permission: "Acceso al Micrófono",
        camera_permission: "Acceso a la Cámara",
        checking: "Verificando...",
        granted: "Concedido",
        denied: "Denegado",
        microphone: "Micrófono",
        camera: "Cámara",
        select_microphone: "Seleccionar Micrófono:",
        select_camera: "Seleccionar Cámara:",
        no_devices: "No se encontraron dispositivos",
        start_test: "Iniciar Prueba",
        stop_test: "Detener Prueba",
        start_preview: "Iniciar Vista Previa",
        stop_preview: "Detener Vista Previa",
        volume: "Volumen:",
        resolution: "Resolución:",
        select_mic_to_start: "Selecciona un micrófono para comenzar la prueba",
        select_camera_to_start: "Selecciona una cámara para comenzar la vista previa",
        privacy_note: "Tus datos de audio y video permanecen en tu dispositivo - nada se graba o transmite.",
        made_with: "Hecho con ❤️ para la privacidad",
        error_no_microphone: "No se encontraron dispositivos de micrófono. Conecta un micrófono y actualiza la página.",
        error_no_camera: "No se encontraron dispositivos de cámara. Conecta una cámara y actualiza la página.",
        error_mic_permission: "Acceso al micrófono denegado. Permite el acceso al micrófono y actualiza la página.",
        error_camera_permission: "Acceso a la cámara denegado. Permite el acceso a la cámara y actualiza la página.",
        error_mic_failed: "Error al acceder al micrófono. Verifica tu dispositivo e inténtalo de nuevo.",
        error_camera_failed: "Error al acceder a la cámara. Verifica tu dispositivo e inténtalo de nuevo.",
        error_not_supported: "Tu navegador no soporta esta funcionalidad. Usa un navegador moderno."
    },
    fr: {
        loading: "Chargement...",
        title: "Testeur de Micro et Caméra",
        subtitle: "Testez vos appareils audio et vidéo avec des commentaires en temps réel",
        mic_permission: "Accès au Microphone",
        camera_permission: "Accès à la Caméra",
        checking: "Vérification...",
        granted: "Accordé",
        denied: "Refusé",
        microphone: "Microphone",
        camera: "Caméra",
        select_microphone: "Sélectionner le Microphone:",
        select_camera: "Sélectionner la Caméra:",
        no_devices: "Aucun appareil trouvé",
        start_test: "Commencer le Test",
        stop_test: "Arrêter le Test",
        start_preview: "Commencer l'Aperçu",
        stop_preview: "Arrêter l'Aperçu",
        volume: "Volume:",
        resolution: "Résolution:",
        select_mic_to_start: "Sélectionnez un microphone pour commencer le test",
        select_camera_to_start: "Sélectionnez une caméra pour commencer l'aperçu",
        privacy_note: "Vos données audio et vidéo restent sur votre appareil - rien n'est enregistré ou transmis.",
        made_with: "Fait avec ❤️ pour la confidentialité",
        error_no_microphone: "Aucun microphone trouvé. Connectez un microphone et actualisez la page.",
        error_no_camera: "Aucune caméra trouvée. Connectez une caméra et actualisez la page.",
        error_mic_permission: "Accès au microphone refusé. Autorisez l'accès au microphone et actualisez la page.",
        error_camera_permission: "Accès à la caméra refusé. Autorisez l'accès à la caméra et actualisez la page.",
        error_mic_failed: "Échec de l'accès au microphone. Vérifiez votre appareil et réessayez.",
        error_camera_failed: "Échec de l'accès à la caméra. Vérifiez votre appareil et réessayez.",
        error_not_supported: "Votre navigateur ne supporte pas cette fonctionnalité. Utilisez un navigateur moderne."
    },
    de: {
        loading: "Laden...",
        title: "Mikrofon & Kamera Tester",
        subtitle: "Testen Sie Ihre Audio- und Videogeräte mit Echtzeit-Feedback",
        mic_permission: "Mikrofonzugriff",
        camera_permission: "Kamerazugriff",
        checking: "Überprüfung...",
        granted: "Gewährt",
        denied: "Verweigert",
        microphone: "Mikrofon",
        camera: "Kamera",
        select_microphone: "Mikrofon auswählen:",
        select_camera: "Kamera auswählen:",
        no_devices: "Keine Geräte gefunden",
        start_test: "Test starten",
        stop_test: "Test stoppen",
        start_preview: "Vorschau starten",
        stop_preview: "Vorschau stoppen",
        volume: "Lautstärke:",
        resolution: "Auflösung:",
        select_mic_to_start: "Wählen Sie ein Mikrofon zum Testen aus",
        select_camera_to_start: "Wählen Sie eine Kamera für die Vorschau aus",
        privacy_note: "Ihre Audio- und Videodaten bleiben auf Ihrem Gerät - nichts wird aufgezeichnet oder übertragen.",
        made_with: "Mit ❤️ für den Datenschutz gemacht",
        error_no_microphone: "Keine Mikrofongeräte gefunden. Schließen Sie ein Mikrofon an und aktualisieren Sie die Seite.",
        error_no_camera: "Keine Kamerageräte gefunden. Schließen Sie eine Kamera an und aktualisieren Sie die Seite.",
        error_mic_permission: "Mikrofonzugriff verweigert. Erlauben Sie den Mikrofonzugriff und aktualisieren Sie die Seite.",
        error_camera_permission: "Kamerazugriff verweigert. Erlauben Sie den Kamerazugriff und aktualisieren Sie die Seite.",
        error_mic_failed: "Fehler beim Zugriff auf das Mikrofon. Überprüfen Sie Ihr Gerät und versuchen Sie es erneut.",
        error_camera_failed: "Fehler beim Zugriff auf die Kamera. Überprüfen Sie Ihr Gerät und versuchen Sie es erneut.",
        error_not_supported: "Ihr Browser unterstützt diese Funktion nicht. Verwenden Sie einen modernen Browser."
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    try {
        initializeElements();
        await detectLanguage();
        setupEventListeners();
        await initializeDevices();
        await registerServiceWorker();
        hideLoadingScreen();
    } catch (error) {
        console.error('Initialization error:', error);
        showError('error_not_supported');
        hideLoadingScreen();
    }
});

// Register service worker for PWA functionality
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        } catch (error) {
            console.log('ServiceWorker registration failed: ', error);
        }
    }
}

// Initialize DOM elements
function initializeElements() {
    elements.loadingScreen = document.getElementById('loading-screen');
    elements.themeToggle = document.getElementById('theme-toggle');
    elements.micSelect = document.getElementById('microphone-select');
    elements.cameraSelect = document.getElementById('camera-select');
    elements.micTestBtn = document.getElementById('mic-test-btn');
    elements.cameraTestBtn = document.getElementById('camera-test-btn');
    elements.micVisualizer = document.getElementById('microphone-visualizer');
    elements.cameraPreview = document.getElementById('camera-preview');
    elements.cameraPlaceholder = document.getElementById('camera-placeholder');
    elements.volumeFill = document.getElementById('volume-fill');
    elements.volumeLevel = document.getElementById('volume-level');
    elements.resolutionDisplay = document.getElementById('resolution-display');
    elements.micInfo = document.getElementById('mic-info');
    elements.cameraInfo = document.getElementById('camera-info');
    elements.micPermissionIcon = document.getElementById('mic-permission-icon');
    elements.cameraPermissionIcon = document.getElementById('camera-permission-icon');
    elements.micPermissionText = document.getElementById('mic-permission-text');
    elements.cameraPermissionText = document.getElementById('camera-permission-text');
    elements.errorContainer = document.getElementById('error-container');

    // Set canvas context for smoother animations
    if (elements.micVisualizer) {
        const ctx = elements.micVisualizer.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
    }
}

// Auto-detect language based on browser settings
async function detectLanguage() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    } else {
        const browserLang = navigator.language.split('-')[0];
        if (translations[browserLang]) {
            currentLanguage = browserLang;
        }
    }
    
    updateLanguage();
}

// Update language throughout the app
function updateLanguage() {
    const t = translations[currentLanguage];
    
    // Update all elements with data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (t[key]) {
            element.textContent = t[key];
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
}

// Setup event listeners
function setupEventListeners() {
    // Theme toggle
    elements.themeToggle?.addEventListener('click', toggleTheme);
    
    // Device selection
    elements.micSelect?.addEventListener('change', handleMicrophoneChange);
    elements.cameraSelect?.addEventListener('change', handleCameraChange);
    
    // Test buttons
    elements.micTestBtn?.addEventListener('click', toggleMicrophoneTest);
    elements.cameraTestBtn?.addEventListener('click', toggleCameraTest);
    
    // Device change detection
    navigator.mediaDevices?.addEventListener('devicechange', refreshDeviceList);
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', cleanup);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(event) {
    if (event.altKey) {
        switch (event.key) {
            case 'm':
                event.preventDefault();
                toggleMicrophoneTest();
                break;
            case 'c':
                event.preventDefault();
                toggleCameraTest();
                break;
            case 't':
                event.preventDefault();
                toggleTheme();
                break;
        }
    }
}

// Theme management
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme === 'dark' ? 'dark' : '');
    localStorage.setItem('theme', newTheme);
    
    // Update theme icon
    const icon = elements.themeToggle?.querySelector('.theme-icon');
    if (icon) {
        icon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    }
    
    // If microphone is active, the waveform colors will automatically update on next frame
    // due to the theme detection in drawWaveform function
}

// Initialize theme from storage or system preference
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    const icon = elements.themeToggle?.querySelector('.theme-icon');
    if (icon) {
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Device enumeration and initialization
async function initializeDevices() {
    try {
        // Check if MediaDevices API is supported
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
            throw new Error('MediaDevices API not supported');
        }
        
        // Request permissions to get device labels
        await requestPermissions();
        
        // Enumerate and populate devices
        await refreshDeviceList();
        
    } catch (error) {
        console.error('Failed to initialize devices:', error);
        showError('error_not_supported');
    }
}

// Request media permissions
async function requestPermissions() {
    try {
        // Request both audio and video permissions
        const stream = await navigator.mediaDevices.getUserMedia({ 
            audio: true, 
            video: true 
        });
        
        // Stop the stream immediately
        stream.getTracks().forEach(track => track.stop());
        
        updatePermissionStatus('microphone', 'granted');
        updatePermissionStatus('camera', 'granted');
        
    } catch (error) {
        console.error('Permission request failed:', error);
        
        // Try to get individual permissions
        await requestMicrophonePermission();
        await requestCameraPermission();
    }
}

// Request microphone permission
async function requestMicrophonePermission() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        updatePermissionStatus('microphone', 'granted');
    } catch (error) {
        updatePermissionStatus('microphone', 'denied');
    }
}

// Request camera permission
async function requestCameraPermission() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
        updatePermissionStatus('camera', 'granted');
    } catch (error) {
        updatePermissionStatus('camera', 'denied');
    }
}

// Update permission status UI
function updatePermissionStatus(device, status) {
    const t = translations[currentLanguage];
    
    if (device === 'microphone') {
        elements.micPermissionIcon.textContent = status === 'granted' ? '✅' : '❌';
        elements.micPermissionText.textContent = t[status] || status;
    } else if (device === 'camera') {
        elements.cameraPermissionIcon.textContent = status === 'granted' ? '✅' : '❌';
        elements.cameraPermissionText.textContent = t[status] || status;
    }
}

// Refresh device list
async function refreshDeviceList() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        
        const microphones = devices.filter(device => device.kind === 'audioinput');
        const cameras = devices.filter(device => device.kind === 'videoinput');
        
        populateDeviceSelect(elements.micSelect, microphones, 'microphone');
        populateDeviceSelect(elements.cameraSelect, cameras, 'camera');
        
    } catch (error) {
        console.error('Failed to enumerate devices:', error);
        showError('error_not_supported');
    }
}

// Populate device select dropdown
function populateDeviceSelect(selectElement, devices, deviceType) {
    if (!selectElement) return;
    
    const t = translations[currentLanguage];
    
    // Clear existing options
    selectElement.innerHTML = '';
    
    if (devices.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = t.no_devices;
        option.disabled = true;
        selectElement.appendChild(option);
        selectElement.disabled = true;
        
        // Show error for no devices
        showError(deviceType === 'microphone' ? 'error_no_microphone' : 'error_no_camera');
        return;
    }
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = `${t[`select_${deviceType}`]}`;
    selectElement.appendChild(defaultOption);
    
    // Add device options
    devices.forEach((device, index) => {
        const option = document.createElement('option');
        option.value = device.deviceId;
        option.textContent = device.label || `${t[deviceType]} ${index + 1}`;
        selectElement.appendChild(option);
    });
    
    selectElement.disabled = false;
}

// Handle microphone selection change
async function handleMicrophoneChange(event) {
    const deviceId = event.target.value;
    
    if (deviceId) {
        await startMicrophoneTest(deviceId);
    } else {
        stopMicrophoneTest();
    }
}

// Handle camera selection change
async function handleCameraChange(event) {
    const deviceId = event.target.value;
    
    if (deviceId) {
        await startCameraTest(deviceId);
    } else {
        stopCameraTest();
    }
}

// Toggle microphone test
async function toggleMicrophoneTest() {
    if (currentMicStream) {
        stopMicrophoneTest();
    } else {
        const deviceId = elements.micSelect.value;
        if (deviceId) {
            await startMicrophoneTest(deviceId);
        }
    }
}

// Start microphone test
async function startMicrophoneTest(deviceId) {
    try {
        // Stop any existing microphone stream
        stopMicrophoneTest();
        
        const constraints = {
            audio: {
                deviceId: deviceId ? { exact: deviceId } : undefined,
                echoCancellation: false,
                noiseSuppression: false,
                autoGainControl: false
            }
        };
        
        currentMicStream = await navigator.mediaDevices.getUserMedia(constraints);
        
        // Setup audio context and analyzer
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(currentMicStream);
        
        // Configure analyzer for smooth visualization
        analyser.fftSize = 1024;
        analyser.smoothingTimeConstant = 0.8;
        analyser.minDecibels = -90;
        analyser.maxDecibels = -10;
        
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        
        microphone.connect(analyser);
        
        // Start visualization
        startMicrophoneVisualization();
        
        // Update UI
        const t = translations[currentLanguage];
        elements.micTestBtn.textContent = t.stop_test;
        elements.micInfo.textContent = `${t.microphone}: ${elements.micSelect.options[elements.micSelect.selectedIndex].text}`;
        
    } catch (error) {
        console.error('Microphone test failed:', error);
        showError(error.name === 'NotAllowedError' ? 'error_mic_permission' : 'error_mic_failed');
        stopMicrophoneTest();
    }
}

// Stop microphone test
function stopMicrophoneTest() {
    // Stop animation
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    
    // Close audio context
    if (audioContext) {
        audioContext.close();
        audioContext = null;
    }
    
    // Stop microphone stream
    if (currentMicStream) {
        currentMicStream.getTracks().forEach(track => track.stop());
        currentMicStream = null;
    }
    
    // Reset UI
    if (elements.volumeFill) elements.volumeFill.style.width = '0%';
    if (elements.volumeLevel) elements.volumeLevel.textContent = '0%';
    
    // Clear visualizer
    if (elements.micVisualizer) {
        const ctx = elements.micVisualizer.getContext('2d');
        ctx.clearRect(0, 0, elements.micVisualizer.width, elements.micVisualizer.height);
    }
    
    // Update button text
    const t = translations[currentLanguage];
    if (elements.micTestBtn) elements.micTestBtn.textContent = t.start_test;
    if (elements.micInfo) elements.micInfo.textContent = t.select_mic_to_start;
    
    analyser = null;
    microphone = null;
    dataArray = null;
}

// Start microphone visualization
function startMicrophoneVisualization() {
    if (!analyser || !elements.micVisualizer) return;
    
    const canvas = elements.micVisualizer;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    const draw = () => {
        if (!analyser) return;
        
        animationId = requestAnimationFrame(draw);
        
        analyser.getByteFrequencyData(dataArray);
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        
        // Calculate volume level
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        const volumePercent = Math.round((average / 255) * 100);
        
        // Update volume indicator
        if (elements.volumeFill) {
            elements.volumeFill.style.width = `${volumePercent}%`;
        }
        if (elements.volumeLevel) {
            elements.volumeLevel.textContent = `${volumePercent}%`;
        }
        
        // Draw waveform
        drawWaveform(ctx, dataArray, canvas.offsetWidth, canvas.offsetHeight);
    };
    
    draw();
}

// Draw smooth waveform visualization
function drawWaveform(ctx, dataArray, width, height) {
    const barWidth = width / dataArray.length * 2.5;
    let x = 0;
    
    // Check if dark mode is active
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    
    // Create gradient based on theme
    const gradient = ctx.createLinearGradient(0, height, 0, 0);
    
    if (isDarkMode) {
        // Dark mode: warm golden and coral colors
        gradient.addColorStop(0, '#ffeaa7');
        gradient.addColorStop(0.3, '#fab1a0');
        gradient.addColorStop(0.6, '#e17055');
        gradient.addColorStop(1, '#ff6b6b');
    } else {
        // Light mode: vibrant coral, orange, purple gradient
        gradient.addColorStop(0, '#ff6b6b');
        gradient.addColorStop(0.3, '#ffa726');
        gradient.addColorStop(0.6, '#ab47bc');
        gradient.addColorStop(1, '#4ecdc4');
    }
    
    ctx.fillStyle = gradient;
    
    for (let i = 0; i < dataArray.length; i++) {
        const barHeight = Math.max((dataArray[i] / 255) * height, 2);
        
        // Create rounded bars with glow effect
        const radius = Math.min(barWidth / 2, 3);
        const y = height - barHeight;
        
        // Add glow effect
        ctx.shadowColor = isDarkMode ? '#ffeaa7' : '#ff6b6b';
        ctx.shadowBlur = 4;
        
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth - 1, barHeight, radius);
        ctx.fill();
        
        // Reset shadow
        ctx.shadowBlur = 0;
        
        x += barWidth + 1;
    }
}

// Toggle camera test
async function toggleCameraTest() {
    if (currentCameraStream) {
        stopCameraTest();
    } else {
        const deviceId = elements.cameraSelect.value;
        if (deviceId) {
            await startCameraTest(deviceId);
        }
    }
}

// Start camera test
async function startCameraTest(deviceId) {
    try {
        // Stop any existing camera stream
        stopCameraTest();
        
        const constraints = {
            video: {
                deviceId: deviceId ? { exact: deviceId } : undefined,
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        };
        
        currentCameraStream = await navigator.mediaDevices.getUserMedia(constraints);
        
        // Set video source
        if (elements.cameraPreview) {
            elements.cameraPreview.srcObject = currentCameraStream;
            elements.cameraPreview.onloadedmetadata = () => {
                // Update resolution display
                const width = elements.cameraPreview.videoWidth;
                const height = elements.cameraPreview.videoHeight;
                if (elements.resolutionDisplay) {
                    elements.resolutionDisplay.textContent = `${width} × ${height}`;
                }
                if (elements.cameraInfo) {
                    elements.cameraInfo.textContent = `${width} × ${height} - ${elements.cameraSelect.options[elements.cameraSelect.selectedIndex].text}`;
                }
            };
        }
        
        // Hide placeholder, show video
        if (elements.cameraPlaceholder) {
            elements.cameraPlaceholder.classList.add('hidden');
        }
        
        // Update button text
        const t = translations[currentLanguage];
        if (elements.cameraTestBtn) {
            elements.cameraTestBtn.textContent = t.stop_preview;
        }
        
    } catch (error) {
        console.error('Camera test failed:', error);
        showError(error.name === 'NotAllowedError' ? 'error_camera_permission' : 'error_camera_failed');
        stopCameraTest();
    }
}

// Stop camera test
function stopCameraTest() {
    // Stop camera stream
    if (currentCameraStream) {
        currentCameraStream.getTracks().forEach(track => track.stop());
        currentCameraStream = null;
    }
    
    // Reset video element
    if (elements.cameraPreview) {
        elements.cameraPreview.srcObject = null;
    }
    
    // Show placeholder, hide video
    if (elements.cameraPlaceholder) {
        elements.cameraPlaceholder.classList.remove('hidden');
    }
    
    // Reset UI
    if (elements.resolutionDisplay) {
        elements.resolutionDisplay.textContent = '--';
    }
    
    // Update button text
    const t = translations[currentLanguage];
    if (elements.cameraTestBtn) {
        elements.cameraTestBtn.textContent = t.start_preview;
    }
    if (elements.cameraInfo) {
        elements.cameraInfo.textContent = '--';
    }
}

// Show error message
function showError(messageKey) {
    if (!elements.errorContainer) return;
    
    const t = translations[currentLanguage];
    const message = t[messageKey] || messageKey;
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <span class="error-icon">⚠️</span>
        <span>${message}</span>
    `;
    
    elements.errorContainer.appendChild(errorDiv);
    
    // Auto-remove error after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

// Hide loading screen
function hideLoadingScreen() {
    if (elements.loadingScreen) {
        elements.loadingScreen.classList.add('hidden');
        setTimeout(() => {
            elements.loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Cleanup function
function cleanup() {
    stopMicrophoneTest();
    stopCameraTest();
}

// Add Canvas roundRect polyfill for older browsers
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
        this.beginPath();
        this.moveTo(x + radius, y);
        this.lineTo(x + width - radius, y);
        this.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.lineTo(x + width, y + height - radius);
        this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.lineTo(x + radius, y + height);
        this.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.lineTo(x, y + radius);
        this.quadraticCurveTo(x, y, x + radius, y);
        this.closePath();
    };
}

// Initialize theme on load
initializeTheme(); 