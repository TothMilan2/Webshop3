

    fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('data').innerHTML = data.map(user => `<tr><td>${user.name}</td><td>${user.email}</td><td>${user.city}</td><td>${user.phone}</td><td>${user.role}</td><td><button class="btn btn-warning" onclick=modify(${user.id}) id="modifyUser('${user.id}')">Modify</button></td><td><button class="btn btn-danger" onclick=deleteUser(${user.id})>Törlés</td></tr>`).join('');

});



document.getElementById('addUserBtn').addEventListener('click', () => {
   
    let nev = document.getElementById("newName").value
    let e = document.getElementById("newEmail").value
    let c = document.getElementById("newCity").value
    let p = document.getElementById("newPhone").value
    let r = document.getElementById("newRole").value

    let correctName = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/

    let correctEmail = /^[a-zA-Z._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/

    if(nev=="" || e=="" || c=="" || p=="" ){
        alert("Minden mezőt ki kell tötleni!")

    }
    else if(correctName.test(nev)){
        alert("Helytelen név formátum (helyes: Újnév Sándor)")
    }
    else if(correctEmail.test(e)){
        alert("Helytelen email formátum (helyes: valami123@gmail.com)")
    }
    else if(isNaN(p)){
        alert("A telefon mezőbe csak szám mehet")
    }
    else{
         fetch('http://localhost:3000/users', {
        method: 'POST',
        body: JSON.stringify({
            name: nev,
            email: e,
            city: c,
            phone: p,
            role: r
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })    

        document.getElementById('newName').value = '';
        document.getElementById('newEmail').value = '';
        document.getElementById('newCity').value = '';
        document.getElementById('newPhone').value = '';
        document.getElementById('newRole').value = '';
    }



   

})  



function modify(userId){


        let nev = document.getElementById("newName").value
        let e = document.getElementById("newEmail").value
        let c = document.getElementById("newCity").value
        let p = document.getElementById("newPhone").value
        let r = document.getElementById("newRole").value

    

    fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({
            name: nev,
            email: e,
            city: c,
            phone: p,
            role: r
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        
})    
document.getElementById('newName').value = '';
document.getElementById('newEmail').value = '';
document.getElementById('newCity').value = '';
document.getElementById('newPhone').value = '';
document.getElementById('newRole').value = '';


}





function deleteUser(userId){
    
    fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE',
        body: JSON.stringify({
            name: document.getElementById('newName').value,
            email: document.getElementById('newEmail').value,
            city: document.getElementById('newCity').value,
            phone: document.getElementById('newPhone').value,
            role: document.getElementById('newRole').value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        
})    

}