let name = "", sex = "", date = "";
let dateNow = moment();

const container = document.querySelector('.container');
const letReg = document.querySelector('.let_reg');
const greeting = document.querySelector('.greeting');
const krest = document.querySelector('.krest');
const warning = document.querySelector('.warning');

const btnReestr = document.querySelector('.btn_reestr');
const btnSubmit = document.querySelector('.btn_submit');
const inpName = document.querySelector('.inp_name');
const inpSex = document.querySelector('.inp_sex');
const inpDate = document.querySelector('.inp_date');
const inp1 = document.querySelector('.inp1');

const enterReg = () => {  
    container.style.display = "block";
    letReg.style.display = "none";

};

const changeName = () => {
    let str = inpName.value;
    let alf = 'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя';
    let str1 = str.slice(-1).toLowerCase();
    if (alf.includes(str1)) {
        str = str[0].toUpperCase() + str.substr(1,str.length-1).toLowerCase();
    }  else {
        str = str.substr(0,str.length-1);
    }
    inpName.value = str;
};

const closeReg = () => {  
    container.style.display = "none";
    letReg.style.display = "block";
    greeting.style.display ='none';
};

const showWarning = (str) => {
    warning.style.display = "block";
    warning.innerHTML = str;
};

const hideWarning = () => {
    warning.style.display = "none";
};

const changeSex = () => {
    let sex = inpSex.value;
    switch (sex) {
        case '1':
            inp1.style.display = "none";
            hideWarning();
            break;
        
        case '2': 
            inp1.style.display = "block";
            showWarning(name + ', введіть Вашу дату народження');
            break;
        
        case '3': 
            inp1.style.display = "none";
            showWarning(name +', Ваш вік питати не будемо');
        
    }
};

const submit = () => {
    let flag = true;
    name = inpName.value;
    sex = inpSex.value;
    date = inpDate.value;
    let dateBirthday = moment(date);
    let years = dateNow.diff(dateBirthday, 'year');

    if ( !name || sex === '1') flag = false;
    if ( sex === '2' && date === "") flag = false; 
    if (sex === '2' && (years > 120 || years < 3)) flag = false;

    if (!flag) {
        showWarning('Правильно введіть усі необхідні дані !');
        setTimeout(hideWarning, 2000);  
        return;
    }

    if (sex === '2') {
        showWarning(name + ', Ваш вік - ' + String(years));
    }
 
    if (sex === '3') {
        showWarning(name + ', Вам стільки років, на скільки Ви себе почуваєте !');
    }   

    greeting.style.display = "block";
    if (sex === '2' && years < 18) { 
    greeting.innerHTML = name + ", Вам ще рано заходити на наш сайт !";
    } else {
    greeting.innerHTML = name + ", вітаємо Вас на на нашому сайті !";    
    }
};


btnReestr.addEventListener('click', enterReg);
krest.addEventListener('click', closeReg);
btnSubmit.addEventListener('click', submit);
inpSex.addEventListener('change', changeSex);
inpName.addEventListener('keyup', changeName);
inpName.addEventListener('change', () => {
    name = inpName.value;
    changeSex();
});


