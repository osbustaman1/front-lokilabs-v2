export const ModalForm = ({ config_modal }) => {
    const { id_form, def, clean_form } = config_modal;

    return (
        <>
            <div className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-hidden="true" style={{display: 'none'}}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myModalLabel">{ config_modal.title }</h4>
                            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            { config_modal.body }
                        </div>
                        <div className="modal-footer">
                            <button type="button" id="modal_p_..asd__1" className="btn btn-secondary" onClick={clean_form} data-dismiss="modal">Cerrar</button>
                            <button type="button" id="modal_p_..asd__2" className="btn btn-primary" onClick={def}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}