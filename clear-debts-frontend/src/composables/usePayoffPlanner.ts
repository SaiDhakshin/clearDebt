import type { Debt } from "@/types/Debt";
import { computed, type Ref } from "vue";

export function usePayoffPlanner(debts: Ref<Debt[]>) {
  // Smallest balance strategy (snowball)
  const snowballStrategy = computed(() => {
    return [...debts.value].sort((a, b) => a.currentBalance - b.currentBalance);
  });

  // Highest interest rate strategy (avalanche)
  const avalancheStrategy = computed(() => {
    return [...debts.value].sort((a, b) => b.interestRate - a.interestRate);
  });

  // Customer strategy (user-defined order)
  const dueDateStrategy = computed(() => {
    return [...debts.value].sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  });

  const getStrategy = (strategy: string) => {
    switch (strategy) {
      case "snowball":
        return snowballStrategy.value;
      case "avalanche":
        return avalancheStrategy.value;
      case "dueDate":
        return dueDateStrategy.value;
      default:
        return snowballStrategy.value; // Default to snowball if no valid strategy is provided
    }
  };

  return { snowballStrategy, avalancheStrategy, dueDateStrategy, getStrategy };
}
