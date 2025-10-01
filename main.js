const slides = [
  {
    emoji: '📈',
    title: '🚀 Welcome to FX Cartel v2',
    description: 'Join our <b>exclusive trading community</b> and take your forex trading to the next level with professional signals and mentorship',
    button: 'Get Started 🎯'
  },
  {
    emoji: '👋',
    title: 'Tell us about yourself',
    description: 'Help us personalize your trading experience',
    form: true,
    button: 'Continue ➡️'
  },
  {
    emoji: '📊',
    title: 'Do you currently trade?',
    description: 'Help us understand your current trading activity',
    button: '✅ Yes, I currently trade',
    altButton: '❌ No, I don\'t currently trade'
  },
  {
    emoji: '🎯',
    title: 'Choose Your Trading Service',
    description: 'Select the perfect option for your trading goals',
    list: [
      '📊 1. Free Signals Only - Daily forex signals',
      '🎓 2. Mentorship & Training - Complete education + signals',
      '💎 3. VIP Signals - Premium signals with 85%+ accuracy'
    ],
    button: '📊 1. Free Signals Only'
  },
  {
    emoji: '🆓',
    title: '🎉 Free Signals Setup',
    description: 'Please sign up with HFM broker with partner ID x to get free signals. Account must be funded with minimum deposit of R1000.00',
    button: '❓ Do you need help to sign up?'
  },
  {
    emoji: '📋',
    title: '📖 HFM Broker Setup Instructions',
    description: 'Follow these simple steps to sign up with partner ID',
    list: [
      '1️⃣ Visit HFM Broker website',
      '2️⃣ Click "Open Live Account"',
      '3️⃣ Enter Partner ID: x',
      '4️⃣ Complete registration & verify identity',
      '5️⃣ Make minimum deposit of R1,000',
      '6️⃣ Send us proof of your funded account'
    ],
    button: '✅ Yes, help me sign up'
  },
  {
    emoji: '👍',
    title: '✅ Perfect!',
    description: 'Once evidence of trading account setup provided you will be added to the free signals group',
    list: [
      '📸 Send screenshot of your funded HFM account',
      '✅ Must show Partner ID x and minimum R1,000 deposit',
      '⏰ Verification takes 24-48 hours',
      '📱 You\'ll be added to our free signals group'
    ],
    button: '📤 Submit Account Proof'
  }
];

let currentSlide = 0;
let userData = {};

function initTelegram() {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
  }
}

function renderSlide(index) {
  const slide = slides[index];
  const app = document.getElementById('app');
  
  let html = `
    <div class="slide active">
      <div class="emoji">${slide.emoji}</div>
      <h1>${slide.title}</h1>
      <p>${slide.description}</p>
  `;
  
  if (slide.list) {
    html += '<ul>';
    slide.list.forEach(item => html += `<li>${item}</li>`);
    html += '</ul>';
  }
  
  if (slide.form) {
    html += `
      <select id="referral_source">
        <option value="">How did you hear about us?</option>
        <option value="Social Media">Social Media (Instagram/Facebook)</option>
        <option value="YouTube">YouTube</option>
        <option value="TikTok">TikTok</option>
        <option value="Twitter">Twitter/X</option>
        <option value="Friend Referral">Friend Referral</option>
        <option value="Google Search">Google Search</option>
        <option value="Trading Forum">Trading Forum</option>
        <option value="Telegram Group">Telegram Group</option>
        <option value="WhatsApp">WhatsApp</option>
        <option value="Other">Other</option>
      </select>
    `;
  }
  
  html += `<button class="btn" onclick="nextSlide()">${slide.button}</button>`;
  
  if (slide.altButton) {
    html += `<button class="btn" onclick="altAction()">${slide.altButton}</button>`;
  }
  
  html += '</div>';
  app.innerHTML = html;
}

function nextSlide() {
  if (slides[currentSlide].form) {
    const select = document.getElementById('referral_source');
    if (!select.value) {
      alert('Please select how you heard about us');
      return;
    }
    userData.referralSource = select.value;
  }
  
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    renderSlide(currentSlide);
  } else {
    submitData();
  }
}

function altAction() {
  // Handle alternative button actions
  if (currentSlide === 2) {
    currentSlide = 3; // Skip to service selection for non-traders
    renderSlide(currentSlide);
  }
}

function submitData() {
  userData.completed = true;
  
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.sendData(JSON.stringify(userData));
  } else {
    console.log('User data:', userData);
    alert('Thank you! Your information has been submitted.');
  }
}

// Initialize app
initTelegram();
renderSlide(0);