import React, { MouseEventHandler } from 'react';
import {
  Modal, ModalHeader, ModalFooter, ModalBody, Button,
} from 'reactstrap';
import YouTube, {
  YouTubeProps,
  Options as YouTubeOptions,
} from 'react-youtube';
import Vimeo from '@u-wave/react-vimeo';
import ReactDOM from 'react-dom';
import './style.css';
import { ModalData } from '../../interfaces/modalData';

interface Props {
  onClose: MouseEventHandler<HTMLButtonElement>;
  modalData: ModalData;
}

const youTubeOptions: YouTubeOptions = {
  height: '450px',
  width: '100%',
  playerVars: {
    autoplay: 1,
  },
};

const ModalInnerVideo: React.FC<Props> = (props) => {
  const { modalData, onClose } = props;
  const onReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  };

  return (
    <Modal
      data-testid="modal"
      className="modal-dialog modal-lg"
      isOpen={modalData.isOpen}
      modalTransition={{ timeout: 200 }}
      backdropTransition={{ timeout: 200 }}
    >
      <ModalHeader>{modalData.title}</ModalHeader>
      <ModalBody>
        {modalData.platform === 'youtube' ? (
          <YouTube
            videoId={modalData.url}
            opts={youTubeOptions}
            onReady={onReady}
          />
        ) : (
          <Vimeo video={modalData.url} autoplay width="300px" responsive />
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          type="submit"
          aria-label="modal"
          onClick={onClose}
        >
          close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const ModalVideo = (props: Props) => ReactDOM.createPortal(
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ModalInnerVideo {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  document.getElementById('root')!,
);

export default ModalVideo;
