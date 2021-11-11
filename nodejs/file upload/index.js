
const router = require('express').Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const fs = require('fs');
const path = require('path')


router.post('/user/add-service', upload.fields([
    { name: 'avatar', maxCount: 1 }, 
    { name: 'galleryImg1', maxCount: 1 }, 
    { name: 'galleryImg2', maxCount: 1 }, 
    { name: 'galleryImg3', maxCount: 1 }
]), async (req, res) => {
    if(!req.isAuthenticated()){
        // change these redirects if used like api
        req.flash('flash', 'You are not authenticated to add service, signup (create account) or login first!');
        return res.redirect('/');
    }
    else{
        const gallery = [req.files.galleryImg1[0], req.files.galleryImg2[0], req.files.galleryImg3[0]]
        const avatar = req.files.avatar[0]

        let galleryUrls = [];
        let avatarUrl;
        try{
            for(let i=0; i<3; i++){
                // this function is not included here, check resize-upload.js
                let abc = await uploadFiles(gallery[i], 700)
                galleryUrls.push(abc.secure_url)
            }
            avatarUrl = await uploadFiles(avatar, 600);

            // save the data to the database here
            // [TODO]

            // unlink the uploaded files from the file system after saving in the remote database
            for(let i=0; i<3; i++){
                fs.unlink(path.resolve(__dirname, `../uploads/resized/${gallery[i].filename}`), (err) => { if(err) console.log(err) });
                fs.unlink(path.resolve(__dirname, `../uploads/${gallery[i].filename}`), (err) => { if(err) console.log(err) });
            }
            fs.unlink(path.resolve(__dirname, `../uploads/resized/${avatar.filename}`), (err) => { if(err) console.log(err) });
            fs.unlink(path.resolve(__dirname, `../uploads/${avatar.filename}`), (err) => { if(err) console.log(err) });

            // change these redirects if used like api
            req.flash('success', 'Your service has been successfully registered in tax TDS');
            res.redirect('/user');
        }
        catch(err){
            console.log(err)
            // change these redirects if used like api
            req.flash('failure', 'There was an error in registering your service, try again');
            res.redirect('back')
        }
    }
})