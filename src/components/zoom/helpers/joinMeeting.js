import { ZoomMtg } from '@zoomus/websdk';

export const joinMeeting = (config, callback) => {
  ZoomMtg.init({
    leaveUrl: 'https://zoom.us/',
    isSupportAV: true,
    success() {
      ZoomMtg.join({
        signature: config.signature,
        meetingNumber: config.meetingNumber,
        userName: config.userName,
        apiKey: config.apiKey,
        passWord: config.passWord,

        success: () => {
          callback(true); // start timer when we joined to meeting
        },

        error: (error) => {
          console.log(error);
        },
      });
    },
  });
};
