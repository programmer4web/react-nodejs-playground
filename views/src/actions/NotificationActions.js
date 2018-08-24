import {NOTIFICATION_READED} from './action-types.js';

export const notificationReaded = id => ({
  type: NOTIFICATION_READED,
  payload: id
}); 
