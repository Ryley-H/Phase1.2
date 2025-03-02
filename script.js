function showTab(tabName) {
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => content.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
}

