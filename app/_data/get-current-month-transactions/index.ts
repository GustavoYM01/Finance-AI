import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { endOfMonth, startOfMonth } from "date-fns";

export const getCurrentMonthTransaction = async () => {
  const { userId } = await auth();
  if (!userId) {
    return new Error("Unauthorized");
  }
  return await db.transaction.count({
    where: {
      userId,
      createdAt: { gte: startOfMonth(new Date()), lt: endOfMonth(new Date()) },
    },
  });
};
