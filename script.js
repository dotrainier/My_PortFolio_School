const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  },
  { threshold: 0.1 }
);

const fadeInTargets = document.querySelectorAll('.monitorToFadeIn');
const fadeLeftTargets = document.querySelectorAll('.monitorToFadeLeft');
const fadeRightTargets = document.querySelectorAll('.monitorToFadeRight');
const scaleInTargets = document.querySelectorAll('.monitorToScaleIn');

fadeInTargets.forEach((target) => observer.observe(target));
fadeLeftTargets.forEach((target) => observer.observe(target));
fadeRightTargets.forEach((target) => observer.observe(target));
scaleInTargets.forEach((target) => observer.observe(target));

const now = new Date();
const formattedTime = now.toLocaleTimeString('en-US', {
  timeZone: 'Asia/Manila',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});
const phtTime = document.getElementById('pht-time');
phtTime.textContent = formattedTime;

function handleCopyClick() {
  const emailText = document.querySelector('.email-text .text').textContent;
  const copyTextElement = document.getElementById('copy_text');

  if (copyTextElement.textContent !== 'Copied') {
    const input = document.createElement('input');
    input.value = emailText;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);

    copyTextElement.textContent = 'Copied';
    copyTextElement.classList.add('animate');

    setTimeout(() => {
      copyTextElement.textContent = 'Copy';
      copyTextElement.classList.remove('animate');
    }, 2000);
  }
}
