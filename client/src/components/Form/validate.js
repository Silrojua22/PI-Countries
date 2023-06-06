const regexName = /[^A-Za-z0-9 ]+/g;

export const validate = (form) => {
    let errors = {}
    if (!form.name) { errors.name = "Name is required" }
    if (form.name.length < 3) { errors.name = "The name cannot be less than 3 characters" }
    if (form.name.length > 30) { errors.name = "The name cannot be longer than 30 characters" }
    if (regexName.test(form.name)) { errors.name = "The name cannot have special characters or tildes"}
    if (!form.difficulty || form.difficulty === " ") { errors.difficulty = "The difficulty field is required" }
    if (form.difficulty > 5 || form.difficulty < 1 ) { errors.difficulty = "Only values from 1 to 5 are accepted"}
    if(form.difficulty === "Select a difficulty") {errors.difficulty = "Not valid"}
    if (!form.duration || form.duration === " ") { errors.duration = "The duration field is required" } 
    if (form.duration >24 || form.duration < 1)  { errors.duration = "Only values from 1 to 24 are accepted"}
    if(!form.season || form.season.length === 0){errors.season = "Select at least one season"}
    if(!form.season || form.season.length > 2) {errors.season = "Select a maximun of two seasons"}
    if (!form.countries || form.countries.length === 0) { errors.countries = "Choose a country"}
     return errors;
}