import React, {  useEffect, useContext } from 'react';

import StatusContext from '../../contexts/StatusContext';
import { ConnectionStatus } from '../../types';
import { useToast } from '../ui/use-toast';

const StatusText: Record<ConnectionStatus, string> = {
  [ConnectionStatus.Connected]: "Connected",
  [ConnectionStatus.Disconnected]: "Disconnected",
  [ConnectionStatus.Reconnecting]: "Reconnecting"
}

const Status: React.FunctionComponent = ({}) => {

  // const timeout = useRef<ReturnType<typeof setTimeout> | undefined>();
  const status = useContext(StatusContext);
  // const [showModal, setShowModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // if (timeout.current) clearTimeout(timeout.current);
    // setShowModal(true);
    // if (status !== ConnectionStatus.Reconnecting) {
    //   setTimeout(() => {
    //     setShowModal(false);
    //     timeout.current = undefined;
    //   }, 3000);
    // }
    toast({
      description: StatusText[status]
    });
  }, [status, toast]);

  return (
    <></>
  )

};

export default Status;
