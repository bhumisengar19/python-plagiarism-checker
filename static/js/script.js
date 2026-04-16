document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRealTimeFeedback();
    initAnimations();
    initPageFade();
});

// --- Theme Management ---
function initTheme() {
    const themeSwitch = document.getElementById('theme-switch');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeSwitch) {
        themeSwitch.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // The animated transition is handled by CSS based on data-theme
        });
    }
}

// --- Real-Time Feedback (Live UX) ---
function initRealTimeFeedback() {
    const text1 = document.getElementById('text1');
    const text2 = document.getElementById('text2');
    const progressBar = document.getElementById('real-time-progress');
    const progressText = document.getElementById('real-time-score');
    const indicator = document.getElementById('typing-indicator');

    if (!text1 || !text2) return;

    let timeout = null;

    const runQuickAnalysis = () => {
        const val1 = text1.value.trim();
        const val2 = text2.value.trim();

        if (val1.length === 0 || val2.length === 0) {
            progressBar.style.width = '0%';
            progressText.innerText = '0%';
            indicator?.classList.remove('active');
            return;
        }

        // Show typing indicator
        indicator?.classList.add('active');

        clearTimeout(timeout);
        timeout = setTimeout(async () => {
            try {
                const response = await fetch('/api/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text1: val1, text2: val2, mode: 'text' })
                });
                const data = await response.json();
                
                if (data.score !== undefined) {
                    progressBar.style.width = data.score + '%';
                    animateCounter('real-time-score', data.score, 1000);
                }
            } catch (err) {
                console.error("Real-time analysis failing", err);
            } finally {
                // Hide typing indicator after a short delay
                setTimeout(() => indicator?.classList.remove('active'), 1000);
            }
        }, 1200); // 1.2s debounce for "intelligence" feel
    };

    text1.addEventListener('input', runQuickAnalysis);
    text2.addEventListener('input', runQuickAnalysis);
}

// --- Smooth Counter Animation (Animated Results) ---
function animateCounter(id, target, duration = 1500) {
    const el = document.getElementById(id);
    if (!el) return;
    
    let startTimestamp = null;
    const startValue = parseFloat(el.innerText) || 0;
    const finalValue = parseFloat(target);
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Quad ease out for smoothness
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const current = startValue + (finalValue - startValue) * easedProgress;
        
        el.innerText = Math.round(current) + (id.includes('score') || id.includes('val') ? '%' : '');
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

// --- Navigation Flow (SPA feel) ---
function initPageFade() {
    document.body.classList.add('page-transition');
    
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('/') && !href.startsWith('#') && !link.target) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.2s ease-in-out';
                setTimeout(() => {
                    window.location.href = href;
                }, 200);
            });
        }
    });
}

// --- General Animations ---
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll, .card, .hero').forEach(el => {
        el.classList.add('animate-in'); // Fallback if observer not supported
        observer.observe(el);
    });
}

// --- FULL ANALYSIS ACTION (Smart Feedback) ---
async function analyzeFull() {
    const text1 = document.getElementById('text1').value;
    const text2 = document.getElementById('text2').value;
    const mode = document.getElementById('mode-selector')?.value || 'text';

    if (!text1 || !text2) {
        showFeedback("Please provide both documents.", "error");
        return;
    }

    const btn = document.getElementById('analyze-btn');
    const originalContent = btn.innerHTML;
    
    // Switch to "Analyzing..." state
    btn.innerHTML = '<span>Analyzing</span><span class="dots"></span>';
    btn.disabled = true;

    try {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text1, text2, mode })
        });
        const data = await response.json();
        
        // Show success delighter
        btn.innerHTML = '<i class="ph-bold ph-check"></i> Analysis Complete';
        btn.classList.add("success");
        
        setTimeout(() => {
            sessionStorage.setItem('plagix_results', JSON.stringify(data));
            window.location.href = '/results';
        }, 800);
        
    } catch (err) {
        console.error(err);
        btn.innerHTML = originalContent;
        btn.disabled = false;
        showFeedback("Failed to connect to engine.", "error");
    }
}

function showFeedback(msg, type) {
    // Simple toast fallback if needed
    alert(msg);
}
