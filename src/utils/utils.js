export default function renderLoading(submitButton) {
  if (submitButton.textContent.indexOf(".") !== -1) {
    submitButton.textContent = submitButton.textContent.slice(0, -3);
  } else {
    submitButton.textContent = submitButton.textContent + '...';
  }
}
