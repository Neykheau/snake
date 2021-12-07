// Variables
let canvas = document.getElementById('plateau');
let ctx = canvas.getContext('2d');


let l = H = 20;
let x = Math.trunc(Math.random() * plateau.width / l) * l;
let y = Math.trunc(Math.random() * plateau.height / H) * H;
let dirx = diry = 0;


let trace = [];
let tailleTrace = tailleInitTrace = 5;
let sautTrace = 1;
let tailleMaxTrace = 100;


let dt, distance;
let compteBoucle = 0;
let sautBoucle = 10;
let PommeX = Math.trunc(Math.random() * plateau.width / l) * l;
let PommeY = Math.trunc(Math.random() * plateau.height / H) * H;
let PommeRadius = 10;
let score = 0;
let question;
let collisiontrace = false;


window.onload = function () {
    // Rapidité du jeu 
    let intervalID = setInterval(game, 100);
    document.addEventListener("keydown", keyboard);
}

function game() {


    // Affichage du plateau
    ctx.clearRect(0, 0, plateau.width, plateau.height);


    // Affichage du serpent 
    ctx.fillStyle = "#F5C905";
    for (let i = 0; i < trace.length; i++) {
        ctx.fillRect(trace[i].x, trace[i].y, l - 3, H - 3);
    }


    //Affichage de la pomme
    ctx.beginPath();
    ctx.arc(PommeX + PommeRadius, PommeY + PommeRadius, PommeRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#e74c3c";
    ctx.fill();
    ctx.closePath();


    // Affichage d'un v sur la pomme pour donner l'impression d'une feuille
    ctx.font = '16px Arial';
    ctx.fillStyle = '#2ecc71';
    ctx.fillText('V', PommeX + 3, PommeY + 3);


    // Affichage du score
    ctx.font = '16px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText('Score: ' + score, 5, 20);


    // Mouvement du serpent et apparition de la trace
    x += dirx * l;
    y += diry * H;
    // On augmente tailleTrace toutes les secondes (soit 100 boucles)
    if (tailleTrace <= tailleMaxTrace) {
        if ((compteBoucle++) % 10 == 1) {
            sautBoucle--;
        }
    }
    // On insére la valeur de x et y dans le tableau
    trace.push({ x: x, y: y });
    // tant que la taille du tableau (soit la trace) depasse la taille maximum
    while (trace.length > tailleTrace) {
        // alors on enlève un élément
        trace.shift();
    }


    // Collision entre le serpent et la pomme
    if (x == PommeX && y == PommeY) {
        score += 10 + 2 * ((tailleTrace - tailleInitTrace) / sautTrace);
        // Augmentation de la taille du serpent
        tailleTrace += 2;
        // Si la taille a été augmenté on enlève un saut d'expansion de trace
        if (tailleTrace > tailleInitTrace) {
            tailleTrace -= sautTrace;
        }
        // On réinitialise le compte à rebours pour relancer l'expansion
        sautBoucle = 10;
        // On choisit une autre position pour la pomme
        PommeX = Math.trunc(Math.random() * plateau.width / l) * l;
        PommeY = Math.trunc(Math.random() * plateau.height / H) * H;


    }
    // Auto-collision
    if (trace.length > 5) {
        for (let i = 0; i < trace.length - 1; i++) {
            if (trace[i].x == trace[trace.length - 1].x && trace[i].y == trace[trace.length - 1].y) {
                collisiontrace = true;
                console.log(collisiontrace = true);
                if (collisiontrace === true) {
                    question = confirm("Voulez-vous rejouer ?");
                    if (question == true) {
                        location.reload(true);
                    }
                } else {
                    collisiontrace = false;
                }
                console.log(collisiontrace = true)
            }
        }
    }
    // Collision sur les murs
    if (x < 0 || x > (plateau.width - l) || y < 0 || y > (plateau.height - H)) {
        collisiontrace == true;
        if (collisiontrace === true) {
            question = confirm("Voulez-vous rejouer ?")
            if (question == true) {
                location.reload(true)
            }
        } else {
            collisiontrace = false;
        }
        console.log(collisiontrace = true)
    }
}

// Touches directionnelles et pause
function keyboard(evt) {
    switch (evt.keyCode) {
        // ici on fait en sorte que le serpent ne 
        // puisse pas faire de demi-tour (Haut -> Bas / Bas -> Haut /
        // Droite -> Gauche / Gauche -> Droite)
        case 37:
            // touche gauche
            if (dt == 39) {
                break;
            }
            dt = evt.keyCode;
            dirx = -1;
            diry = 0;
            break;
        case 38:
            // touche haut
            if (dt == 40) {
                break;
            }
            dt = evt.keyCode;
            dirx = 0;
            diry = -1;
            break;
        case 39:
            // touche droite
            if (dt == 37) {
                break;
            }
            dt = evt.keyCode;
            dirx = 1;
            diry = 0;
            break;
        case 40:
            // touche bas
            if (dt == 38) {
                break;
            }
            dt = evt.keyCode
            dirx = 0;
            diry = 1;
            break;
        case 32:
            // touche espace (pause)
            let pause = confirm("Le jeu est en pause. Reprendre ?")
            if (pause === false) {
                location.reload()
            }
            break;
    }
}
