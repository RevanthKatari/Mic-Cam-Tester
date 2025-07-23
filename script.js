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
    navThemeToggle: null,
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
    errorContainer: null,
    navLinks: null
};

// Enhanced Localization data with new content
const translations = {
    en: {
        loading: "Loading...",
        title: "Professional Mic & Camera Tester",
        hero_subtitle: "Test your audio and video devices with real-time feedback, comprehensive guides, and expert troubleshooting tips. Perfect for streamers, content creators, and remote workers.",
        subtitle: "Test your audio and video devices with real-time feedback",
        
        // Navigation
        nav_tester: "Tester",
        nav_guide: "Guide",
        nav_troubleshooting: "Help",
        nav_compatibility: "Compatibility",
        nav_blog: "Articles",
        
        // Hero Features
        feature_privacy: "100% Private",
        feature_realtime: "Real-time Testing",
        feature_compatible: "All Devices",
        feature_free: "Completely Free",
        cta_start_testing: "Start Testing Now",
        cta_learn_more: "Learn More",
        
        // Section Titles
        tester_title: "Device Tester",
        tester_description: "Test your microphone and camera devices with our professional-grade testing tool. Get real-time feedback and ensure your devices are working perfectly.",
        guide_title: "Complete Testing Guide",
        guide_description: "Learn how to properly test your audio and video devices, understand the results, and optimize your setup for the best performance.",
        troubleshooting_title: "Troubleshooting & FAQ",
        troubleshooting_description: "Common issues and solutions to help you resolve audio and video device problems quickly and efficiently.",
        compatibility_title: "Browser & Device Compatibility",
        compatibility_description: "Comprehensive compatibility information for different browsers, operating systems, and device types.",
        blog_title: "Expert Articles & Tips",
        blog_description: "In-depth articles about audio and video technology, best practices, and industry insights to help you get the most out of your devices.",
        
        // Device Testing
        mic_permission: "Microphone Access",
        camera_permission: "Camera Access",
        checking: "Checking...",
        granted: "Granted",
        denied: "Denied",
        microphone: "Microphone Testing",
        camera: "Camera Testing",
        mic_section_desc: "Test your microphone's audio quality, volume levels, and device compatibility.",
        camera_section_desc: "Test your camera's video quality, resolution, and device functionality.",
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
        
        // Guide Content
        mic_guide_title: "Microphone Testing Guide",
        mic_guide_setup: "Setup Instructions:",
        mic_step_1: "Connect your microphone to your computer",
        mic_step_2: "Select your microphone from the dropdown menu",
        mic_step_3: "Click \"Start Test\" and allow microphone access",
        mic_step_4: "Speak normally and observe the audio visualization",
        mic_step_5: "Check the volume indicator for optimal levels (50-80%)",
        mic_guide_tips: "Pro Tips:",
        mic_tip_1: "Position your microphone 6-8 inches from your mouth",
        mic_tip_2: "Avoid background noise during testing",
        mic_tip_3: "Test in a quiet environment for accurate results",
        mic_tip_4: "Check for consistent waveform patterns",
        
        camera_guide_title: "Camera Testing Guide",
        camera_guide_setup: "Setup Instructions:",
        camera_step_1: "Connect your camera or ensure built-in camera is functional",
        camera_step_2: "Select your camera from the dropdown menu",
        camera_step_3: "Click \"Start Preview\" and allow camera access",
        camera_step_4: "Check the video preview for clarity and color accuracy",
        camera_step_5: "Verify the resolution display shows expected values",
        camera_guide_tips: "Pro Tips:",
        camera_tip_1: "Ensure adequate lighting for best video quality",
        camera_tip_2: "Clean your camera lens before testing",
        camera_tip_3: "Test different resolutions if available",
        camera_tip_4: "Check for smooth motion without lag",
        
        optimization_guide_title: "Optimization Guide",
        optimization_audio: "Audio Optimization:",
        audio_opt_1: "Adjust system volume to 70-80% for optimal input",
        audio_opt_2: "Use noise cancellation if available",
        audio_opt_3: "Position microphone away from speakers to avoid feedback",
        audio_opt_4: "Consider using a pop filter for professional recording",
        optimization_video: "Video Optimization:",
        video_opt_1: "Use natural lighting or ring lights for better visibility",
        video_opt_2: "Position camera at eye level for professional appearance",
        video_opt_3: "Ensure stable internet connection for streaming",
        video_opt_4: "Close unnecessary applications to free up system resources",
        
        // FAQ Content
        faq_no_mic_q: "Why can't I see my microphone in the list?",
        faq_no_mic_a: "This usually happens when:",
        faq_no_mic_a1: "Your microphone is not properly connected",
        faq_no_mic_a2: "Browser permissions are blocked",
        faq_no_mic_a3: "Another application is using the microphone",
        faq_no_mic_a4: "System audio drivers need updating",
        faq_no_mic_solution: "Solution: Check connections, refresh the page, and allow microphone access when prompted.",
        
        faq_no_camera_q: "My camera shows a black screen, what's wrong?",
        faq_no_camera_a: "Common causes include:",
        faq_no_camera_a1: "Camera is being used by another application",
        faq_no_camera_a2: "Privacy settings block camera access",
        faq_no_camera_a3: "Camera drivers are outdated or corrupted",
        faq_no_camera_a4: "Physical camera cover or switch is blocking the lens",
        faq_no_camera_solution: "Solution: Close other apps using the camera, check privacy settings, and ensure the camera is not physically blocked.",
        
        faq_low_volume_q: "Why is my microphone volume very low?",
        faq_low_volume_a: "Low volume can be caused by:",
        faq_low_volume_a1: "System microphone level set too low",
        faq_low_volume_a2: "Microphone positioned too far from sound source",
        faq_low_volume_a3: "Hardware gain settings need adjustment",
        faq_low_volume_a4: "Microphone sensitivity settings in system preferences",
        faq_low_volume_solution: "Solution: Adjust system microphone levels, move closer to the microphone, and check hardware gain controls.",
        
        faq_poor_quality_q: "How can I improve my camera video quality?",
        faq_poor_quality_a: "To improve video quality:",
        faq_poor_quality_a1: "Ensure adequate lighting - natural light works best",
        faq_poor_quality_a2: "Clean your camera lens with a soft cloth",
        faq_poor_quality_a3: "Check if your camera supports higher resolutions",
        faq_poor_quality_a4: "Close other applications to free up system resources",
        faq_poor_quality_a5: "Update your camera drivers to the latest version",
        
        faq_permissions_q: "How do I allow microphone and camera permissions?",
        faq_permissions_a: "To grant permissions:",
        faq_permissions_a1: "Chrome/Edge: Click the camera/microphone icon in the address bar",
        faq_permissions_a2: "Firefox: Click the shield icon and select \"Allow\"",
        faq_permissions_a3: "Safari: Go to Safari > Preferences > Websites > Camera/Microphone",
        faq_permissions_a4: "Always click \"Allow\" when prompted by the browser",
        
        faq_multiple_devices_q: "Can I test multiple devices at once?",
        faq_multiple_devices_a: "Yes! You can test both your microphone and camera simultaneously. Simply:",
        faq_multiple_devices_a1: "Select your desired microphone and start the audio test",
        faq_multiple_devices_a2: "Then select your camera and start the video preview",
        faq_multiple_devices_a3: "Both tests will run independently and provide real-time feedback",
        
        // Compatibility Content
        browser_compatibility: "Browser Support",
        os_compatibility: "Operating System Support",
        device_compatibility: "Device Types",
        fully_supported: "Fully Supported",
        excellent: "Excellent",
        good: "Good",
        limited: "Limited",
        optimal: "Optimal",
        desktop_computers: "Desktop Computers",
        laptops: "Laptops",
        tablets: "Tablets",
        smartphones: "Smartphones",
        system_requirements: "System Requirements",
        minimum_requirements: "Minimum Requirements",
        recommended_requirements: "Recommended",
        req_browser: "Modern web browser with WebRTC support",
        req_js: "JavaScript enabled",
        req_connection: "Stable internet connection",
        req_permissions: "Microphone/camera permissions",
        rec_ram: "4GB RAM or more",
        rec_cpu: "Dual-core processor or better",
        rec_bandwidth: "Broadband internet connection",
        rec_browser: "Latest browser version",
        
        // Article Content
        article_1_title: "The Complete Guide to Microphone Types and Their Uses",
        article_1_excerpt: "Learn about different microphone types including dynamic, condenser, and ribbon mics. Understand which type works best for your specific needs, whether it's podcasting, streaming, or professional recording.",
        article_1_date: "December 15, 2024",
        article_1_readtime: "8 min read",
        
        article_2_title: "Camera Resolution Explained: 720p vs 1080p vs 4K",
        article_2_excerpt: "Understanding camera resolutions and their impact on video quality. Learn when to use different resolutions for streaming, video conferencing, and content creation to optimize performance and bandwidth.",
        article_2_date: "December 12, 2024",
        article_2_readtime: "6 min read",
        
        article_3_title: "Setting Up Your Home Studio: Audio and Video Best Practices",
        article_3_excerpt: "Create a professional home studio setup with proper lighting, acoustics, and equipment positioning. Tips for content creators, remote workers, and anyone looking to improve their video call quality.",
        article_3_date: "December 10, 2024",
        article_3_readtime: "12 min read",
        
        article_4_title: "Troubleshooting Common Audio and Video Issues",
        article_4_excerpt: "Step-by-step solutions for the most common audio and video problems. From echo and feedback issues to poor video quality and device recognition problems.",
        article_4_date: "December 8, 2024",
        article_4_readtime: "10 min read",
        
        article_5_title: "Browser Compatibility and Web Audio/Video APIs",
        article_5_excerpt: "Technical deep-dive into WebRTC, getUserMedia API, and browser differences. Understanding how web browsers handle audio and video devices and what this means for users.",
        article_5_date: "December 5, 2024",
        article_5_readtime: "15 min read",
        
        article_6_title: "Privacy and Security in Online Audio/Video Testing",
        article_6_excerpt: "Understanding privacy implications of browser-based media testing. Learn about data protection, local processing, and how to ensure your audio and video data stays secure.",
        article_6_date: "December 3, 2024",
        article_6_readtime: "7 min read",
        
        // Footer
        footer_description: "Professional audio and video device testing tool with comprehensive guides and expert support. Test your devices with confidence.",
        footer_tools: "Tools",
        footer_microphone_test: "Microphone Test",
        footer_camera_test: "Camera Test",
        footer_testing_guide: "Testing Guide",
        footer_support: "Support",
        footer_troubleshooting: "Troubleshooting",
        footer_compatibility: "Compatibility",
        footer_articles: "Articles",
        footer_resources: "Resources",
        footer_setup_guide: "Setup Guide",
        footer_best_practices: "Best Practices",
        footer_system_requirements: "System Requirements",
        
        privacy_note: "Your audio and video data stays on your device - nothing is recorded or transmitted.",
        made_with: "Made with ❤️ for privacy and user experience",
        
        // Error Messages
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
        title: "Probador Profesional de Micrófono y Cámara",
        hero_subtitle: "Prueba tus dispositivos de audio y video con retroalimentación en tiempo real, guías completas y consejos de solución de problemas. Perfecto para streamers, creadores de contenido y trabajadores remotos.",
        subtitle: "Prueba tus dispositivos de audio y video con retroalimentación en tiempo real",
        
        // Navigation
        nav_tester: "Probador",
        nav_guide: "Guía",
        nav_troubleshooting: "Ayuda",
        nav_compatibility: "Compatibilidad",
        nav_blog: "Artículos",
        
        // Hero Features
        feature_privacy: "100% Privado",
        feature_realtime: "Pruebas en Tiempo Real",
        feature_compatible: "Todos los Dispositivos",
        feature_free: "Completamente Gratis",
        cta_start_testing: "Comenzar Pruebas",
        cta_learn_more: "Saber Más",
        
        // Continue with Spanish translations...
        mic_permission: "Acceso al Micrófono",
        camera_permission: "Acceso a la Cámara",
        checking: "Verificando...",
        granted: "Concedido",
        denied: "Denegado",
        microphone: "Prueba de Micrófono",
        camera: "Prueba de Cámara",
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
        made_with: "Hecho con ❤️ para la privacidad y experiencia del usuario",
        
        // Error messages in Spanish
        error_no_microphone: "No se encontraron dispositivos de micrófono. Conecta un micrófono y actualiza la página.",
        error_no_camera: "No se encontraron dispositivos de cámara. Conecta una cámara y actualiza la página.",
        error_mic_permission: "Acceso al micrófono denegado. Permite el acceso al micrófono y actualiza la página.",
        error_camera_permission: "Acceso a la cámara denegado. Permite el acceso a la cámara y actualiza la página.",
        error_mic_failed: "Error al acceder al micrófono. Verifica tu dispositivo e inténtalo de nuevo.",
        error_camera_failed: "Error al acceder a la cámara. Verifica tu dispositivo e inténtalo de nuevo.",
        error_not_supported: "Tu navegador no soporta esta funcionalidad. Usa un navegador moderno."
    }
    // Add more languages as needed
};

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
    try {
        initializeElements();
        await initializeLanguage();
        initializeTheme();
        initializeNavigation();
        initializeFAQ();
        setupEventListeners();
        await checkPermissions();
        await loadDevices();
        hideLoadingScreen();
    } catch (error) {
        console.error('Initialization error:', error);
        showError('Initialization failed. Please refresh the page.');
        hideLoadingScreen();
    }
});

// Initialize DOM Elements
function initializeElements() {
    elements.loadingScreen = document.getElementById('loading-screen');
    elements.themeToggle = document.getElementById('nav-theme-toggle');
    elements.navThemeToggle = elements.themeToggle;
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
    elements.navLinks = document.querySelectorAll('.nav-link');
}

// Initialize Language
async function initializeLanguage() {
    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    currentLanguage = translations[browserLang] ? browserLang : 'en';
    
    // Apply translations
    applyTranslations();
}

// Apply Translations
function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translations[currentLanguage][key];
            } else {
                element.textContent = translations[currentLanguage][key];
            }
        }
    });
}

// Initialize Theme
function initializeTheme() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update theme toggle icon
    updateThemeIcon(savedTheme);
}

// Update Theme Icon
function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Initialize Navigation
function initializeNavigation() {
    // Handle navigation link clicks
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            updateActiveNavLink(link);
        });
    });
    
    // Handle scroll to update active nav link
    window.addEventListener('scroll', throttle(updateNavOnScroll, 100));
}

// Initialize FAQ
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            toggleFaq(question);
        });
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Theme toggle
    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Device selection
    if (elements.micSelect) {
        elements.micSelect.addEventListener('change', handleMicrophoneChange);
    }
    
    if (elements.cameraSelect) {
        elements.cameraSelect.addEventListener('change', handleCameraChange);
    }
    
    // Test buttons
    if (elements.micTestBtn) {
        elements.micTestBtn.addEventListener('click', toggleMicrophoneTest);
    }
    
    if (elements.cameraTestBtn) {
        elements.cameraTestBtn.addEventListener('click', toggleCameraTest);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Window resize for responsive canvas
    window.addEventListener('resize', handleWindowResize);
}

// Navigation Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navHeight = 70; // Height of fixed navigation
        const elementPosition = element.offsetTop - navHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

function updateActiveNavLink(activeLink) {
    elements.navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function updateNavOnScroll() {
    const sections = ['hero', 'tester', 'guide', 'troubleshooting', 'compatibility', 'blog'];
    const navHeight = 70;
    let currentSection = '';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSection = sectionId === 'hero' ? 'tester' : sectionId;
            }
        }
    });
    
    if (currentSection) {
        const activeLink = document.querySelector(`[href="#${currentSection}"]`);
        if (activeLink) {
            updateActiveNavLink(activeLink);
        }
    }
}

// FAQ Functions
function toggleFaq(questionElement) {
    const faqItem = questionElement.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Theme Functions
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

// Permission Functions
async function checkPermissions() {
    try {
        // Check microphone permission
        const micPermission = await navigator.permissions.query({ name: 'microphone' });
        updatePermissionStatus('mic', micPermission.state);
        
        micPermission.addEventListener('change', () => {
            updatePermissionStatus('mic', micPermission.state);
        });
        
        // Check camera permission
        const cameraPermission = await navigator.permissions.query({ name: 'camera' });
        updatePermissionStatus('camera', cameraPermission.state);
        
        cameraPermission.addEventListener('change', () => {
            updatePermissionStatus('camera', cameraPermission.state);
        });
    } catch (error) {
        console.warn('Permission API not supported:', error);
        // Fallback to manual checking during device access
        updatePermissionStatus('mic', 'prompt');
        updatePermissionStatus('camera', 'prompt');
    }
}

function updatePermissionStatus(type, state) {
    const iconElement = type === 'mic' ? elements.micPermissionIcon : elements.cameraPermissionIcon;
    const textElement = type === 'mic' ? elements.micPermissionText : elements.cameraPermissionText;
    
    if (!iconElement || !textElement) return;
    
    switch (state) {
        case 'granted':
            iconElement.textContent = '✅';
            textElement.textContent = translations[currentLanguage].granted;
            textElement.style.color = 'var(--success)';
            break;
        case 'denied':
            iconElement.textContent = '❌';
            textElement.textContent = translations[currentLanguage].denied;
            textElement.style.color = 'var(--error)';
            break;
        default:
            iconElement.textContent = '⏳';
            textElement.textContent = translations[currentLanguage].checking;
            textElement.style.color = 'var(--text-muted)';
    }
}

// Device Loading Functions
async function loadDevices() {
    try {
        // First try to get devices without labels
        let devices = await navigator.mediaDevices.enumerateDevices();
        
        // If no labels, try to get permission first
        if (devices.length > 0 && !devices[0].label) {
            try {
                // Request temporary permission to get device labels
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
                stream.getTracks().forEach(track => track.stop());
                // Re-enumerate devices to get labels
                devices = await navigator.mediaDevices.enumerateDevices();
            } catch (permError) {
                console.log('Permission not granted, using devices without labels');
            }
        }
        
        populateDeviceSelectors(devices);
        
        // Listen for device changes
        navigator.mediaDevices.addEventListener('devicechange', loadDevices);
        
    } catch (error) {
        console.error('Error loading devices:', error);
        showError(translations[currentLanguage].error_not_supported);
    }
}

function populateDeviceSelectors(devices) {
    const microphones = devices.filter(device => device.kind === 'audioinput');
    const cameras = devices.filter(device => device.kind === 'videoinput');
    
    // Populate microphone selector
    if (elements.micSelect) {
        elements.micSelect.innerHTML = '';
        if (microphones.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = translations[currentLanguage].no_devices;
            elements.micSelect.appendChild(option);
        } else {
            microphones.forEach(device => {
                const option = document.createElement('option');
                option.value = device.deviceId;
                option.textContent = device.label || `Microphone ${microphones.indexOf(device) + 1}`;
                elements.micSelect.appendChild(option);
            });
        }
    }
    
    // Populate camera selector
    if (elements.cameraSelect) {
        elements.cameraSelect.innerHTML = '';
        if (cameras.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = translations[currentLanguage].no_devices;
            elements.cameraSelect.appendChild(option);
        } else {
            cameras.forEach(device => {
                const option = document.createElement('option');
                option.value = device.deviceId;
                option.textContent = device.label || `Camera ${cameras.indexOf(device) + 1}`;
                elements.cameraSelect.appendChild(option);
            });
        }
    }
}

// Microphone Functions (existing functionality maintained)
async function handleMicrophoneChange() {
    const deviceId = elements.micSelect.value;
    if (!deviceId) return;
    
    try {
        // Stop current stream
        if (currentMicStream) {
            currentMicStream.getTracks().forEach(track => track.stop());
        }
        
        // Request new stream
        const constraints = {
            audio: { deviceId: { exact: deviceId } }
        };
        
        currentMicStream = await navigator.mediaDevices.getUserMedia(constraints);
        updatePermissionStatus('mic', 'granted');
        
        // Update info
        elements.micInfo.textContent = `Connected: ${elements.micSelect.selectedOptions[0].text}`;
        
    } catch (error) {
        console.error('Microphone access error:', error);
        updatePermissionStatus('mic', 'denied');
        showError(translations[currentLanguage].error_mic_failed);
    }
}

async function toggleMicrophoneTest() {
    if (!currentMicStream) {
        await handleMicrophoneChange();
        if (!currentMicStream) return;
    }
    
    if (audioContext && audioContext.state !== 'closed') {
        stopMicrophoneTest();
    } else {
        startMicrophoneTest();
    }
}

function startMicrophoneTest() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(currentMicStream);
        
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        
        microphone.connect(analyser);
        
        elements.micTestBtn.textContent = translations[currentLanguage].stop_test;
        visualizeAudio();
        
    } catch (error) {
        console.error('Error starting microphone test:', error);
        showError(translations[currentLanguage].error_mic_failed);
    }
}

function stopMicrophoneTest() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    
    if (audioContext) {
        audioContext.close();
        audioContext = null;
    }
    
    elements.micTestBtn.textContent = translations[currentLanguage].start_test;
    elements.volumeFill.style.width = '0%';
    elements.volumeLevel.textContent = '0%';
    
    // Clear canvas
    const canvas = elements.micVisualizer;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function visualizeAudio() {
    if (!analyser || !dataArray) return;
    
    animationId = requestAnimationFrame(visualizeAudio);
    
    analyser.getByteFrequencyData(dataArray);
    
    const canvas = elements.micVisualizer;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    
    ctx.clearRect(0, 0, width, height);
    
    // Calculate volume
    const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
    const volumePercent = Math.round((average / 255) * 100);
    
    // Update volume indicator
    elements.volumeFill.style.width = `${volumePercent}%`;
    elements.volumeLevel.textContent = `${volumePercent}%`;
    
    // Draw waveform
    const barWidth = width / dataArray.length;
    let x = 0;
    
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#ff6b6b');
    gradient.addColorStop(1, '#4ecdc4');
    
    ctx.fillStyle = gradient;
    
    for (let i = 0; i < dataArray.length; i++) {
        const barHeight = (dataArray[i] / 255) * height * 0.8;
        
        ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
        x += barWidth;
    }
}

// Camera Functions (existing functionality maintained)
async function handleCameraChange() {
    const deviceId = elements.cameraSelect.value;
    if (!deviceId) return;
    
    try {
        // Stop current stream
        if (currentCameraStream) {
            currentCameraStream.getTracks().forEach(track => track.stop());
        }
        
        // Request new stream
        const constraints = {
            video: { 
                deviceId: { exact: deviceId },
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        };
        
        currentCameraStream = await navigator.mediaDevices.getUserMedia(constraints);
        updatePermissionStatus('camera', 'granted');
        
        // Update info
        elements.cameraInfo.textContent = `Connected: ${elements.cameraSelect.selectedOptions[0].text}`;
        
    } catch (error) {
        console.error('Camera access error:', error);
        updatePermissionStatus('camera', 'denied');
        showError(translations[currentLanguage].error_camera_failed);
    }
}

async function toggleCameraTest() {
    if (!currentCameraStream) {
        await handleCameraChange();
        if (!currentCameraStream) return;
    }
    
    if (elements.cameraPreview.srcObject) {
        stopCameraTest();
    } else {
        startCameraTest();
    }
}

function startCameraTest() {
    if (!currentCameraStream) return;
    
    elements.cameraPreview.srcObject = currentCameraStream;
    elements.cameraPlaceholder.style.display = 'none';
    elements.cameraTestBtn.textContent = translations[currentLanguage].stop_preview;
    
    // Update resolution display when metadata is loaded
    elements.cameraPreview.addEventListener('loadedmetadata', () => {
        const track = currentCameraStream.getVideoTracks()[0];
        const settings = track.getSettings();
        elements.resolutionDisplay.textContent = `${settings.width} × ${settings.height}`;
        elements.cameraInfo.textContent = `${settings.width} × ${settings.height} - ${elements.cameraSelect.selectedOptions[0].text}`;
    });
}

function stopCameraTest() {
    elements.cameraPreview.srcObject = null;
    elements.cameraPlaceholder.style.display = 'flex';
    elements.cameraTestBtn.textContent = translations[currentLanguage].start_preview;
    elements.resolutionDisplay.textContent = '--';
}

// Utility Functions
function hideLoadingScreen() {
    if (elements.loadingScreen) {
        elements.loadingScreen.classList.add('hidden');
        setTimeout(() => {
            elements.loadingScreen.style.display = 'none';
        }, 500);
    }
}

function showError(message) {
    if (!elements.errorContainer) return;
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <span class="error-icon">⚠️</span>
        <span>${message}</span>
    `;
    
    elements.errorContainer.appendChild(errorDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

function handleKeyboardShortcuts(event) {
    if (event.altKey) {
        switch (event.key.toLowerCase()) {
            case 'm':
                event.preventDefault();
                if (elements.micTestBtn) elements.micTestBtn.click();
                break;
            case 'c':
                event.preventDefault();
                if (elements.cameraTestBtn) elements.cameraTestBtn.click();
                break;
            case 't':
                event.preventDefault();
                toggleTheme();
                break;
        }
    }
}

function handleWindowResize() {
    // Resize canvas if microphone test is running
    if (audioContext && elements.micVisualizer) {
        const canvas = elements.micVisualizer;
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    }
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Global functions for HTML onclick handlers
window.scrollToSection = scrollToSection;
window.toggleFaq = toggleFaq;

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (currentMicStream) {
        currentMicStream.getTracks().forEach(track => track.stop());
    }
    if (currentCameraStream) {
        currentCameraStream.getTracks().forEach(track => track.stop());
    }
    if (audioContext) {
        audioContext.close();
    }
}); 