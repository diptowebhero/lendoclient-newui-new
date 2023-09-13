export async function copyTextToClipboard(text) {
  if ("clipboard" in navigator) {
    await navigator.clipboard.writeText(text);
  } else {
    document.execCommand("copy", true, text);
  }
}
export default copyTextToClipboard;
