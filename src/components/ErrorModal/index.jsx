import React from 'react';
import Modal from '../Modal';
import CustomButton from '../CustomButton';

const ErrorModal = props => {
    return (
        <Modal
            onCancel={props.onClear}
            header="An Error Occurred!"
            show={!!props.error}
            footerContent={
                <CustomButton onClick={props.onClear}>OK</CustomButton>
            }
        >
            <p style={{
                color: 'red'
            }}>{props.error}</p>
        </Modal>
    );
}

export default ErrorModal;