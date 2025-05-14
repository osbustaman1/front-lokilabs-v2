
export const Modal = ({ config_modal }) => {
    return (
        <>
            <div className="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true" style={{display: 'none'}}>
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
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
