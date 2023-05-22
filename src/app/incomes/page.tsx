import prisma from "@/db";
import IncomeCard from "@/components/income";

export const dynamic = "force-dynamic";

export default async function Incomes() {
    const incomes = await prisma.income.findMany();

    return (
        <>
            <h1>Incomes</h1>
            {
                incomes.map(income => {
                    return IncomeCard({income})
                })
            }
        </>
    )
}