import {gql} from "apollo-boost";


export const CONTRACTS_GRAPHQL_QUERY = gql` {
    contract {
        absenceWaitingResponse,
        actAccessoriesCost,
        additionalPrimePerChild,
        ageLimit,
        careNetworkId,
        childLimitAge,
        childPrimeList {
            contractId
            from
            id
            prime
            to
          }
       }
        contractSpecificInterventionGroupCapList {
            actInterventionCap
            categoryId
            contractId
            id
            name
            numberActPerson
            priorAgreement
            reimbursementRate
            waitingPeriod
            yearInterventionCap
          }
        deductionFamilyGroup,
        deleted,
        description,
        drugCap,
        endTime,
        examCap,
        id,
        interventionCap,
        moreChildCost,
        moreChildCostDeduction,
        name,
        notReimbursedDrugList {
            id
            name
            recommendedPrice
          }
        notReimbursedExamList {
            id
            name
            recommendedPrice
          }
        notReimbursedInterventionList {
            affectation_code
            category
            id
            name
            recommendedPrice
            recommended_price
          }
        numberOfPeopleSupported,
        percentage,
        personAccessoriesCost,
        pharmacyHospitalizationCap,
        pharmacyNetworkId,
        pseudo,
        reInsuranceId,
        reInsuranceRate,
        reimbursementRate,
        specificDrugCapList {
            cap
            contractId
            drugId
            id
          }
        specificExamCapList {
            cap
            contractId
            examId
            id
         }
    }      
}`;