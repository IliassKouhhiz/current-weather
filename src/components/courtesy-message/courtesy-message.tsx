import React from 'react';

import { DataFetchStatus } from '../../typings/common';

export interface ICourtesyMessage {
  dataStatus: DataFetchStatus
}

const getMessage = (status: DataFetchStatus) => {
  switch(status) {
    case 'Pending':
      return "Hold on to your hat! We're gathering all the weather info you need";
    case 'Failure':
      return "Oops! Looks like the weather machine took a coffee break. Please try again later.";
    default:
      return "Welcome! Ready to explore the weather?";
  }
}


const CourtesyMessage: React.FC<ICourtesyMessage> = ({dataStatus}) => {

  return (
    <div className="courtesy-message">
      <span className="courtesy-message__message">
        {getMessage(dataStatus)}
      </span>
    </div>
  );
};

export default CourtesyMessage;