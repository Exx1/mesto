export default function renderLoading(submitButton) {
  console.log(submitButton.textContent);

  if (submitButton.textContent.indexOf(".") !== -1) {
    submitButton.textContent = submitButton.textContent.slice(0, -3);
  } else {
    submitButton.textContent = submitButton.textContent + '...';
  }
}
