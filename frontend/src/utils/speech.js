export const speakText = (text) => {
  if (!text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
};
