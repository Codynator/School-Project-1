const parCopy = document.getElementById("par-copy");


// Wypisuje rok przy wejściu na stronę
function printYear() {
    const date = new Date();
    const msg = date.toLocaleString("default", {"year": "numeric"});
    parCopy.innerHTML = `© DeepDive Cinema ${msg}`;
}

printYear();