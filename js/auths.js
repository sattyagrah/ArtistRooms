function initApp(){
    auth.onAuthStateChanged(user => {
        if(user){
            // users(user)
            console.log('User Logged In : ', user.email)
            document.querySelector('#names').innerHTML = user.email.split("@")[0];
            document.querySelector('#auth').style.display = "none";
            document.querySelector('#logout').style.display = "block";
        }else{
            // users([])
            console.log('User Logged Out!! ')
        }
    });
}

window.onload = function() {
    initApp();
    db.collection("participants").where("Username", "==", document.querySelector('#names').textContent)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    console.log(db.collection("participants").orderBy("Username", "asc"))
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
                Uploaded_File : imageRes
            })
            console.log(db.collection("participants").orderBy("Username", "asc"))
            console.log(imageRes)
            const parent = document.querySelector('.feeds').querySelector('#new_posts')
            let html = "" 
            let li =  `
            <div class="card col-md-12" style="width: 100%; height: 60%; max-width: 700px;">
                    <div class="" style="padding:10px; text-align: left; width: auto;"><h5 class="card-text" style="font-family: 'Gotu', sans-serif;"> Tambe </h5>
                    </div>
                    <img id="upimgs" class="card-img-top" src=${imageRes} alt="Card image cap">
                    <div class="card-body row">
                        <div class="" style="float: left;"><a type="button" id="liked" onclick="document.getElementById('unliked').style.display = 'block'; document.querySelector('#no').textContent++;document.getElementById('liked').style.display = 'none' " ><i class="fa fa-heart" id="tup" style="color: coral;"></i></a><a type="button" style="display: none;" id="unliked" onclick="document.getElementById('liked').style.display = 'block'; document.getElementById('unliked').style.display = 'none'" ><i class="fa fa-heart" style="color: red"></i></a>
                        </div>
                        <div class="" style="padding-left:10px;"> <Span id="no"> 0 </Span>
                        </div>
                    </div>
                </div>
            `
            html += li
            parent.innerHTML = html  
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


