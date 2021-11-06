const yt = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('getting stuff from youtube servers');
        resolve({videos: [1, 2, 3, 4, 5]})
        reject('youtube declined to give data')
    }, 2000);
})

const fb = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('getting stuff from facebook servers');
        resolve({user: 'Rashid'})
        reject('facebook declined to give data')
    }, 3000);
})

Promise.all([yt, fb]).then(result => console.log(result)).catch(err => console.log(err.message))