import { useLocation } from "react-router-dom";

interface menuMiddleware {
    title: string;
    items: Array<{
        nameItems: string;
        icon: string;
        subItems: Array<{
            path: string;
            item: string;
            subItem: string;
            name: string;
        }>
    }>
}

interface UserId {
    id: number; // Identificador único del usuario
}

//https://preview.keenthemes.com/html/metronic/docs/icons/keenicons

const useSidebarMenu = ({ user_id }: { user_id: UserId }) => {
    const location = useLocation();
    const pathname = location.pathname;
    const path = pathname.split("/").slice(1);

    const allMenu: menuMiddleware[] = [
        { 
            title: "Configuración",
            items: [
                { 
                    nameItems: "Empresa",
                    icon: "ki-duotone ki-setting-2 ki-abstract-14 fs-2 fs-md-1",
                    subItems: [
                        { path: "/home/listado-empresas", item: "myCompany", subItem: "listCompanies", name: "Mi(s) Empresa(s)" },
                        { path: "/home/listado-cajas-compensasion", item: "myCompany", subItem: "listBoxesCompensation", name: "Cajas de Compensasión" },
                        { path: "/home/listado-mutuales", item: "myCompany", subItem: "listMutualSecurity", name: "Cajas de Compensasión" },
                    ]
                },
                { 
                    nameItems: "Mutuales",
                    icon: "ki-duotone ki-book-square ki-abstract-14 fs-2 fs-md-1",
                    subItems: [] 
                },
                { 
                    nameItems: "Cajas Compensasión", 
                    icon: "ki-duotone ki-book-square ki-abstract-14 fs-2 fs-md-1",
                    subItems: [] 
                },
            ],
        },
    ];

    return allMenu;
}

export { useSidebarMenu };