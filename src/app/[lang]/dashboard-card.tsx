import React from "react";

type DashboardCardProps = {
    title: string,
    total: number,
    netto?: number,
    vat?: number
} | {
    title: string,
    total?: number
    netto: number,
    vat: number,
}

export default async function DashboardCard({title, total, netto, vat}: DashboardCardProps) {
    const hasBreakdown = netto !== undefined && vat !== undefined;
    const displayAmount = hasBreakdown ? (netto + vat) : total;

    return <div className="card dashboard-card">
        <div className="dashboard-card__title">
            {title}
        </div>
        <div className="dashboard-card__amount">
            {displayAmount?.toFixed(2)} €
        </div>
        {hasBreakdown && (
            <div className="dashboard-card__breakdown">
                <div>Netto: {netto.toFixed(2)} €</div>
                <div>VAT: {vat.toFixed(2)} €</div>
            </div>
        )}
    </div>
}