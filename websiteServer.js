const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 5450;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Load header and footer
const header = fs.readFileSync('./views/header.ejs', 'utf8');
const footer = fs.readFileSync('./views/footer.ejs', 'utf8');

// Home Route
app.get('/', (req, res) => {
    res.render('home-page', {
        header: header,
        footer: footer,
        session: req.session
    });
});

app.get('/privacy-disclaimer-statement', (req, res) => {
    res.render('privacy-disclaimer-statement', {
        header: header,
        footer: footer,
        session: req.session
    });
});

app.get('/cat-care', (req, res) => {
    res.render('cat-care', {
        header: header,
        footer: footer,
        session: req.session
    });
});

app.get('/contact-us', (req, res) => {
    res.render('contact-us', {
        header: header,
        footer: footer,
        session: req.session
    });
});

app.get('/dog-care', (req, res) => {
    res.render('dog-care', {
        header: header,
        footer: footer,
        session: req.session
    });
});

app.get('/find-dog-cat', (req, res) => {
    res.render('find-dog-cat', {
        header: header,
        footer: footer,
        session: req.session
    });
});

app.get('/have-pet-giveaway', (req, res) => {
    res.render('have-pet-giveaway', {
        header: header,
        footer: footer,
        session: req.session
    });
});

app.get('/pets', (req, res) => {
    res.render('pets', {
        header: header,
        footer: footer,
        session: req.session
    });
});

// Create Account Route
app.get('/create-account', (req, res) => {
    res.render('create-account', {
        header: header,
        footer: footer,
        session: req.session
    });
});

app.post('/create-account', (req, res) => {
    const { username, password } = req.body;

    // Validate username and password format
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

    if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
        return res.send('<script>alert("Invalid username or password format. Please try again."); window.location.href="/";</script>');
    }

    // Check if username already exists
    const existingUsers = fs.readFileSync('./login.txt', 'utf8').split('\n');
    const usernames = existingUsers.map(user => user.split(':')[0]);
    
    if (usernames.includes(username)) {
        return res.send('<script>alert("Username already exists. Please choose another one."); window.location.href="/create-account";</script>');
    }

    // Write new user to login.txt
    const userData = `${username}:${password}\n`;
    fs.appendFileSync('./login.txt', userData);
    
    req.session.loggedin = true;
    req.session.username = username;


    res.send('<script>alert("Account created successfully. You can now fiill out the Have a pet to giveaway form"); window.location.href="/have-pet-giveaway";</script>');
});
app.post('/have-pet-giveaway', (req, res) => {
    if (!req.session.loggedin) {
        res.send('<script>alert("You need to be logged in to register a pet."); window.location.href="/create-account";</script>');
        return;
    }

    const { animal, breed, age, gender, children, dogs, cats, comment, fname, email } = req.body;

    const petsData = fs.readFileSync('./available-pets.txt', 'utf8').split('\n');
    
    // Construct pet data
    
    const petData = `${petsData.length}:${req.session.username}:${animal}:${breed}:${age}:${gender}:${children ? 'children,' : ''}${dogs ? 'dogs,' : ''}${cats ? 'cats,' : ''}:${comment}:${fname}:${email}\n`;
    //SINCE THE CURSOR SHOULD BE ON ITS OWN NEW LINE AFTER A USER GIVES AWAY A PET. IT WILL REGOSTER AN EXTRA LINE WITH THE LENGTH SO NO NEED FOR PETSDATA.LENGTH +1
    // Write pet data to file
    fs.appendFile(path.join(__dirname, 'available-pets.txt'), petData, (err) => {
        if (err) {
            res.send('<script>alert("Error registering pet. Please try again."); window.location.href="/have-pet-giveaway";</script>');
            return;
        }
        res.send('<script>alert("Pet registered successfully!"); window.location.href="/";</script>');
    });
});


app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send('Error logging out');
        }
        res.send('<script>alert("You are logged out."); window.location.href="/";</script>');
    });
});

app.post('/find-dog-cat', (req, res) => {
    const { animal, breed, age, gender } = req.body;

    // Read availablePets.txt file
    const petsData = fs.readFileSync('./available-pets.txt', 'utf8').split('\n');
    
    // Filter pets based on criteria
    const filteredPets = petsData.filter(pet => {
        const [_, petOwner, petAnimal, petBreed, petAge, petGender, petTraits] = pet.split(':');
        
        if ((animal === 'cat' && petAnimal === 'cat') || (animal === 'dog' && petAnimal === 'dog')) {
            return (
                (breed === 'nomatter' || petBreed === breed) &&
                (age === 'nomatter' || petAge === age) &&
                (gender === 'nomatter' || petGender === gender)
            );
        }
        return false;
    }).map(pet => {
        const [petId, _, petAnimal, petBreed, petAge, petGender, petTraits] = pet.split(':');
        return {
            id: petId,
            animal: petAnimal,
            breed: petBreed,
            age: petAge,
            gender: petGender,
            traits: petTraits
        };
    });

    res.render('found-pets', {
        header: header,
        footer: footer,
        session: req.session,
        pets: filteredPets
    });
});


app.listen(port, () => {
    console.log(`Server running on  http://soen287.encs.concordia.ca:${port}/`);
});
