import React, { useEffect } from 'react';

export const ModalStatic = ({ body_modal, onClose }) => {
    useEffect(() => {
        const modalElement = document.getElementById("staticBackdrop");

        if (modalElement) {
            modalElement.addEventListener("hidden.bs.modal", () => {
                if (onClose) {
                    onClose(); // Llamar la función cuando la modal se cierra
                }
            });
        }

        return () => {
            if (modalElement) {
                modalElement.removeEventListener("hidden.bs.modal", () => {
                    if (onClose) {
                        onClose();
                    }
                });
            }
        };
    }, [onClose]);

    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">{ body_modal.title }</h5>
                        <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        { body_modal.body }
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-bs-dismiss="modal">Cerrar</button>
                        { body_modal.footer }
                    </div>
                </div>
            </div>
        </div>
    );
};
