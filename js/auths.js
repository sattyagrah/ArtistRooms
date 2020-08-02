function initApp(){
    auth.onAuthStateChanged(user => {
        if(user){
            // users(user)
            console.log('User Logged In : ', user.email)
            document.querySelector('#names').innerHTML = user.email.split("@")[0];
            document.querySelector('#auth').style.display = "none";
            document.querySelector('#logout').style.display = "block";
            forProfile();
            profilePicture();
        }else{
            // users([])
            console.log('User Logged Out!! ')
        }
    });
}

window.onload = function() {
    initApp();
    getData();
    db.collection('participants').get().then((snapshot) => {
        // setUp(snapshot.docs)
        snapshot.docs.forEach(doc => {
            console.log(doc.id, " => ", doc.data(), doc.data().Uploaded_File)
        })
    })
};

const form = document.querySelector('#signin')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    document.querySelector('#participationforms').style.display = "none"
    const uploadedfiles = document.querySelector('#myFile');
    let files = uploadedfiles.files[0]
    let storageref = storage.ref('images/' + files.name)
    storageref.put(files)
    storageref.put(files).then( snapshot => {
        snapshot.ref.getDownloadURL().then(function(url){
            let imageRes = url
            db.collection('participants').add({
                Name : form.name.value,
                // Username : document.querySelector('#names').textContent,
                Phone_Number : form.phone.value,
                Theme : form.theme.value,
                Date : form.date.value,
                Payment_Mode : form.pmode.value,
                Transaction_ID : form.tid.value,
                Username : document.querySelector('#names').textContent,
                Uploaded_File : imageRes,
            })
            // console.log(db.collection("participants").orderBy("Username", "asc"))
            console.log(imageRes)
        })
    })
    console.log(files)
    console.log(files.name)
})

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        document.querySelector('#auth').style.display = "block";
        document.querySelector('#logout').style.display = "none";
        window.location.replace("index.html")
        // console.log("User Signed Out")
    })
})

const ongoingmatches = document.querySelectorAll('#imgs');
console.log(ongoingmatches)
ongoingmatches.forEach(ele => {
    ele.addEventListener('click', (e) => {
        e.preventDefault()
        document.querySelector('#participationforms').style.display = 'block';
    })
});

const upcomingNotice = document.querySelectorAll('#uimgs');
console.log(upcomingNotice)
upcomingNotice.forEach(ele => {
    ele.addEventListener('click', (e) => {
        e.preventDefault()
        document.querySelector('#upcomingnotice').style.display = 'block';
    })
})
const previousInfo = document.querySelectorAll('#pimgs');
console.log(previousInfo)
previousInfo.forEach(ele => {
    ele.addEventListener('click', (e) => {
        e.preventDefault()
        document.querySelector('#previousnotice').style.display = 'block';
    })
})


