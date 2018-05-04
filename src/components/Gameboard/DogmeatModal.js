import React from 'react';
import { 
            ModalContainer, 
            ModalContent, 
            ModalBackground, 
            ModalBanner, BannerContent, 
            BannerMessage, 
            CloseModal,
            ModalBody 
        } from './Styled/Modal.styled';

const DogmeatModal = (props) => {
    var modalShown = props.modalShown;

    var modalBannerMessage = "";
    if(props.modalBannerMessage) {
        modalBannerMessage = props.modalBannerMessage
    }

    var modalContent = "";
    if(props.modalContent) {
        modalContent = props.modalContent;
    }


    if (modalShown) {
        return (
            <div>
                <ModalContainer>
                    <ModalContent>
                        <ModalBanner>
                            <BannerContent>
                                <BannerMessage>{modalBannerMessage}</BannerMessage>
                                <CloseModal onClick={props.changeShowModal}>X</CloseModal>
                            </BannerContent>
                        </ModalBanner>
                        <ModalBody>{modalContent}</ModalBody>
                    </ModalContent>
                </ModalContainer>
                <ModalBackground onClick={props.changeShowModal} ></ModalBackground>
            </div>
        );
    }
    else {
        return null;
    }
}

export default DogmeatModal;