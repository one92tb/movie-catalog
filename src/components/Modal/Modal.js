import {
  Modal, ModalHeader, ModalFooter, ModalBody, Button,
} from 'reactstrap';
import PropTypes, { shape } from 'prop-types';
import YouTube from 'react-youtube';
import Vimeo from '@u-wave/react-vimeo';
import ReactDOM from 'react-dom';
import './style.css';

const ModalVideo = (props) => {
  const { modalData, onClose } = props;

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  const opts = {
    height: '450px',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    ReactDOM.createPortal(
      <Modal
        className="modal-dialog modal-lg"
        isOpen={modalData.isOpen}
        modalTransition={{ timeout: 200 }}
        backdropTransition={{ timeout: 200 }}
      >
        <ModalHeader>{modalData.title}</ModalHeader>
        <ModalBody>
          {modalData.platform === 'youtube'
            ? <YouTube videoId={modalData.url} opts={opts} onReady={onReady} />
            : <Vimeo video={modalData.url} autoplay responsive />}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" type="submit" aria-label="modal" onClick={onClose}>close</Button>
        </ModalFooter>
      </Modal>,
      document.getElementById('root'),
    )
  );
};

export default ModalVideo;

ModalVideo.defaultProps = {
  modalData: {
    platform: 'youtube',
    title: '',
    url: '',
  },
  isOpen: false,
  onClose: false,
};

ModalVideo.propTypes = {
  modalData: shape({
    title: PropTypes.title,
    url: PropTypes.string,
    plaftorm: PropTypes.string,
  }),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
