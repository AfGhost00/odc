const saisieTache = document.querySelector('.todo-input');
const boutonAjouter = document.querySelector('.todo-btn');
const listeTaches = document.querySelector('.todo-list');
const themeStandard = document.querySelector('.standard-theme');
const themeClair = document.querySelector('.light-theme');
const themeSombre = document.querySelector('.darker-theme');

boutonAjouter.addEventListener('click', ajouterTache);
listeTaches.addEventListener('click', supprimerOuCocher);
document.addEventListener("DOMContentLoaded", recupererTaches);
themeStandard.addEventListener('click', () => changerTheme('standard'));
themeClair.addEventListener('click', () => changerTheme('light'));
themeSombre.addEventListener('click', () => changerTheme('darker'));
let themeSauvegarde = localStorage.getItem('savedTheme');
themeSauvegarde === null ?
    changerTheme('standard') : changerTheme(localStorage.getItem('savedTheme'));

function ajouterTache(event) {
   
    event.preventDefault();

    const divTache = document.createElement("div");
    divTache.classList.add('todo', `${themeSauvegarde}-todo`);

    const nouvelleTache = document.createElement('li');
    if (saisieTache.value === '') {
        alert("Veuillez saisir une tâche !");
    } else {
        nouvelleTache.innerText = saisieTache.value;
        nouvelleTache.classList.add('todo-item');
        divTache.appendChild(nouvelleTache);

        sauvegarderTache(saisieTache.value);

        const boutonValider = document.createElement('button');
        boutonValider.innerHTML = '<i class="fas fa-check"></i>';
        boutonValider.classList.add('check-btn', `${themeSauvegarde}-button`);
        divTache.appendChild(boutonValider);
        const boutonSupprimer = document.createElement('button');
        boutonSupprimer.innerHTML = '<i class="fas fa-trash"></i>';
        boutonSupprimer.classList.add('delete-btn', `${themeSauvegarde}-button`);
        divTache.appendChild(boutonSupprimer);

     
        listeTaches.appendChild(divTache);

        saisieTache.value = '';
    }
}


function supprimerOuCocher(event) {
    const element = event.target;

    if (element.classList[0] === 'delete-btn') {

        element.parentElement.classList.add("fall");

        supprimerTacheLocal(element.parentElement);

        element.parentElement.addEventListener('transitionend', function() {
            element.parentElement.remove();
        });
    }

    if (element.classList[0] === 'check-btn') {
        element.parentElement.classList.toggle("completed");
    }
}

function sauvegarderTache(tache) {
    let taches;
    if (localStorage.getItem('todos') === null) {
        taches = [];
    } else {
        taches = JSON.parse(localStorage.getItem('todos'));
    }

    taches.push(tache);
    localStorage.setItem('todos', JSON.stringify(taches));
}

function recupererTaches() {
    let taches;
    if (localStorage.getItem('todos') === null) {
        taches = [];
    } else {
        taches = JSON.parse(localStorage.getItem('todos'));
    }

    taches.forEach(function(tache) {
        const divTache = document.createElement("div");
        divTache.classList.add("todo", `${themeSauvegarde}-todo`);

        const nouvelleTache = document.createElement('li');
        nouvelleTache.innerText = tache;
        nouvelleTache.classList.add('todo-item');
        divTache.appendChild(nouvelleTache);

        // bouton pour valider (cocher)
        const boutonValider = document.createElement('button');
        boutonValider.innerHTML = '<i class="fas fa-check"></i>';
        boutonValider.classList.add("check-btn", `${themeSauvegarde}-button`);
        divTache.appendChild(boutonValider);

        // bouton pour supprimer
        const boutonSupprimer = document.createElement('button');
        boutonSupprimer.innerHTML = '<i class="fas fa-trash"></i>';
        boutonSupprimer.classList.add("delete-btn", `${themeSauvegarde}-button`);
        divTache.appendChild(boutonSupprimer);

        // ajout de la tâche à la liste
        listeTaches.appendChild(divTache);
    });
}

// fonction pour supprimer une tâche dans le stockage local
function supprimerTacheLocal(tache) {
    let taches;
    if (localStorage.getItem('todos') === null) {
        taches = [];
    } else {
        taches = JSON.parse(localStorage.getItem('todos'));
    }

    const indexTache = taches.indexOf(tache.children[0].innerText);
    taches.splice(indexTache, 1);
    localStorage.setItem('todos', JSON.stringify(taches));
}

function changerTheme(couleur) {
    localStorage.setItem('savedTheme', couleur);
    themeSauvegarde = localStorage.getItem('savedTheme');

    document.body.className = couleur;

    // changement du curseur clignotant pour le thème sombre
    if (couleur === 'darker') {
        document.getElementById('title').classList.add('darker-title');
    } else {
        document.getElementById('title').classList.remove('darker-title');
    }

    document.querySelector('input').className = `${couleur}-input`;

    document.querySelectorAll('.todo').forEach(todo => {
        Array.from(todo.classList).some(item => item === 'completed') ?
            todo.className = `todo ${couleur}-todo completed`
            : todo.className = `todo ${couleur}-todo`;
    });

    document.querySelectorAll('button').forEach(bouton => {
        Array.from(bouton.classList).some(item => {
            if (item === 'check-btn') {
                bouton.className = `check-btn ${couleur}-button`;
            } else if (item === 'delete-btn') {
                bouton.className = `delete-btn ${couleur}-button`;
            } else if (item === 'todo-btn') {
                bouton.className = `todo-btn ${couleur}-button`;
            }
        });
    });
}
