const sum = require('lodash/sum');
const dayjs = require('dayjs');
const isBetween = require('dayjs/plugin/isBetween');

const BudgetRepo = require('./BudgetRepo');

dayjs.extend(isBetween);

class BudgetService {
  /**
   * @constructor
   * @param {BudgetRepo} repo 
   */
  constructor(repo) {
    this.repo = repo;
  }

  /**
   * Get total amount from specify time range. [startDate, endDate]
   * @public
   * @param {String|Date} startDate YYYYMMDD
   * @param {String|Date} endDate YYYYMMDD
   * @returns {Number} total amount
   */
  query(startDate, endDate) {
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    const budgets = this.repo.getAll();
    const intersectedBudgets = budgets.filter(({ date }) =>
      date.isBetween(start.startOf('month'), end.endOf('month'), null, '[]')
    );

    const amounts = intersectedBudgets.map(budget =>
      budget.getAmount(start, end)
    );
    const totalAmount = sum(amounts);

    return totalAmount;
  }
}
  
module.exports = BudgetService;
