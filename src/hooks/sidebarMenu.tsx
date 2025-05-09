import { useLocation } from "react-router-dom";

interface menuMiddleware {
    title: string;
    items: Array<{
        nameItems: string;
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
                    subItems: [
                        { path: "/home/listado-empresas", item: "myCompany", subItem: "listCompanies", name: "Mi(s) Empresa(s)" },
                        { path: "/home/listado-cajas-compensasion", item: "myCompany", subItem: "listBoxesCompensation", name: "Cajas de Compensasión" },
                        { path: "/home/listado-mutuales", item: "myCompany", subItem: "listMutualSecurity", name: "Cajas de Compensasión" },
                    ]
                },
                { nameItems: "Mutuales", subItems: [] },
                { nameItems: "Cajas Compensasión", subItems: [] },
            ],
        },
    ];

    return allMenu;
}

export { useSidebarMenu };