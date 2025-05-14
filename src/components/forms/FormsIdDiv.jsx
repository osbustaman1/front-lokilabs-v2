import { InputText } from './InputText';
import { InputTextDynamic } from './InputTextDynamic';

export const FormsIdDiv = ({ config_form }) => {
    const { id_form, name_button, def, html_page, body } = config_form;
    return (
        <>
            <form id={`${id_form}`}>
                <div className="row gx-3 mb-3">
                    {body.map((item, index) => {
                        return (
                            <div className={`col-md-${item.num_rows} ${item.css}`} key={index} id={`div_id_${item.id_div}`}>
                                <InputTextDynamic config_input={item.input} />
                            </div>
                        )
                    })}
                </div>
                {html_page && (
                    <div className="row gx-3 mb-3">
                        {html_page}
                    </div>
                )}

                {name_button && (
                    <button className="btn btn-primary mb-3" type="button" onClick={def}>
                        {name_button}
                    </button>
                )}

            </form>
        </>
    )
}
