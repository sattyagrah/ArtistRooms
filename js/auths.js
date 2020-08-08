function initApp(){
    auth.onAuthStateChanged(user => {
        if(user){
            // users(user)
            console.log('User Logged In : ', user.email)
            document.querySelector('#userdetail').innerHTML = "Logged in as :" +" "+ user.email
            document.querySelector('#names').innerHTML = user.email.split("@")[0];
            document.querySelector('#auth').style.display = "none";
            document.querySelector('#logout').style.display = "block";
            forProfile();
            profilePicture();
            forProfilevid();
            // posts();
        }else{
            // users([])
            console.log('User Logged Out!! ')
        }
    });
}

window.onload = function() {
    initApp();
    getData();
    getDataVideo();
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

const formvid = document.querySelector('#signinVideo')
formvid.addEventListener('submit', (e) => {
    e.preventDefault()
    document.querySelector('#participationformsVideos').style.display = "none"
    const uploadedfilesvid = document.querySelector('#myFilevideo');
    let files = uploadedfilesvid.files[0]
    let storagerefvid = storage.ref('Videos/' + files.name)
    storagerefvid.put(files)
    storagerefvid.put(files).then( snapshot => {
        snapshot.ref.getDownloadURL().then(function(url){
            let videoRes = url
            db.collection('participants_video').add({
                Name : formvid.name.value,
                // Username : document.querySelector('#names').textContent,
                Phone_Number : formvid.phone.value,
                Theme : formvid.theme.value,
                Date : formvid.date.value,
                Payment_Mode : formvid.pmode.value,
                Transaction_ID : formvid.tid.value,
                Username : document.querySelector('#names').textContent,
                Uploaded_Video : videoRes,
            })
            // console.log(db.collection("participants").orderBy("Username", "asc"))
            console.log(videoRes)
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

const ongoingmatchesVideos = document.querySelectorAll('#ived');
console.log(ongoingmatchesVideos)
ongoingmatchesVideos.forEach(ele => {
    ele.addEventListener('click', (e) => {
        e.preventDefault()
        document.querySelector('#participationformsVideos').style.display = 'block';
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
