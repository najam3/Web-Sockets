

const videoElem = document.querySelector('video');
const btn = document.querySelector('button');

const constraints = {
    video: true,
    audio: true
}


const getTracks = async (arg, localPeerConnection) => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(arg);
        const tracks = stream.getTracks();
        videoElem.srcObject = stream
         tracks.forEach(track => {
             localPeerConnection.addTrack(track, stream);
         });
    } catch (error) {
        console.error(error);
        return null;
    }
};





let configuration = {
    iceServers: [
        {urls: 'stun:stun.wifirst.net:3478'}
    ]
}

const localPeerConnection = new RTCPeerConnection(configuration);
getTracks(constraints, localPeerConnection)

// we need to create an SDP offer or answer

    const call =  async (peer) => {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        // Now we need Signalling to send the offer to another peer
        const sdpOffer = localPeerConnection.localDescription.sdp;
        
    }

call(localPeerConnection)






