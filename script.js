// Set skill level bars based on data attributes
function initSkillLevels() {
  const hexagonSkills = document.querySelectorAll('.hexagon-skill');
  
  hexagonSkills.forEach(skill => {
    const level = skill.getAttribute('data-level');
    const bar = skill.querySelector('.skill-level-bar');
    if (bar) {
      bar.style.setProperty('--level', level);
    }
  });
}

// Digital Rain Effect
function initDigitalRain() {
  const canvas = document.getElementById('digitalRain');
  const ctx = canvas.getContext('2d');
  
  // Set canvas to full screen
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Characters to be used in the matrix rain
  const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  // Define columns and their properties
  const fontSize = 15;
  const columns = Math.floor(canvas.width / fontSize);
  
  // Array to store the y-coordinate for each column
  const drops = [];
  
  // Initialize all drops to starting positions
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
  }
  
  // Draw the matrix rain
  function draw() {
    // Semi-transparent black to create trailing effect
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Green text color
    ctx.fillStyle = '#00FF9D';
    ctx.font = `${fontSize}px monospace`;
    
    // Loop through each drop
    for (let i = 0; i < drops.length; i++) {
      // Select a random character
      const text = chars[Math.floor(Math.random() * chars.length)];
      
      // Draw the character
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      // When drop reaches bottom, randomize restart position
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      
      // Move drop down
      drops[i]++;
    }
  }
  
  // Run the animation
  setInterval(draw, 35);
}

// Terminal Contact Form
function initTerminalContact() {
  const form = document.getElementById('terminal-form');
  const terminalOutput = document.getElementById('terminal-output');
  
  if (form && terminalOutput) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      const name = nameInput.value || 'Anonymous';
      const email = emailInput.value || 'no-email';
      const message = messageInput.value || 'No message';
      
      // Create new terminal lines
      const commandLine = document.createElement('div');
      commandLine.className = 'terminal-line';
      commandLine.innerHTML = `<span>> contact --name="${name}" --email="${email}"</span>`;
      
      const messageLine = document.createElement('div');
      messageLine.className = 'terminal-line';
      messageLine.innerHTML = `<span>> Message: "${message}"</span>`;
      
      const responseLine = document.createElement('div');
      responseLine.className = 'terminal-line';
      responseLine.style.color = '#00FF9D';
      responseLine.innerHTML = '<span>> Transmission complete. Message sent successfully.</span>';
      
      // Add lines to terminal output
      terminalOutput.appendChild(commandLine);
      terminalOutput.appendChild(messageLine);
      terminalOutput.appendChild(responseLine);
      
      // Scroll to bottom of terminal
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
      
      // Clear form
      nameInput.value = '';
      emailInput.value = '';
      messageInput.value = '';
    });
  }
}

// Neon Overload Mode Toggle
function initNeonOverload() {
  const toggleButton = document.getElementById('neonToggle');
  
  if (toggleButton) {
    toggleButton.addEventListener('click', function() {
      document.body.classList.toggle('neon-overload');
      
      if (document.body.classList.contains('neon-overload')) {
        toggleButton.textContent = 'DISABLE_NEON';
        toggleButton.classList.remove('hot-pink');
        toggleButton.classList.add('neon-green');
      } else {
        toggleButton.textContent = 'NEON_OVERLOAD';
        toggleButton.classList.remove('neon-green');
        toggleButton.classList.add('hot-pink');
      }
    });
  }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      
      const targetId = e.target.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initSkillLevels();
  initDigitalRain();
  initTerminalContact();
  initNeonOverload();
  initSmoothScrolling();
});