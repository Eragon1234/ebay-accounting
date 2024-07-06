import {Dict} from "@/translation/dictionaries";
import getDashboardCards from "@/lib/dashboard-cards";

type DashboardProps = {
    dict: Dict,
    rangeStart: Date,
    rangeEnd: Date
}

export default async function Dashboard({dict, rangeStart, rangeEnd}: DashboardProps) {
    const dashboardCards = await getDashboardCards(rangeStart, rangeEnd, dict);

    return <>
        <div className="dashboard">
            {dashboardCards.map(card =>
                <div key={card.title} className="card dashboard-card">
                    <div className="dashboard-card__title">
                        {card.title}
                    </div>
                    <div className="dashboard-card__amount">
                        {card.amount.toFixed(2)} €
                    </div>
                </div>
            )}
        </div>
    </>
}