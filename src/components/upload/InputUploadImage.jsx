import React, { useState, useRef } from 'react';

export const InputUploadImage = ({ title='Logo empresa' }) => {
    const [imageSrc, setImageSrc] = useState("assets/img/illustrations/profiles/profile-1.png");
    const fileInputRef = useRef(null);

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

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setImageSrc(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div className="col-xl-4">
                <div className="card mb-4 mb-xl-0">
                    <div className="card-header">
                        {title}
                    </div>
                    <div className="card-body text-center">
                        <img alt="" className="img-account-profile mb-2"
                            src={imageSrc} />
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
        </>
    );
};