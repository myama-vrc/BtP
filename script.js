document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in, .fade-up');
    fadeElements.forEach(el => observer.observe(el));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    createParticles();
    initCastSystem();
});

const CAST_DATA = {
    "myama": {
        name: "myama",
        imageFull: "assets/images/cast1-2.png",
        description: "善良なスタッフです。大体3~4行書くといい感じの見た目になります。名前のフォントが見づらいのでどうにかします。写真はサムネと別、透過使用可能。",
        gender: "Male",
        birthday: "01/01",
        hobbies: "三点トラッキング",
        skills: "三点倒立",
        voiceSample: "assets/voices/2_23_AM_2.mp3",
        twitterUrl: "https://twitter.com/party_in_VRC"
    }
};

function initCastSystem() {
    const detailContainer = document.getElementById('cast-detail-container');
    if (detailContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const castId = urlParams.get('id');

        if (castId && CAST_DATA[castId]) {
            renderCastDetail(detailContainer, CAST_DATA[castId]);
        } else {
            detailContainer.innerHTML = '<p class="error-msg">Cast not found.</p>';
        }
    }
}

function renderCastDetail(container, data) {
    container.innerHTML = `
        <div class="detail-image-section" style="--bg-image: url('${data.imageFull}')">
            <img src="${data.imageFull}" alt="${data.name} Full Body" class="detail-image">
        </div>
        <div class="detail-info-section glass-panel">
            <h1 class="detail-name">${data.name}</h1>
            <div class="detail-description">
                <p>${data.description}</p>
            </div>
            <div class="detail-profile-grid">
                <div class="profile-item">
                    <span class="label">Gender</span>
                    <span class="value">${data.gender}</span>
                </div>
                <div class="profile-item">
                    <span class="label">Birthday</span>
                    <span class="value">${data.birthday}</span>
                </div>
                <div class="profile-item">
                    <span class="label">Hobby</span>
                    <span class="value">${data.hobbies}</span>
                </div>
                <div class="profile-item">
                    <span class="label">Skill</span>
                    <span class="value">${data.skills}</span>
                </div>
            </div>
            
            <div class="detail-actions">
                <div class="voice-player">
                    <span class="label">Voice Sample</span>
                    <audio controls src="${data.voiceSample}"></audio>
                </div>
                <a href="${data.twitterUrl}" target="_blank" class="x-button">
                    X (Twitter)
                </a>
            </div>
        </div>
    `;
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 255, 255, ' + Math.random() * 0.5 + ')';
        particle.style.borderRadius = '50%';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animation = `floating ${Math.random() * 10 + 10}s infinite linear`;
        particle.style.opacity = Math.random();

        particlesContainer.appendChild(particle);
    }
}
