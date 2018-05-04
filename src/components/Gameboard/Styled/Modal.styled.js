import styled from 'styled-components';

const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 400px;
    max-height: 100%;
    max-width: 100%;
    border: 1px solid black;
    z-index: 1000;
    background-color: white;
`
const ModalContent = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
`
const ModalBackground = styled.div`
    z-index: 900;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(225,225,225,0.7);
    &:hover {
        cursor: pointer;
    }
`
const ModalBanner = styled.div`
    width: 100%;
    height: 50px;
    max-height: 20%;
    box-shadow: 2px 2px gray;
    background-color: red;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const BannerContent = styled.div`
    display: flex;
    justify-content: space-between;
`
const BannerMessage = styled.span`
    padding-left: 20px;
`
const CloseModal = styled.span`
    float: right;
    padding-right: 20px;
    &:hover {
        cursor: pointer;
    }
`
const ModalBody = styled.div`
    margin: 20px;
`

export {
    ModalContainer,
    ModalContent,
    ModalBackground,
    ModalBanner,
    BannerContent,
    BannerMessage,
    CloseModal,
    ModalBody
}