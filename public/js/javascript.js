function time(){
    var currentTime = new Date();
    var day = currentTime.getDate();
    var month = currentTime.getMonth() + 1; // Months are zero based
    var year = currentTime.getFullYear();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    day = (day<10)? "0" + day : day;
    month = (month < 10) ? "0" + month : month;
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    var dateTimeString = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    document.getElementById("current-time").innerText = dateTimeString;
    
}
window.onload = function(){
    time();
    setInterval(time,1000);
}
function validateFormDog() {
    var breedDog = document.getElementById("breed-dog").value;
    var ageDog = document.getElementById("age-dog").value;
    var genderDog = document.querySelector('input[name="gender"]:checked');
    var childrenDog = document.getElementById("children-dog").checked;
    var otherDogsDog = document.getElementById("other-dogs-dog").checked;
    var catsDog = document.getElementById("cats-dog").checked;

    // Check if any required fields are empty
    if (breedDog === "" || ageDog === "" || !genderDog || (!childrenDog && !otherDogsDog && !catsDog)) {
        alert("Please fill out all required fields.");
        return false; // Prevent form submission
    }
    return true; // Proceed with form submission
}
function validateFormCat() {
    var breedCat = document.getElementById("breed-cat").value;
    var ageCat = document.getElementById("age-cat").value;
    var genderCat = document.querySelector('input[name="gender"]:checked');
    var childrenCat = document.getElementById("children-cat").checked;
    var dogsCat = document.getElementById("dogs-cat").checked;
    var otherCatsCat = document.getElementById("other-cats-cat").checked;

    if (breedCat === "" || ageCat === "" || !genderCat || (!childrenCat && !dogsCat && !otherCatsCat)) {
    alert("Please fill out all required fields.");
    return false; // Prevent form submission
    }
    return true; // Proceed with form submission
}
function validateForm() {
    var animal = document.querySelector('input[name="animal"]:checked');
    var breed = document.getElementById("breed").value;
    var age = document.getElementById("age").value;
    var gender = document.querySelector('input[name="gender"]:checked');
    var children = document.getElementById("children").checked;
    var dogs = document.getElementById("dogs").checked;
    var otherCats = document.getElementById("cats").checked;
    var comment = document.getElementById("comment").value;
    var fullName = document.getElementById("fname").value;
    var email = document.getElementById("email").value;

    // Check if any required fields are empty
    if (!animal || breed === "" || age === "" || !gender || (!children && !dogs && !otherCats) || fullName === "" || email === "" || comment =="") {
        alert("Please fill out all required fields.");
        return false; // Prevent form submission
    }

    // Check if the provided email follows a valid format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false; // Prevent form submission
    }

    return true; // Proceed with form submission
}