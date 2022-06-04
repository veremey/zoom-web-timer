import React, { useEffect, useState } from 'react';
import { ZoomMtg } from '@zoomus/websdk';
import Timer from '../timer/timer';
import { joinMeeting } from './helpers/joinMeeting';
import { zoomConfig } from './constants/index';

import styles from './zoom.module.css';

const Zoom = () => {
  const [showTimer, setShowTimer] = useState(false)
  const meetConfig = Object.assign({}, zoomConfig)

  useEffect(() => {
    meetConfig.meetingNumber =  prompt('Enter meeting number to connect', 87331968925)
    meetConfig.passWord =  prompt('Enter meeting password to connect', '1ewRd2')
    
    ZoomMtg.setZoomJSLib("https://source.zoom.us/2.4.0/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();
    
    ZoomMtg.generateSignature({
      meetingNumber: meetConfig.meetingNumber,
      apiKey: meetConfig.apiKey,
      apiSecret: meetConfig.apiSecret,
      role: meetConfig.role,
      success: function (res) {
        meetConfig.signature = res.result

        joinMeeting(meetConfig, setShowTimer);
      },

      error: function (error) {
        setShowTimer(false) 
      }
    });

    return () => setShowTimer(false) 

  }, [meetConfig]);

  return (
    <div className={styles.zoom}>
      {showTimer && <Timer />}
    </div>
  )
}

export default Zoom;
