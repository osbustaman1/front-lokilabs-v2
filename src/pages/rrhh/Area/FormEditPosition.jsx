import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBold,
    faItalic,
    faAlignLeft,
    faAlignCenter,
    faAlignRight,
    faAlignJustify,
    faListUl,
    faListOl,
} from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from 'react-router-dom';
import { useFech } from '../../../hooks/useFech';

export const FormEditPosition = () => {

    const { id_area, id_department, id_position } = useParams();
    const [namePosition, setNamePosition] = useState("");
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState({});
    const [formKey, setFormKey] = useState(Date.now());
    const navigate = useNavigate();

    // Configuración de Tiptap
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ["heading", "paragraph"], // Aplica alineación a encabezados y párrafos
                alignments: ["left", "center", "right", "justify"], // Valores permitidos
            }),
            Placeholder.configure({
                placeholder: "Describe el cargo aquí...",
            }),
            BulletList,
            OrderedList,
            ListItem,
        ],
        content: "", // Contenido inicial vacío
    });


    const { getDataTable: getDataPosition } = useFech({ url: `get-position/${id_position}` });
    
    const getPosition = async () => {
        const { error, status } = await getDataPosition();
        if (error) {
            $.alert('Error al obtener los datos del usuario');
            return;
        }
        setNamePosition(status.pos_name_position);
        editor.commands.setContent(status.post_description || '');
    };

    const validateFields = () => {
        const newErrors = {};
        if (!namePosition) {
            newErrors.namePosition = "Falta el nombre del cargo.";
        }
        if (!editor?.getText().trim()) {
            newErrors.description = "Ingresa la descripción del cargo.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const sendFormData = async () => {
        if (!validateFields()) {
            return;
        }
        const description = editor.getHTML().trim();

        const { updateDataApi } = useFech({ url: `update-position/${id_position}/` });
        const { error, status } = await updateDataApi({
            pos_name_position: namePosition,
            departament: id_department,
            post_description: description
        });

        if (error) {
            $.alert(status.message);
        } else {
            $.alert('Cargo editado correctamente!');
            return false;
        }
    };

    if (!editor) {
        return null;
    }

    useEffect(() => {
        getPosition();
    }, [id_department, id_position]);

    return (
        <div>
            <div className="row">
                <div className="col-12 mb-3">
                    <label htmlFor="nombreCargo">Nombre del cargo</label>
                    <input
                        id="pos_name_position"
                        type="text"
                        className={`form-control form-control-solid w-100 ${
                            errors.namePosition ? "is-invalid" : ""
                        }`}
                        onChange={(e) => setNamePosition(e.target.value)}
                        value={namePosition}
                    />
                    {errors.namePosition && <div className="text-danger">{errors.namePosition}</div>}
                </div>

                <div className="col-12 mb-3">
                    <label htmlFor="descripcionCargo">Descripción del cargo</label>
                    {/* Barra de herramientas de Tiptap */}
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
                            onClick={() => editor.chain().focus().setTextAlign("left").run()}
                            className={editor.isActive({ textAlign: "left" }) ? "active" : ""}
                        >
                            <FontAwesomeIcon icon={faAlignLeft} /> Izquierda
                        </button>
                        <button
                            onClick={() => editor.chain().focus().setTextAlign("center").run()}
                            className={editor.isActive({ textAlign: "center" }) ? "active" : ""}
                        >
                            <FontAwesomeIcon icon={faAlignCenter} /> Centrar
                        </button>
                        <button
                            onClick={() => editor.chain().focus().setTextAlign("right").run()}
                            className={editor.isActive({ textAlign: "right" }) ? "active" : ""}
                        >
                            <FontAwesomeIcon icon={faAlignRight} /> Derecha
                        </button>
                        <button
                            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                            className={editor.isActive({ textAlign: "justify" }) ? "active" : ""}
                        >
                            <FontAwesomeIcon icon={faAlignJustify} /> Justificar
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={editor.isActive("bulletList") ? "active" : ""}
                        >
                            <FontAwesomeIcon icon={faListUl} /> Lista Desordenada
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={editor.isActive("orderedList") ? "active" : ""}
                        >
                            <FontAwesomeIcon icon={faListOl} /> Lista Ordenada
                        </button>
                    </div>

                    {/* Editor de Tiptap */}
                    <div
                        className={`editor-container ${
                            errors.description ? "is-invalid" : ""
                        }`}
                    >
                        <EditorContent editor={editor} />
                    </div>
                    {errors.description && <div className="text-danger">{errors.description}</div>}
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 mt-3">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => sendFormData()}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}
