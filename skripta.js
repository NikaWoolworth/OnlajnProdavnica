let nizKorisnika = [];
/*
Struktura:
let korisnik = {
    korisnickoIme: "tasha",
    mejl: "tasha@etf.rs",
    telefon: "0641234567",
    lozinka: "sifra123"
}

let mejl = korisnik.mejl ;
let lozinka = korisnik.lozinka;
*/

function init() {
    let tekstNizKorisnika = localStorage.getItem("nizKorisnika");
    if (tekstNizKorisnika != null) {
        nizKorisnika = JSON.parse(tekstNizKorisnika);
    }
}

function resetujGreske() {
    document.getElementById("korisnickoImeGreska").innerHTML = "";
    document.getElementById("mejlGreska").innerHTML = "";
    document.getElementById("telefonGreska").innerHTML = "";
    document.getElementById("lozinkaGreska").innerHTML = "";
    document.getElementById("potvrdaLozinkeGreska").innerHTML = "";
}


function dohvatiIProveriPodatke() {
    resetujGreske();
    let korisnickoIme = document.getElementById("korisnickoIme").value;
    let mejl = document.getElementById("mejl").value;
    let telefon = document.getElementById("telefon").value;
    let lozinka = document.getElementById("lozinka").value;
    let potvrdaLozinke = document.getElementById("potvrdaLozinke").value;

    //-provericu da li su uneta sva polja (ni jedno nije prazno)
    //  ako nije uneto, u polje ...Greska ispisujemo da polje nije popunjeno, 
    //    i vracamo se nazad (return false)
    if (korisnickoIme == "") {
        document.getElementById("korisnickoImeGreska").innerHTML = "Korisnicko ime nije unetu";
        return false;
    }
    if (mejl == "") {
        document.getElementById("mejlGreska").innerHTML = "Mejl nije uneto";
        return false;
    }
    if (telefon == "") {
        document.getElementById("telefonGreska").innerHTML = "Telefon nije unet";
        return false;
    }
    if (lozinka == "") {
        document.getElementById("lozinkaGreska").innerHTML = "Lozinka nije uneta";
        return false;
    }
    if (potvrdaLozinke == "") {
        document.getElementById("potvrdaLozinkeGreska").innerHTML = "Potvrda lozinke nije uneta";
        return false;
    }

    // provericu da li je lozinka i potvrdaLozinke iste, i uradimo slicno sto i gore
    if (lozinka != potvrdaLozinke) {
        alert("Lozinke se ne poklapaju");
        return false;
    }

    return true;
}

function proveriDaLiKorisnikVecPostoji() {
    let korisnickoIme = document.getElementById("korisnickoIme").value;
    // treba ovde da proverim da li vec ima neko sa tim korisnik imenom

    for (let i = 0; i < nizKorisnika.length; i++) {
        if (nizKorisnika[i].korisnickoIme == korisnickoIme) {
            document.getElementById("korisnickoImeGreska").innerHTML =
                "Korisnik sa tim korisnickim imenom vec postoji";
            return true;
        }
    }
    /*
        for(let kor of nizKorisnika){
            if(kor.korisnickoIme == korisnickoIme) {
                document.getElementById("korisnickoImeGreska").innerHTML=
                    "Korisnik sa tim korisnickim imenom vec postoji";
                    return true;
            }
        }
    */
    return false;
}

function dodajKorisnika() {
    //v1
    let korisnickoIme = document.getElementById("korisnickoIme").value;
    let mejl = document.getElementById("mejl").value;
    let telefon = document.getElementById("telefon").value;
    let lozinka = document.getElementById("lozinka").value;
    let korisnik = {
        korisnickoIme: korisnickoIme,
        mejl: mejl,
        telefon: telefon,
        lozinka: lozinka
    }

    /* v2
    let korisnik = {
        korisnickoIme: document.getElementById("korisnickoIme").value,
        mejl: document.getElementById("mejl").value,
        telefon: document.getElementById("telefon").value,
        lozinka: document.getElementById("lozinka").value
    }
    */
    //dodajemo u niz
    nizKorisnika.push(korisnik);
    console.log(nizKorisnika);
    alert("Uspesna registracija");
    //novog korisnika je potrebno da sacuvamo i u localstorage
    let tekstNizKorisnika = JSON.stringify(nizKorisnika);
    localStorage.setItem("nizKorisnika", tekstNizKorisnika);
}

function registrujSe() {
    // pokupimo podatke i proverimo da li su u zadatom formatu
    // TODO: -ukoliko su u losem formatu, ispisemo gresku 
    if (dohvatiIProveriPodatke()) {
        // -ukoliko su u dobrom formatu, proverimo da nije vec registrovan
        if (!proveriDaLiKorisnikVecPostoji()) {
            // -ukoliko ne postoji, sacuvamo registrovanog korisnika
            dodajKorisnika();
        }
        // -ukoliko jeste, javimo gresku

    }
}

function prijava() {
    let korisnickoIme = document.getElementById("korisnickoIme").value;
    let lozinka = document.getElementById("lozinka").value;

    // korisnickoIme = "Pavle"
    // document.getElementById("korisnickoIme").value = "Pavle"

    for (let i = 0; i < nizKorisnika.length; i++) {
        let trenutniKorisnik = nizKorisnika[i]
        console.log(trenutniKorisnik)
        if (trenutniKorisnik.korisnickoIme == korisnickoIme && trenutniKorisnik.lozinka == lozinka) {
            localStorage.setItem("ulogovaniKorisnik", trenutniKorisnik.korisnickoIme)
            localStorage.setItem("ulogovaniKorisnikMejl", trenutniKorisnik.mejl)

            console.log("korisnik logovan")
            window.location.href = "prodavnica.html"

        }
    }
}

function izlogujSe() {
    localStorage.removeItem("ulogovaniKorisnik")
    localStorage.removeItem("ulogovaniKorisnikMejl")

    window.location.href = "prijava.html"
}

function initProdavnica() {
    let korisnickoIme = localStorage.getItem("ulogovaniKorisnik")

    // NE VALJA! Radi se nad kopijom
    // let vrednostNaslova = document.getElementById('naslov').innerHTML
    // vrednostNaslova = "Dobrodosli, " + korisnickoIme + "!"
    document.getElementById('naslov').innerHTML = "Dobrodosli, " + korisnickoIme + "!"

}


function filtriraj() {
    let nikeChecked = document.getElementById("nike").checked;
    let adidasChecked = document.getElementById("adidas").checked;
    let pumaChecked = document.getElementById("puma").checked;
    let skechersChecked = document.getElementById("skechers").checked;

    let nizSlika = document.getElementsByTagName("img")
    let nizBrendova = [];


    if (nikeChecked) nizBrendova.push("nike")
    if (adidasChecked) nizBrendova.push("adidas")
    if (pumaChecked) nizBrendova.push("puma")
    if (skechersChecked) nizBrendova.push("skechers")


    for (let i = 0; i < nizSlika.length; i++) {
        // let found = false;
        nizSlika[i].style.display = "none";
        for (let j = 0; j < nizBrendova.length; j++) {
            if (nizSlika[i].classList.contains(nizBrendova[j])) {
                // found = true;
                nizSlika[i].style.display = "";
                break;
            }
        }

        // if (found) {
        //     nizSlika[i].style.display = "";
        // } else {
        //     nizSlika[i].style.display = "none";
        // }
    }
}





// Objasnjenje, nije deo zadatka:
function test(a, b) {
    /* let a = 6;
     let b = 4;*/
    if (a < b) {
        return false;
    }
    /*
    else {
        return true;
    }*/
    return true;
}
 // let ok = test(1,4)