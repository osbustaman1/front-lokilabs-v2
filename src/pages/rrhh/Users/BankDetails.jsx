import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { useFech } from "../../../hooks/useFech";
import { useFormValidate } from '../../../hooks/useFormValidate';

export const BankDetails = () => {
    const { id_user } = useParams();

    const [methodPayment] = useState([
        { value: "1", label: "Depósito en cuenta" },
        { value: "2", label: "Cheque" },
        { value: "3", label: "Transferencia" },
        { value: "4", label: "Efectivo" },
    ]);

    const [bankAccountType] = useState([
        { value: 1, label: "Cuenta Vista" },
        { value: 2, label: "Cuenta de Ahorro" },
        { value: 3, label: "Cuenta Bancaria para Estudiante" },
        { value: 4, label: "Cuenta Chequera Electrónica" },
        { value: 5, label: "Cuenta Rut" },
        { value: 6, label: "Cuenta Bancaria para Extranjeros" },
        { value: 7, label: "Cuenta Corriente" },
    ]);

    const [banks, setBanks] = useState([]);
    const [bank, setBank] = useState('');
    const [nameBank, setNameBank] = useState('');
    const [chosenPaymentMethod, setChosenPaymentMethod] = useState("");
    const [nameChosenPaymentMethod, setNameChosenPaymentMethod] = useState("");
    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [accountType, setAccountType] = useState('');
    const [nameAccountType, setNameAccountType] = useState('');

    const { validate } = useFormValidate();

    const { getDataTable: data_employee } = useFech({ url: `employee/by-user/${id_user}/` });
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

    const getUserPaymentData = async () => {
        const { error, status } = await data_employee();
        const { emp_paymentformat, emp_accounttype, emp_bankaccount, bank } = status;

        changePaymentMethod({value: emp_paymentformat.toString(), label: ''});
        setBank(bank || "");
        setAccountType(emp_accounttype || "");
        setBankAccountNumber(emp_bankaccount || "");

    };

    const changePaymentMethod = (selectedOption) => {

        const value = selectedOption?.value || "";
        const label = selectedOption?.label || "";

        setChosenPaymentMethod(value);
        setNameChosenPaymentMethod(label);

        if (value === "4" || value === "2") {
            // Reset React-Select fields and bank account number for "Efectivo" or "Cheque"
            setBank(null);
            setNameBank("");
            setAccountType(null);
            setNameAccountType("");
            setBankAccountNumber("");
        }
    };

    const changeBank = (selectedOption) => {
        if (chosenPaymentMethod !== "4" || chosenPaymentMethod !== "2") {
            setBank(selectedOption?.value || "");
            setNameBank(selectedOption?.label || "");
        }
    };

    const changeAccountType = (selectedOption) => {
        if (chosenPaymentMethod !== "4" || chosenPaymentMethod !== "2") {
            setAccountType(selectedOption?.value || "");
            setNameAccountType(selectedOption?.label || "");
        }
    };

    const sendPaymentDetails = async () => {

        if (!chosenPaymentMethod) {
            $.alert("Seleccione una forma de pago");
            return;
        }

        if (chosenPaymentMethod === "1" || chosenPaymentMethod === "3") {
            if (!bank) {
                $.alert("Seleccione un banco");
                return;
            }
            if (!accountType) {
                $.alert("Seleccione un tipo de cuenta bancaria");
                return;
            }
            if (!bankAccountNumber) {
                $.alert("Ingrese un número de cuenta bancaria");
                return;
            }

        }

        if (chosenPaymentMethod === "2") {
            if (!bank) {
                $.alert("Seleccione un banco");
                return;
            }
        }

        const form_data = {
            emp_paymentformat: chosenPaymentMethod,
            bank: bank || '',
            emp_accounttype: accountType || '',
            emp_bankaccount: bankAccountNumber || '',
        }

        const { updateDataApi } = useFech({ url: `update-method-of-payment/by-user/${id_user}/` });
        const { error, status } = await updateDataApi(form_data);

        if (error) {
            $.alert(status.message);
        } else {
            $.alert("Datos de pago actualizado con éxito");
            return false;
        }
    };

    useEffect(() => {
        getListBanks();
    }, []);

    useEffect(() => {
        getUserPaymentData();
    }, [id_user]);

    return (
        <>
            <form name="form_payment_details" id="form_payment_details" className="vertical">
                <div className="row">
                    <div className="col-2">
                        <label htmlFor="">Forma de pago</label>
                        <Select
                            placeholder={"-- Seleccione --"}
                            options={methodPayment}
                            value={methodPayment.find((option) => option.value === chosenPaymentMethod) || null}
                            onChange={changePaymentMethod}
                        />
                    </div>
                    <div className="col-2">
                        <label htmlFor="">Bancos</label>
                        <Select
                            placeholder={"-- Seleccione --"}
                            options={banks}
                            isDisabled={chosenPaymentMethod === "4"}
                            value={banks.find((option) => option.value === bank) || null}
                            onChange={changeBank}
                        />
                    </div>
                    <div className="col-2">
                        <label htmlFor="">Tipo de cuenta bancaria</label>
                        <Select
                            placeholder={"-- Seleccione --"}
                            options={bankAccountType}
                            isDisabled={chosenPaymentMethod === "4" || chosenPaymentMethod === "2"}
                            value={bankAccountType.find((option) => option.value === accountType) || null}
                            onChange={changeAccountType}
                        />
                    </div>
                    <div className="col-2">
                        <label htmlFor="">N° cuenta bancaria</label>
                        <input
                            type="number"
                            id="id_input"
                            className="form-control"
                            placeholder="00000000000000000"
                            disabled={chosenPaymentMethod === "4" || chosenPaymentMethod === "2"}
                            onChange={(e) => setBankAccountNumber(e.target.value)}
                            value={["4", "2"].includes(chosenPaymentMethod) ? '' : bankAccountNumber}
                        />
                    </div>
                    <div className="col-2">
                        <button 
                            type="button" 
                            className="btn btn-primary btn-sm mt-4"
                            onClick={ (event) => sendPaymentDetails() }>
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};
