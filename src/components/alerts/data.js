let interventions = [{
    title: "Nombre d'interventions",
    data: {
        alertId:"5d820debd1e3096f7dfc9265",
        alertInstanceId:"5d820e7cd1e3096f7dfc9266",
        mappingKey:"interventions-mapping"
    }
}];

let interventionsDetails = [
    {
        title: "Liste des interventions de l'année",
        data: {
            alertId:"5d820debd1e3096f7dfc9265",
            alertInstanceId:"5d820e7cd1e3096f7dfc9266",
            subQueryKey: "sub-interventions",
            mappingKey:"interventions-list-mapping-display"
        }
    }
];

let prescriptionsDetails = [
    {
        title: "Liste des prescriptions de l'année",
        data: {
            alertId:"5d820debd1e3096f7dfc9265",
            alertInstanceId:"5d820e7cd1e3096f7dfc9266",
            subQueryKey: "sub-prescriptions",
            mappingKey:"prescriptions-list-mapping-display"
        }
    }
];

export const getInterventions = () => interventions;
export const getInterventionsList = () => interventionsDetails;
export const getPrescriptionsList = () => prescriptionsDetails;
