// Definimos tipos para las variables de entorno (mejor práctica)
interface ImportMetaEnv {
    VITE_TYPE_HTTP: string;
    VITE_API_HOST: string;
}

// Función con tipos explícitos
export const url_customer = (): string => { // <-- Indicamos que retorna string
    // 1. Obtenemos el hostname (TS sabe que location.hostname es string)
    const fullHostName: string = window.location.hostname;

    // 2. Dividimos el hostname en partes
    const hostNameParts: string[] = fullHostName.split(".");

    // 3. Extraemos el subdominio (puede ser string o null)
    const subdomain: string | null = hostNameParts.length >= 2 ? hostNameParts[0] : null;

     // 4. Validación importante (nueva mejora)
    if (!subdomain) {
        throw new Error("Subdomain not found");
    }

     // 5. Usamos variables de entorno con tipos seguros
    const protocol: string = import.meta.env.VITE_TYPE_HTTP;
    const apiHost: string = import.meta.env.VITE_API_HOST;

    // 6. Construimos la URL final
    const host_url: string = `${protocol}//${subdomain}.${apiHost}`;

    // 7. Retornamos la URL
    return host_url;
};