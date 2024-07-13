import React from "react";

type DashboardCardProps = {
    title: string,
    getAmount(): Promise<number>
}

export default async function DashboardCard({title, getAmount}: DashboardCardProps) {
    const amount = await getAmount();

    return <div className="card dashboard-card">
        <div className="dashboard-card__title">
            {title}
        </div>
        <div className="dashboard-card__amount">
            {amount.toFixed(2)} €
        </div>
    </div>
}