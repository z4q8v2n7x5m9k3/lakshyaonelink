document.addEventListener('DOMContentLoaded', () => {
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2400);
  }

  async function shareProfile() {
    const shareData = {
      title: 'Lakshya Kaushik | Singer, Guitarist & Live Performer',
      text: 'Check out Lakshya Kaushik — Singer & Acoustic Performer for live gigs, private events, weddings and restaurant residencies.',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
      showToast('Profile link copied to clipboard');
    } catch (error) {
      if (error && error.name === 'AbortError') return;
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Profile link copied to clipboard');
      } catch (_) {
        showToast('Use your browser share menu');
      }
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!');
    } catch (_) {
      showToast('Could not copy link');
    }
  }

  // Bind Share Buttons
  document.getElementById('shareTop')?.addEventListener('click', shareProfile);
  document.getElementById('shareProfile')?.addEventListener('click', shareProfile);
  document.getElementById('copyProfileLink')?.addEventListener('click', copyLink);

  // Save Contact (vCard Download)
  document.getElementById('saveContact')?.addEventListener('click', () => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Kaushik;Lakshya;;;',
      'FN:Lakshya Kaushik',
      'ORG:Lakshya Kaushik Live Music',
      'TITLE:Singer, Guitarist & Live Performer',
      'TEL;TYPE=CELL,VOICE,PREF:+916396200867',
      'X-SOCIALPROFILE;TYPE=instagram:https://instagram.com/serenmuzic',
      `URL:${window.location.href}`,
      'NOTE:T-Series StageWorks Academy Alumni. Available for live singing, acoustic sets, cafe & restaurant residencies, private celebrations & corporate events.',
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Lakshya-Kaushik.vcf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast('Contact card (.vcf) downloaded');
  });
});
