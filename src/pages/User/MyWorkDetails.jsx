import React, { useEffect, useContext, useState } from 'react';

export const MyWorkDetails = ({ data }) => {

    const [contractCode, setContractCode] = useState('');
    const [hiringDate, setHiringDate] = useState('');
    const [workingState, setWorkingState] = useState('');
    const [nameCompany, setNameCompany] = useState('');
    const [typeWorkingDay, setTypeWorkingDay] = useState('');
    const [fullNameBoss, setFullNameBoss] = useState('');
    const [typeWorkingMode, setTypeWorkingMode] = useState('');
    const [subsidiaryName, setSubsidiaryName] = useState('');
    const [departamentName, setDepartamentName] = useState('');
    const [positionName, setPositionName] = useState('');

    // Manejo de los datos recibidos
    useEffect(() => {
        setContractCode(data?.contractcode || '');
        setHiringDate(data?.hiring_date || '');
        setWorkingState(data?.working_state || '');
        setNameCompany(data?.name_company || '');
        setTypeWorkingDay(data?.type_working_day || '');
        setFullNameBoss(data?.full_name_boss || '');
        setTypeWorkingMode(data?.type_working_mode || '');
        setSubsidiaryName(data?.subsidiary_name || '');
        setDepartamentName(data?.departament_name || '');
        setPositionName(data?.position_name || '');
    }, [data]);

    return (
        <>
            <div className="col-4 mb-4">
                <div className="card h-100">
                    <div className="card-body justify-content-center flex-column">
                        <div className="align-items-center justify-content-between">
                            <div className="me-3">
                                <i className="fa-solid fa-address-card"></i>
                                <h5>Mi contrato</h5>
                                <div className="text-muted small row">
                                    <div className="col-6 mt-3">
                                        <label>Contrato</label>
                                        <input 
                                            type="text" 
                                            className='form-control form-control-solid w-100'
                                            value={contractCode || ''}
                                            disabled
                                            />
                                    </div>
                                    <div className="col-6 mt-3">
                                        <label>Fecha inicio</label>
                                        <input 
                                            type="date" 
                                            className='form-control form-control-solid w-100'
                                            value={hiringDate || ''}
                                            disabled
                                            />
                                    </div>
                                </div>
                                <div className="text-muted small row">
                                    <div className="col-12 mt-3">
                                        <label>Estado del contrato</label>
                                        <input 
                                            type="text" 
                                            className='form-control form-control-solid w-100'
                                            value={workingState || ''}
                                            disabled
                                            />
                                    </div>
                                </div>
                                <div className="text-muted small row">
                                    <div className="col-12 mt-3">
                                        <label>Empresa</label>
                                        <input 
                                            type="text" 
                                            className='form-control form-control-solid w-100'
                                            value={nameCompany || ''}
                                            disabled
                                            />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="col-4 mb-4">
                <div className="card">
                    <div className="card-body justify-content-center flex-column">
                        <div className="align-items-center justify-content-between">
                            <div className="me-3">
                                <i className="fa-regular fa-clock"></i> Tipo de jornada:
                                <div> <strong>{typeWorkingDay || '--'}</strong></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mt-4">
                    <div className="card-body justify-content-center flex-column">
                        <div className="align-items-center justify-content-between">
                            <div className="me-3">
                                <i className="fa-solid fa-user-tie"></i> Jefatura:
                                <div><strong>{fullNameBoss || '--'}</strong></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mt-4">
                    <div className="card-body justify-content-center flex-column">
                        <div className="align-items-center justify-content-between">
                            <div className="me-3">
                                <i className="fa-regular fa-calendar"></i> Modalidad:
                                <div><strong>{typeWorkingMode || '--'}</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="col-4 mb-4">
                <div className="card">
                    <div className="card-body justify-content-center flex-column">
                        <div className="align-items-center justify-content-between">
                            <div className="me-3">
                                <i className="fa-solid fa-house"></i> Sucursal:
                                    <div><strong>{subsidiaryName || '--'}</strong></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mt-4">
                    <div className="card-body justify-content-center flex-column">
                        <div className="align-items-center justify-content-between">
                            <div className="me-3">
                                <i className="fa-regular fa-building"></i>  Departamento:
                                <div><strong>{departamentName || '--'}</strong></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mt-4">
                    <div className="card-body justify-content-center flex-column">
                        <div className="align-items-center justify-content-between">
                            <div className="me-3">
                                <i className="fa-solid fa-clipboard-user"></i> Cargo:
                                <div><strong>{positionName || '--'}</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
