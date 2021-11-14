const sum = require('lodash/sum');
const dayjs = require('dayjs');
const BudgetRepo = require('./BudgetRepo');

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
   * @param {String|Date} startDate String('YYYYMMDD') or Date
   * @param {String|Date} endDate String('YYYYMMDD') or Date
   * @returns {Number} total amount
   */
  query(startDate, endDate) {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const budgets = this.repo.getAll();
    return sum(budgets.map(budget => budget.getAmount(start, end)));
  }
}

module.exports = BudgetService;
