import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFech } from '../../hooks/useFech';

export const InputUploadImageCollaborator = ({ title='Logo empresa' }) => {
    const { id_user } = useParams();
    const { getDataTable } = useFech({ url: `employee/by-user/${id_user}/` });
    
    const [dataUser, setDataUser] = useState(null);
    const [imageSrc, setImageSrc] = useState('');
    const fileInputRef = useRef(null);

    const get_data_response = async () => {
        const { status } = await getDataTable();
        setDataUser(status);
        setImageSrc(status.emp_perfil_image); // Actualizamos imageSrc cuando se obtienen los datos
    };

    const send_image = async (form_data) => {
        const { postDataApi } = useFech({ url: `upload-file/` });
        const { error, status } = await postDataApi(form_data);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validImageTypes = ['image/jpeg', 'image/png'];
            if (!validImageTypes.includes(file.type)) {
                $.alert("Tipo de archivo invalido. Solo se aceptan imagenes en formato JPG o PNG.");
                return;
            }

            const fileName = file.name;
            const fileExtension = fileName.split('.').pop().toLowerCase();

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                const form_data = {
                    file_base64: base64String,
                    user_id: id_user,
                    extension: fileExtension
                };

                send_image(form_data);
                setImageSrc(base64String); // Actualizamos imageSrc con la nueva imagen subida
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        get_data_response();
    }, [id_user]);

    return (
        <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
                <div className="card-header">
                    {title}
                </div>
                <div className="card-body text-center">
                    <img 
                        alt="" 
                        className="img-account-profile mb-2"
                        src={imageSrc || 'https://lokilabs.s3.amazonaws.com/219983.png'}
                        style={{
                            width: '150px',      // Ancho fijo de 300px
                            height: '150px',     // Alto fijo de 300px
                            objectFit: 'cover',  // Mantiene el contenido de la imagen cubriendo el área
                            borderRadius: '50%', // Hace que la imagen sea redonda
                            marginTop: '20px',    // Añade un margen superior para bajar la imagen
                            border: '3px solid #ccc' // Añade un borde a la imagen
                        }} 
                    />

                    <div className="small font-italic text-muted mb-4">
                        JPG o PNG 300x300px
                    </div>
                    <button className="btn btn-primary" type="button" onClick={handleButtonClick}>
                        Subir imagen
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg"
                    />
                </div>
            </div>
        </div>
    );
};
