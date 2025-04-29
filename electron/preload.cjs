// Tous les modules Node.js peuvent être utilisés ici.
// Ils sont définis dans le contexte du processus principal.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }
  
  // Exposer des informations sur la plateforme
  window.isElectron = true;
  window.platform = process.platform;
});