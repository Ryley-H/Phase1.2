function showTab(tabName) {
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => content.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
}

function showNotification() {
    document.getElementById('notification').style.display = 'block';
}

function closeNotification() {
    document.getElementById('notification').style.display = 'none';
}

document.getElementById("submit-choices").addEventListener("click", function () {
    let selectedLanguage = document.querySelector('input[name="language"]:checked');
    let selectedYear = document.getElementById("year-dropdown").value;

    let result = "You selected: ";
    result += selectedLanguage ? selectedLanguage.value : "No language selected";
    result += " and " + selectedYear;
    document.getElementById("result-choices").textContent = result;
});


