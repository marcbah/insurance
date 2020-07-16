let spendingPieCharts = [{
    title: "Dépenses sur la période globale",
    data:{
        reportId:"5d7a46bad1e3093327cad42c",
        reportInstanceId:"5d78f1c1d1e309e294ea5786",
        mappingKey:"pie-data"
    }
}];

let monthlySpending = [{
    title: "Dépenses par mois",
    data:{
        reportId:"5d78f13ed1e309e294ea5785",
        reportInstanceId:"5d7a3818d1e3092020223afe",
        subQueryKey: "monthly-data-query",
        mappingKey:"monthly-data-display"
    },
    documentURI: "9ebdb2f0-92a7-4e92-88f3-e6c175c1b388"
}];

export const getSpendingPieCharts = () => spendingPieCharts;
export const getMonthlySpending = () => monthlySpending;
