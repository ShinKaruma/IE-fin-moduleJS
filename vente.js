var express = require('express')
var session = require('cookie-session')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express()
const animaux = [
    new Animal(new TypeAnimal(1, 13), 1),
    new Animal(new TypeAnimal(1, 7), 2),
    new Animal(new TypeAnimal(2, 17), 1),
    new Animal(new TypeAnimal(2, 12), 2)
]

const legumes = [
    new Legume(new TypeLegume(1, 3), 1),
    new Legume(new TypeLegume(1, 2), 2),
    new Legume(new TypeLegume(1, 5), 3),
    new Legume(new TypeLegume(2, 1), 1),
    new Legume(new TypeLegume(2, 2), 2)
]

const fruits = [
    new Fruit(new TypeFruit(1, 7), 1),
    new Fruit(new TypeFruit(1, 5), 2),
    new Fruit(new TypeFruit(2, 3), 1),
    new Fruit(new TypeFruit(3, 6), 1),
]

app.use(session({ secret: 'ventestopsecret' }))
    .use(function (req, res, next) {
        // vérification s'il existe déjà une liste (middleware 'maison')
        if (typeof (req.session.ventes) == 'undefined') {
            req.session.ventes = []
            req.session.animaux = animaux
            req.session.legumes = legumes
            req.session.fruits = fruits
        }
        next()
    })
    .get('/ventes', function (req, res) {
        // On affiche la todolist et le formulaire
        res.render('ventes.ejs', { 
            ventes: req.session.ventes, 
            animaux: req.session.animaux,
            legumes: req.session.legumes,
            fruits: req.session.fruits
        })
    })
    .post('/ventes/ajouter/', urlencodedParser, function(req, res) {
        // ajouter un élément à la liste (si le champs n'est pas vide)
        if (req.body.poids != '') {

            var vente = new Vente(req.body.typeVente, new DateVente(new Date()), req.body.poids)

            req.session.ventes.push(vente)
        }
        res.redirect('/ventes')
        })




class TypeAnimal {
    constructor(codeTypeAnimal, prixAuKilo) {
        this.codeTypeAnimal = codeTypeAnimal;
        this.prixAuKilo = prixAuKilo;
    }
}

class TypeLegume {
    constructor(codeTypeLegume, prixAuKilo) {
        this.codeTypeLegume = codeTypeLegume;
        this.prixAuKilo = prixAuKilo;
    }
}

class TypeFruit {
    constructor(codeTypeFruit, prixAuKilo) {
        this.codeTypeFruit = codeTypeFruit;
        this.prixAuKilo = prixAuKilo;
    }
}

class Animal {
    constructor(TypeAnimal, codeAnimal) {
        this.TypeAnimal = TypeAnimal;
        this.codeAnimal = codeAnimal;
    }
}

class Legume {
    constructor(TypeLegume, codeLegume) {
        this.TypeLegume = TypeLegume;
        this.codeLegume = codeLegume;
    }
}

class Fruit {
    constructor(TypeFruit, codeFruit) {
        this.TypeFruit = TypeFruit;
        this.codeFruit = codeFruit;
    }
}

class DateVente {
    constructor(dateDeVente) {
        this.dateDeVente = dateDeVente;
    }
}

class Vente {
    constructor(typeVente, Date, poids) {
        this.typeVente = typeVente;
        this.Date = Date;
        this.poids = poids;
    }
}