document.addEventListener("DOMContentLoaded", () => {
    const myInfo = new URLSearchParams(window.location.search);

    document.querySelector("#results").innerHTML = `
    <ul>
    <li>QUOTE REQUESTED BY: ${myInfo.get('name')}</li>
    <li>EMAIL: ${myInfo.get('email')}</li>
    <li>CELPHONE: ${myInfo.get('phone')}</li>
    <li>FORM COMPLETED ON: ${myInfo.get('formTimestamp')}</li>
    </ul>
  `;
});