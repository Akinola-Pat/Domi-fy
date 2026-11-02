export type ReminderStage =
  | 'ADVANCE_3_MONTHS'
  | 'ADVANCE_2_MONTHS'
  | 'ADVANCE_1_MONTH'
  | 'ADVANCE_14_DAYS'
  | 'DUE_DATE'
  | 'OVERDUE_7_DAYS'
  | 'OVERDUE_1_MONTH';

export interface ReminderDecision {
  stage: ReminderStage;
  shouldNotify: boolean;
  isOverdue: boolean;
  reason: string;
}

/**
 * Calculates whether a lease requires a reminder notification based on its due date
 * and payment status, adhering to the platform's administrative reminder schedule.
 */
export function evaluateReminderStage(
  dueDate: Date,
  isPaid: boolean,
  currentDate: Date = new Date()
): ReminderDecision | null {
  // Suppress future reminders if the lease has already been paid for the period
  if (isPaid) {
    return null;
  }

  const due = new Date(dueDate);
  const now = new Date(currentDate);

  // Time difference in milliseconds and calendar day calculations
  const diffTime = now.getTime() - due.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Overdue stage: 1 calendar month after due date
  const oneMonthAfter = new Date(due);
  oneMonthAfter.setMonth(oneMonthAfter.getMonth() + 1);

  if (now >= oneMonthAfter) {
    return {
      stage: 'OVERDUE_1_MONTH',
      shouldNotify: true,
      isOverdue: true,
      reason: 'Rent is unpaid one calendar month past due date (final administrative escalation).',
    };
  }

  // Overdue stage: 7 calendar days after due date
  if (diffDays >= 7) {
    return {
      stage: 'OVERDUE_7_DAYS',
      shouldNotify: true,
      isOverdue: true,
      reason: 'Rent is unpaid 7 calendar days past due date (initial overdue notification).',
    };
  }

  // Due date
  if (diffDays === 0) {
    return {
      stage: 'DUE_DATE',
      shouldNotify: true,
      isOverdue: false,
      reason: 'Rent is due today.',
    };
  }

  // Advance reminders (before due date)
  if (diffDays === -14) {
    return {
      stage: 'ADVANCE_14_DAYS',
      shouldNotify: true,
      isOverdue: false,
      reason: 'Rent is due in 14 days.',
    };
  }

  const oneMonthBefore = new Date(due);
  oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);
  if (now.toDateString() === oneMonthBefore.toDateString()) {
    return {
      stage: 'ADVANCE_1_MONTH',
      shouldNotify: true,
      isOverdue: false,
      reason: 'Rent is due in 1 calendar month.',
    };
  }

  const twoMonthsBefore = new Date(due);
  twoMonthsBefore.setMonth(twoMonthsBefore.getMonth() - 2);
  if (now.toDateString() === twoMonthsBefore.toDateString()) {
    return {
      stage: 'ADVANCE_2_MONTHS',
      shouldNotify: true,
      isOverdue: false,
      reason: 'Rent is due in 2 calendar months.',
    };
  }

  const threeMonthsBefore = new Date(due);
  threeMonthsBefore.setMonth(threeMonthsBefore.getMonth() - 3);
  if (now.toDateString() === threeMonthsBefore.toDateString()) {
    return {
      stage: 'ADVANCE_3_MONTHS',
      shouldNotify: true,
      isOverdue: false,
      reason: 'Rent is due in 3 calendar months.',
    };
  }

  return null;
}

