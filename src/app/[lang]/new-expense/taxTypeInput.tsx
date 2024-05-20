"use client";

import {useState} from "react";
import {TaxType} from "@/db/schema";
import {Dict} from "@/translation/dictionaries";

export function TaxTypeInput({dict}: { dict: Dict }) {
    const [taxType, setTaxType] = useState<string>(TaxType.VAT);

    return <>
        <label htmlFor="taxType">{dict.addExpense.taxType}</label>
        <select id="taxType" name="taxType" value={taxType} onChange={e => setTaxType(e.target.value)}>
            {
                Object.keys(TaxType).map(key =>
                    <option key={key}
                            value={key}>{dict.addExpense.taxTypeEnum[key as keyof typeof TaxType]}</option>
                )
            }
        </select>
        {taxType === TaxType.VAT && <input type="number" id="vat" name="vat" required/>}
    </>;
}