import React, { useState, useEffect } from 'react';

import './styles.css';

interface OwnProps {
    show: boolean,
    message: string,
    titulo: string,
    onClose(value: boolean): void;
}

const Modal: React.FC<OwnProps> = (props) => {

    const [show, setShow] = useState();

    useEffect(() => {
        setShow(props.show);
    }, [props.show])

    const onClose = () => {
        /* let element = document.getElementById('modal');
        element?.classList.toggle('modal-off'); */
        props.onClose(false);
    }

    if (!show) {
        return null;
    } else {
        return (
            <div className="modal" id="modal">
                <h2>{props.titulo}</h2>
                <div className="content">
                    <p>{props.message}</p>
                </div>
                <div className="actions">
                    <button className="toggle-button" onClick={onClose}>
                        Fechar
          </button>
                </div>
            </div>
        );
    }
}

export default Modal;