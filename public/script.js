const socket = io.connect('/');
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

const peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '5000'
});

let myVideoStream;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
    socket.on('user-connected', (userId) => {
        connectNewUser(userId, stream);
    });
    peer.on('call', call => {
        call.answer(stream);
        const video = document.createElement('video');
        video.setAttribute("id", peer._id);
        video.muted = true;
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream);
        });
    })
});

peer.on('open', id => {
    console.log(id, 'peerId:');
    socket.emit('join-room', roomId, id);
});

const connectNewUser = (userId, stream) => {
    console.log('new user....!');
    const call = peer.call(userId, stream);
    const video = document.createElement('video');
    video.setAttribute("id", userId);
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream);
    });
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    videoGrid.append(video);
}
