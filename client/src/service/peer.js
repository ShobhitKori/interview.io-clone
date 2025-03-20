// class PeerService {
//   constructor() {
//     if (!this.peer) {
//       this.peer = new RTCPeerConnection({
//         iceServers: [
//           {
//             urls: [
//               "stun:stun.l.google.com:19302",
//               "stun:global.stun.twilio.com:3478",
//             ],
//           },
//         ],
//       });
//     }
//   }

import { parse } from "postcss";
import { json } from "react-router-dom";

//   async getOffer() {
//     if (this.peer) {
//       const offer = await this.peer.createOffer();
//       await this.peer.setLocalDescription(new RTCSessionDescription(offer));
//       return offer;
//     }
//   }

//   async getAnswer(offer) {
//     if (this.peer) {
//       if (!offer) {
//         console.error("Offer is undefined or null");
//         return;
//       }

//       await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
//       const ans = await this.peer.createAnswer();
//       await this.peer.setLocalDescription(ans);
//       return ans;
//     }
//   }


//   async setLocalDescription(ans) {
//     if (this.peer) {
//       await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
//     }
//   }
// }

// export default new PeerService();


class PeerService {
  constructor() {
    if (!this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      });
    }
  }

  async getAnswer(offer) {
    if (this.peer) {
      try {
        console.log("Offer: ", offer.sdp)
        await this.peer.setRemoteDescription(new RTCSessionDescription({
          type: offer.type,
          sdp: offer.sdp,
        }));
        const ans = await this.peer.createAnswer();
        console.log("ANS: ",ans)
        await this.peer.setLocalDescription(new RTCSessionDescription(ans));
        return ans;
      } catch (error) {
        console.error("Error in getAnswer:", error);
        return null; // or throw error
      }
    }
  }

  async setLocalDescription(ans) {
    if (this.peer) {
      const parsedAns = JSON.parse(ans)
      console.log("Parsed Answer", parsedAns)
      console.log("Answer: ", ans)
      const doubleParsedAnswer = JSON.parse(parsedAns)
      await this.peer.setRemoteDescription(new RTCSessionDescription({
          type: doubleParsedAnswer.type,
          sdp: doubleParsedAnswer.sdp,
      }));
    }
  }

  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    } else {
      console.error("Peer connection not initialized.");
    }
  }
}

export default new PeerService();