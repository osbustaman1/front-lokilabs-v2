import React, { useEffect, useContext, useState, useCallback } from "react";
import { AppContext } from "../../providers/AppProvider";
import { useFech } from "../../hooks/useFech";

const dict_bread_crumb = [
    { bread: "Área" },
    { bread: "Colaboradores" }
];

const dict_title = { tittle: "Mi Equipo" };
const buttons_menu = [];

export const MyApartament = () => {
    const id_user = localStorage.getItem("user");
    const { updateBreadcrumbs, updateTitulo, updateButtons } = useContext(AppContext);

    const [team, setTeam] = useState([]);
    const [boss, setBoss] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { getDataTable: fetchTeam } = useFech({ url: `get-team-by-user/${id_user}/` });

    const getTeamData = useCallback(async () => {
        setLoading(true);
        setError(null);

        const { error, status } = await fetchTeam();

        if (error) {
            setError("Error al cargar los datos del equipo.");
            setLoading(false);
            return;
        }

        if (status && status.length > 0) {
            const bossData = status.find(user => user.uc_type_user === 4); // Suponiendo que el jefe tiene tipo 4
            setBoss(bossData || status[0]);
            setTeam(status.filter(user => user.user_id !== bossData?.user_id));
        }
        setLoading(false);
    }, [fetchTeam]);

    useEffect(() => {
        updateBreadcrumbs(dict_bread_crumb);
        updateTitulo(dict_title.tittle);
        updateButtons(buttons_menu);
        getTeamData();
    }, [id_user]);

    return (

        <div className='container-xl px-4 mt-n10'>
            <div className='row'>

                {loading && <div className="text-center text-primary">Cargando...</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                {!loading && !error && boss && (
                    <div className="row justify-content-center">
                        {/* Tarjeta del Jefe */}
                        <div className="col-md-3 text-center">
                            <div className="card shadow-lg p-3 mb-4">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${boss.user__first_name}+${boss.user__last_name}&background=random`}
                                    alt={boss.user__first_name}
                                    className="rounded-circle mx-auto"
                                    width="60"
                                    height="60"
                                />
                                <h4 className="mt-2">{boss.user__first_name} {boss.user__last_name}</h4>
                                <p className="text-muted">{boss.position__pos_name_position}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tarjetas de los Colaboradores */}
                {!loading && !error && team.length > 0 && (
                    <div className="row justify-content-center">
                        {team.map((member) => (
                            <div className="col-md-3 mb-3" key={member.user_id}>
                                <div className="card text-center shadow-sm p-3">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${member.user__first_name}+${member.user__last_name}&background=random`}
                                        alt={member.user__first_name}
                                        className="rounded-circle mx-auto"
                                        width="60"
                                    height="60"
                                    />
                                    <h5 className="mt-2">{member.user__first_name} {member.user__last_name}</h5>
                                    <p className="text-muted">{member.position__pos_name_position}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
