import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transaction";
import { ScrollArea } from "../_components/ui/scroll-area";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import AiReportButton from "./_components/ai-report-button";

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
    const userCanAddTransaction = await canUserAddTransaction();
    return (
      <>
        <Navbar />
        <div className="flex flex-col space-y-6 overflow-hidden p-6">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-3">
              <AiReportButton month={month} year={year} />
              <TimeSelect />
            </div>
          </div>
          <div className="grid grid-cols-[2fr,1fr] gap-6 overflow-hidden">
            <div className="flex flex-col gap-6 overflow-hidden">
              <SummaryCards
                {...dashboard}
                userCanAddTransaction={userCanAddTransaction as boolean}
              />
              <div className="grid grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
                <ScrollArea className="h-full">
                  <TransactionPieChart {...dashboard} />
                </ScrollArea>
                <ExpensesPerCategory
                  expensesPerCateggory={dashboard.totalExpensePerCategory}
                />
              </div>
            </div>
            <LastTransactions lastTransactions={dashboard.lastTransactions} />
          </div>
        </div>
      </>
    );
  }
  redirect(
    `?month=${new Date().getMonth() + 1}&year=${new Date().getFullYear()}`,
  );
};

export default Home;
