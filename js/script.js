//print out the dom
let mainInviteeDiv = document.querySelector('.invitees-container');

//add the html
let invitee = '';


for (let eachInvitee of inviteeList) {
    let status = ((eachInvitee.status === true) ? 'invited' : 'pending').toUpperCase();
    invitee += generateInviteeCard(eachInvitee.firstName, eachInvitee.surname, );
}

mainInviteeDiv.innerHTML = invitee;

let allInvitee = document.querySelectorAll('.invitees');

//
let deleteData = document.getElementById('delete-data')
mainInviteeDiv.addEventListener('click', (e) => {

    let targetValue = e.target.className;
    let parentNode = e.target.parentNode.parentNode;
    let grandParentNode = parentNode.parentNode;
    if (targetValue === 'delete-data') {
        console.log(grandParentNode.parentNode);
        grandParentNode.removeChild(parentNode);

    }

    let editButton = document.createElement('input')
    editButton.type = 'text';
    editButton.className = 'edit-button';
    let fullName = parentNode.querySelector('.invitee-name')
    let firstName = (fullName).querySelector('#first-name');
    let lastName = (fullName).querySelector('#last-name');
    editButton.value = `${firstName.textContent} ${lastName.textContent}`;

    let isInvite = document.createElement('h2');
    isInvite.textContent = 'UNINVITE';


    if (targetValue === 'edit-data') {

        fullName.insertBefore(editButton, firstName);
        addElement(e, '/img/mark.svg', '#33126b', 'edit-data', 'save-data');

        changeDisplay(firstName, lastName, 'none');
    }

    if (targetValue === 'save-data') {
        addElement(e, '/img/edit.svg', 'white', 'save-data', 'edit-data');
        inputRemove = fullName.querySelector('.edit-button')
        splitNameUpdate = inputRemove.value.split(' ');
        firstName.textContent = splitNameUpdate[0];
        lastName.textContent = splitNameUpdate[1];
        fullName.removeChild(inputRemove);
        changeDisplay(firstName, lastName, 'block');
    }

    //when a user clicks invite
    if (e.target.textContent === 'INVITE') {
        // append a node to show 'uninvite'
        e.target.parentNode.appendChild(isInvite);

        //change the symbol and text to invites
        let statusTarget = e.target.parentNode.parentNode.querySelector('.status-content');
        statusTarget.querySelector('#status').textContent = `INVITED`;

        //symbol changed
        statusTarget.querySelector('img').src = '/img/mark.svg';

        //remove the 'invite child'
        e.target.parentNode.removeChild(e.target);
        isInvite.parentNode.classList.remove('background-invite-2');
        isInvite.parentNode.classList.add('background-invite');
    }

    if (e.target.textContent === 'UNINVITE') {
        statusTarget = e.target.parentNode.parentNode.querySelector('.status-content');
        statusTarget.querySelector('img').src = '/img/pending.png';
        statusTarget.querySelector('#status').textContent = `PENDING`;
        e.target.parentNode.classList.remove('background-invite');
        e.target.parentNode.classList.add('background-invite-2');
        e.target.textContent = 'INVITE';
    }
    // if (!checkClass
})


//FORM ELEMENT
searchForm = document.querySelector('.search-form');
// console.log(searchForm);


//ADDING A NEW ENTRY
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let newName = e.target.querySelector('input').value;
    if (newName) e.target.querySelector('input').value = '';
    let createName = (newName).split(' ');
    newName = ' ';

    if (createName.length < 2) return;

    let createInvitee = createDiv('div', 'invitees');

    const jsAppendHtml = generateInviteeCard(createName[0], createName[1], 'lower', true);
    createInvitee.innerHTML = jsAppendHtml;
    let firstChild = mainInviteeDiv.firstElementChild;
    mainInviteeDiv.insertBefore(createInvitee, firstChild);
});


//select the search icon
let searchIcon = document.querySelector('.search-bar-2');
let parentSearchForm = document.querySelector('.search-form-2')
let inputBox = document.querySelector('.input-search');
let closeIcon = document.querySelector('.close-button')
allInvitee = document.querySelectorAll('.invitees');



dynamicClass = ['unblock-search-input', 'change-search-icon', 'display-element'];
searchIcon.addEventListener('click', function(e) {
    e.preventDefault();
    inputBox.classList.add(dynamicClass[0]);
    searchIcon.classList.add(dynamicClass[1]);
    closeIcon.classList.add(dynamicClass[2]);
    allInvitee = document.querySelectorAll('.invitees');
    searchName(inputBox.value.toLowerCase(), allInvitee)
})


closeIcon.addEventListener('click', (e) => {
    e.preventDefault();
    inputBox.classList.remove(dynamicClass[0]);
    searchIcon.classList.remove(dynamicClass[1]);
    closeIcon.classList.remove(dynamicClass[2]);
    inputBox.value = "";

    searchName("", allInvitee)
})


//search for name function
function searchName(name, array) {
    let inviteSearchResult = '';
    for (let child of array) {
        let firstName = (child.querySelector('#first-name').textContent).toLowerCase();
        let lastName = child.querySelector('#last-name').textContent.toLowerCase();
        if (name == firstName || name == lastName) {
            child.style.display = '';
        } else child.style.display = 'none';

        if (name == "") {
            child.style.display = '';
        }
    }
}

//show only invitees
let trackInvitees = document.querySelector('.track-invitees');
let getNumberInvitee = document.querySelector('#invitee-number');
let ParentNumberInvitee = getNumberInvitee.parentNode;


trackInvitees.addEventListener('change', function(e) {
    pD(e);
    if (e.target.checked) {
        let invitee = 0;
        let allInvitee = document.querySelectorAll('.invitees');
        for (let child of allInvitee) {
            let status = child.querySelector('.invite-decide').textContent.toLowerCase();
            if (status.trim() == 'uninvite') {
                invitee += 1;
                child.style.display = '';
            } else {

                child.style.display = 'none';
            }
        }
        getNumberInvitee.textContent = invitee;
        ParentNumberInvitee.style.display = 'block';

    } else {
        for (let child of allInvitee) child.style.display = '';
        ParentNumberInvitee.style.display = 'none';
    }

})

//




//re-usable function

function addElement(e, src, bg, classRemove, classAdd) {
    e.target.src = src;
    e.target.style.backgroundColor = bg;
    e.target.classList.remove(classRemove);
    e.target.classList.add(classAdd);
};

function changeDisplay(first, last, display) {
    first.style.display = display;
    last.style.display = display;
}

function pD(e) {
    return e.preventDefault()
}


function generateInviteeCard(firstName, lastName, upper = 'lower', create = false) {
    if (upper == 'upper') {
        firstName = firstName.toUpperCase();
        lastName = lastName.toUpperCase();
    }

    let createFirstElement = (create == false) ? `<div class="invitees">` : ``;

    return `
        ${createFirstElement}
        <div class="invitee-name">
            
            <h2 id="first-name">${firstName}</h2>
                 <h4 id="last-name">${lastName}</h4>
            </div>
            <div class="edit-delete">
            <img src='img/delete-forever.svg' class='delete-data'>
            <img src='img/edit.svg'class='edit-data'>
            </div>
            <div class="div-status"></div>
            <div class="status-content">
            <img class="mark-icon" src="img/pending.png">
            <h1 id=status>PENDING</h1>
            </div>
            <div class="invite-decide background-invite-2">
            <h2>INVITE</h2></div></div>   
    `
}


function createDiv(div, className) {
    let createInvitee = document.createElement(div);
    createInvitee.classList.add(className);
    return createInvitee;
}