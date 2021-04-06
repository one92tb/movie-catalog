import {
  Modal, ModalHeader, ModalFooter, ModalBody, Button,
} from 'reactstrap';
import YouTube from 'react-youtube';
import Vimeo from '@u-wave/react-vimeo';
import PropTypes from 'prop-types';
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
            : <Vimeo video={modalData.url} autoplay heigth="400px" width="300px" responsive />}
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
  modalData: () => [],
  onClose: () => false,
};

ModalVideo.propTypes = {
  modalData: PropTypes.shape({
    title: PropTypes.string,
    isOpen: PropTypes.false,
    url: PropTypes.string,
  }),
  onClose: PropTypes.func,
};
