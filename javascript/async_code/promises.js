console.log('Start');

function loginUser(email, password){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('now we have the data');
            resolve({email: email})
            reject(new Error('user not logged in'))
        }, 1000);
    })
}

function getUserVideos(email){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['video 1', 'video 2', 'video 3', 'video 4'])
            reject(new Error('cannot get user videos'))
        }, 1000);
    })
    
}

function getVideoDetails(video){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`title of the video is ${video}`)
            reject(new Error(`cannot get the details of video ${video}`))
        }, 1000);
    })
    
}

loginUser('rashid@google.com', 'password')
.then(user => getUserVideos(user.email))
.then(videos => getVideoDetails(videos[0]))
.then(detail => console.log(detail))
.catch(err => console.log(err.message))

console.log('finish');