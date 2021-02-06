import firebase from 'firebase/app';
import 'firebase/storage';
import {
   upload
} from './upload';

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyBAIpsTa_srx6EwiVPkOu9SZ_Gof86B4z8",
   authDomain: "fe-upload-img-478d0.firebaseapp.com",
   projectId: "fe-upload-img-478d0",
   storageBucket: "fe-upload-img-478d0.appspot.com",
   messagingSenderId: "614232157757",
   appId: "1:614232157757:web:099a95d0eb3350bf644454"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

upload('#file', {
   multi: true,
   accept: ['.png', '.jpeg', 'jpg', '.svg', '.gif'],
   onUpload(files, blocks) {
      files.forEach((file, index) => {
         const ref = storage.ref(`images/${file.name}`);
         const task = ref.put(file);

         task.on('state_changed', snapshot => {
            const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
            const block = blocks[index].querySelector('.preview-info-progress');

            block.textContent = `${percentage}%`;
            block.style.width = `${percentage}%`;
         }, error => {
            console.log(error);
         }, () => {
            const block = blocks[index].querySelector('.preview-info-progress');
            block.textContent = 'Completed!';

            task.snapshot.ref.getDownloadURL()
               .then(url => {
                  console.log(`Download URL: ${url}`);
               });
         });
      });
   }
});