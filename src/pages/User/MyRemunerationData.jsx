import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { useFech } from "../../hooks/useFech";

export const MyRemunerationData = ({ data }) => {

    const [paymentMethod, setPaymentMethod] = useState('');
    const [bankAccountType, setBankAccountType] = useState('');
    const [bankaccount, setBankaccount] = useState('');
    const [bank, setBank] = useState('');
    const [banks, setBanks] = useState([]);

    const [listPaymentMethodOptions] = useState([
        { value: 1, label: "Depósito en cuenta" },
        { value: 2, label: "Cheque" },
        { value: 3, label: "Transferencia" },
        { value: 4, label: "Efectivo" },
    ]);

    const [listBankAccountType] = useState([
        { value: 1, label: "Cuenta Vista" },
        { value: 2, label: "Cuenta de Ahorro" },
        { value: 3, label: "Cuenta Bancaria para Estudiante" },
        { value: 4, label: "Cuenta Chequera Electrónica" },
        { value: 5, label: "Cuenta Rut" },
        { value: 6, label: "Cuenta Bancaria para Extranjeros" },
        { value: 7, label: "Cuenta Corriente" },
    ]);

    const { getDataTable: list_banks } = useFech({ url: "list-banks" });

    const getListBanks = async () => {
        try {
            const { status = [] } = await list_banks();
            const list_data = status.map((value) => ({
                value: value.ban_id,
                label: value.ban_name,
            }));
            setBanks(list_data);
        } catch (error) {
            console.error("Error fetching banks:", error);
            setBanks([]);
        }
    };

    useEffect(() => {
        getListBanks();
    }, []);

    useEffect(() => {
        setPaymentMethod(data.paymentformat);
        setBankAccountType(data.accounttype);
        setBank(data.bank);
        setBankaccount(data.bankaccount);
    }, [data]);

    return (
        <>
            <div className="col-4 mb-4">

                <div className="card h-100">
                    <div className="card-body d-flex justify-content-center">
                        <div className="align-items-center justify-content-between">
                            
                            <div className="me-3">
                                <i className="fa-solid fa-circle-dollar-to-slot"></i>
                                <h5>
                                    Mis datos para remuneración
                                </h5>
                                <div className="text-muted small row">
                                    
                                    <div className="col-12">
                                        <label>Forma de pago</label>
                                        <Select
                                            placeholder={'Seleccione'}
                                            options={listPaymentMethodOptions}
                                            isDisabled
                                            value={listPaymentMethodOptions.find((option) => option.value === paymentMethod) || null}
                                            />
                                    </div>
                                    <div className="col-12 mt-3">
                                        <label>Banco</label>
                                        <Select
                                            placeholder={'Seleccione'}
                                            options={banks}
                                            isDisabled
                                            value={banks.find((option) => option.value === bank) || null}
                                            />
                                    </div>
                                    <div className="col-12 mt-3">
                                        <label>Tipo de cuenta</label>
                                        <Select 
                                            placeholder={'Seleccione'}
                                            options={listBankAccountType}
                                            isDisabled
                                            value={listBankAccountType.find((option) => option.value === bankAccountType) || null}
                                            />
                                    </div>
                                    <div className="col-12 mt-3">
                                        <label>N° cuenta bancaria</label>
                                        <input 
                                            className="form-control form-control-solid w-100" 
                                            type="text"
                                            disabled
                                            value={bankaccount || ''}
                                            />
                                    </div>
                                    
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>            
        </>
    )
}
