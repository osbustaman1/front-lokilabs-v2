import { InputText } from './InputText';

export const Forms = ({ config_form }) => {

    const { id_form, name_button, def, html_page } = config_form;

    return (
        <>
            <form id={`${id_form}`}>
                <div className="row gx-3 mb-3" id={`div_id_${id_form}`}>
                    <InputText config_input={config_form} />
                </div>
                <div className="row gx-3 mb-3">
                    {html_page}
                </div>
                <button className="btn btn-primary" type="button" onClick={def}>
                    {name_button}
                </button>
            </form>
        </>
    )
}
