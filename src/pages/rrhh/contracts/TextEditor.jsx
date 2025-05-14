import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAlignLeft,
    faAlignCenter,
    faAlignRight,
    faAlignJustify,
    faBold,
    faItalic,
    faCode,
    faSave,
} from "@fortawesome/free-solid-svg-icons";

import Select from "react-select";
import { useFech } from "../../../hooks/useFech";

import "./TextEditor.css";

export const TextEditor = () => {
    const company = localStorage.getItem("company");

    const [contractName, setContractName] = useState(""); // Estado para el nombre del contrato
    const [showHtml, setShowHtml] = useState(false);
    const [errors, setErrors] = useState({});
    const [typeContract, setTypeContract] = useState("");
    const [contractCode, setContractCode] = useState("")

    // Opciones para los select
    const [listTypeContract] = useState([
        { value: 1, label: "Contrato" },
        { value: 2, label: "Anexo" },
    ]);

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ["heading", "paragraph"], // Aplica alineación a encabezados y párrafos
                alignments: ["left", "center", "right", "justify"], // Valores permitidos
            }),
            Placeholder.configure({
                placeholder: "¡Escribe aquí tu texto!", // Texto del placeholder
            }),
        ],
        content: "<p>¡Elimina este texto para comenzar!</p>", // Contenido inicial como HTML válido
    });

    if (!editor) {
        return null;
    }

    const validateFields = () => {
        const newErrors = {};

        if (!contractName) {
            newErrors.contractName = "Falta el nombre del contrato.";
        }

        if (!typeContract) {
            newErrors.typeContract = "Falta el tipo de documento.";
        }

        if (!contractCode) {
            newErrors.contractCode = "Falta el código del contrato.";
        }

        // Obtener el contenido y eliminar etiquetas HTML
        const content = editor.getText().trim();
        if (!content) {
            newErrors.content = "Falta el contenido.";
        }

        setErrors(newErrors); // Actualiza los errores en el estado.
        return Object.keys(newErrors).length === 0; // Retorna si no hay errores.
    };

    const handleSave = async () => {
        if (!validateFields()) {
            console.log("Errores de validación:", errors);
            return;
        }

        // Obtener el contenido y eliminar etiquetas HTML
        const content = editor.getHTML().trim();

        const { postDataApi } = useFech({ url: `contract-type/${company}/` });
        const { error, status } = await postDataApi({
            ct_contractname: contractName,
            company: company,
            ct_contract: content,
            ct_typecontract: typeContract,
            ct_contractcode: contractCode
        });

        if (error) {
            $.alert(status.message);
        } else {
            $.alert("Contrato agregado con éxito.");
        }
    };

    return (
        <div className="col-8 mb-4">
            <div className="card h-100">
                <div className="card-body justify-content-center flex-column">
                    <div className="align-items-center justify-content-between">
                        <div className="me-3">
                            <h5>Editor de contrato</h5>
                            <div className="text-muted small row">
                                <div className="container">
                                    {/* Input para el Nombre del Contrato */}
                                    <div className="row mb-3">

                                        <div className="col-4 mb-3">
                                            <input
                                                type="text"
                                                id="contractName"
                                                className={`form-control form-control-solid w-100 ${
                                                    errors.contractName ? "is-invalid" : ""
                                                }`}
                                                value={contractName}
                                                onChange={(e) => setContractName(e.target.value)}
                                                placeholder="Escribe el nombre del contrato"
                                            />
                                            {errors.contractName && (
                                                <div className="text-danger">{errors.contractName}</div>
                                            )}
                                        </div>

                                        <div className="col-4 mb-3">
                                            <input
                                                type="text"
                                                id="contractCode"
                                                className={`form-control form-control-solid w-100 ${
                                                    errors.contractCode ? "is-invalid" : ""
                                                }`}
                                                value={contractCode}
                                                onChange={(e) => setContractCode(e.target.value)}
                                                placeholder="Agrega un código contrato"
                                            />
                                            {errors.contractCode && (
                                                <div className="text-danger">{errors.contractCode}</div>
                                            )}
                                        </div>

                                        <div className="col-4 mb-3">
                                            <Select
                                                placeholder={"Tipo de documento"}
                                                options={listTypeContract}
                                                onChange={(option) => setTypeContract(option?.value || "")}
                                                value={
                                                    listTypeContract.find(
                                                        (option) => option.value === typeContract
                                                    ) || null
                                                }
                                            />
                                            {errors.typeContract && (
                                                <div className="text-danger">{errors.typeContract}</div>
                                            )}
                                        </div>
                                    </div>

                                    <h4>Editor de Texto</h4>

                                    {/* Barra de Herramientas Sticky */}
                                    <div className="toolbar sticky-toolbar">
                                        <button
                                            onClick={() => editor.chain().focus().toggleBold().run()}
                                            className={editor.isActive("bold") ? "active" : ""}
                                        >
                                            <FontAwesomeIcon icon={faBold} /> Negrita
                                        </button>

                                        <button
                                            onClick={() => editor.chain().focus().toggleItalic().run()}
                                            className={editor.isActive("italic") ? "active" : ""}
                                        >
                                            <FontAwesomeIcon icon={faItalic} /> Cursiva
                                        </button>

                                        <button
                                            onClick={() =>
                                                editor.chain().focus().setTextAlign("left").run()
                                            }
                                            className={
                                                editor.isActive({ textAlign: "left" }) ? "active" : ""
                                            }
                                        >
                                            <FontAwesomeIcon icon={faAlignLeft} /> Izquierda
                                        </button>

                                        <button
                                            onClick={() =>
                                                editor.chain().focus().setTextAlign("center").run()
                                            }
                                            className={
                                                editor.isActive({ textAlign: "center" })
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <FontAwesomeIcon icon={faAlignCenter} /> Centrar
                                        </button>

                                        <button
                                            onClick={() =>
                                                editor.chain().focus().setTextAlign("right").run()
                                            }
                                            className={
                                                editor.isActive({ textAlign: "right" }) ? "active" : ""
                                            }
                                        >
                                            <FontAwesomeIcon icon={faAlignRight} /> Derecha
                                        </button>

                                        <button
                                            onClick={() =>
                                                editor.chain().focus().setTextAlign("justify").run()
                                            }
                                            className={
                                                editor.isActive({ textAlign: "justify" })
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <FontAwesomeIcon icon={faAlignJustify} /> Justificar
                                        </button>

                                        <button onClick={() => setShowHtml(!showHtml)}>
                                            <FontAwesomeIcon icon={faCode} />{" "}
                                            {showHtml ? "Ocultar HTML" : "Mostrar HTML"}
                                        </button>

                                        {/* Botón Guardar */}
                                        <button onClick={handleSave}>
                                            <FontAwesomeIcon icon={faSave} /> Guardar
                                        </button>
                                    </div>

                                    {/* Contenedor del Editor */}
                                    <div className="editor-container">
                                        <EditorContent editor={editor} />
                                    </div>

                                    {errors.content && (
                                        <div className="text-danger">{errors.content}</div>
                                    )}

                                    {/* Vista HTML */}
                                    {showHtml && (
                                        <div className="html-preview mt-3">
                                            <h5>HTML Generado:</h5>
                                            <pre className="border p-3">{editor.getHTML()}</pre>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
