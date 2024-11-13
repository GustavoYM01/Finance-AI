import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";

interface HomeProps {
  searchParams: {
    month: string;
    year: string;
  };
}

const Home = async ({ searchParams: { month, year } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) redirect("/login");
  if (isMatch(month ?? "", "MM") && isMatch(year ?? "", "yyyy")) {
    const dashboard = await getDashboard(month, year);
    return (
      <>
        <Navbar />
        <div className="space-y-6 p-6">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <TimeSelect />
          </div>
          <div className="grid grid-cols-[2fr,1fr]">
            <div className="flex flex-col gap-6">
              <SummaryCards {...dashboard} />
              <div className="grid grid-cols-3 grid-rows-1 gap-6">
                <TransactionPieChart {...dashboard} />
                <ExpensesPerCategory
                  expensesPerCateggory={dashboard.totalExpensePerCategory}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  redirect(`?month=01&year=${new Date().getFullYear()}`);
};

export default Home;
