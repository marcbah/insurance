import React from 'react';
import { useForm } from 'react-hook-form';

export default function ContractNameBox() {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Nom" name="Nom" ref={register({required: true})} />
            <input type="text" placeholder="Pseudo" name="Pseudo" ref={register({required: true})} />
            <input type="text" placeholder="Description" name="Description" ref={register} />
            <input type="number" placeholder="Taux de remboursement" name="Taux de remboursement" ref={register({required: true})} />
            <select name="Territorialité" ref={register({ required: true })}>
                <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                <option value="Monde entier">Monde entier</option>
                <option value="Afrique">Afrique</option>
            </select>
        </form>
    );
}