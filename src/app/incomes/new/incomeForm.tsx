import {createIncomeFromForm} from "@/db/income";

export function IncomeForm() {
    const today = new Date();
    const isoDateString = today.toISOString().slice(0, 10);

    return (
        <form action={createIncomeFromForm}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required/>
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" name="amount" step="0.01" required/>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" defaultValue={isoDateString} required/>
            <label htmlFor="files">Files</label>
            <input type="file" name="files" id="files" multiple={true}/>
            <button type="submit" style={{width: "auto"}}>Add Income</button>
        </form>
    )
}
