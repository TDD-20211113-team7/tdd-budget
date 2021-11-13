const _ = require('lodash');
const dayjs = require('dayjs');
const Budget = require('./Budget');
const BudgetRepo = require('./BudgetRepo');
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)

class BudgetService {
  constructor(repo) {
    /**
     * @type {BudgetRepo}
     */
    this.repo = repo;
    this.getBudgetOfMonth = this.getBudgetOfMonth.bind(this);
  }

  /**
   * 
   * @public
   * @param {String} startDate YYYYMMDD
   * @param {String} endDate YYYYMMDD
   * @returns {Number}
   */
   query(startDate, endDate) {
    const start = dayjs(startDate);
    const startOfMonth = start.startOf('month');
    const end = dayjs(endDate);
    const endOfMonth = end.startOf('month');

    const results = this.repo.budgetList.filter(element => {
      const isBetween = dayjs(element.date).isBetween(startOfMonth, endOfMonth, null, '[]');
      return isBetween;
    })
    return _.sum(results.map(result => this.getBudgetOfMonth(start, end, result)));
  }

  /**
   * @param {dayjs.Dayjs} start 
   * @param {dayjs.Dayjs} end 
   * @param {Budget} budget 
   * @returns {Number}
   */
  getBudgetOfMonth(start, end, budget) {
    if (budget.date.isSame(start.startOf('month'))) {
      if (budget.date.isSame(end.startOf('month'))) {
        console.log('same month', (end.date() - start.date() + 1));
        return budget.amount / budget.date.endOf('month').date() * (end.date() - start.date() + 1)
      } else {
        console.log('diff month', (budget.date.date() - start.date() + 1));
        return budget.amount / budget.date.endOf('month').date() * (budget.date.date() - start.date() + 1)
      }
      
      
    } else if (budget.date.isSame(end.startOf('month'))) {
      console.log((end.date() - budget.date.date() + 1));
      return budget.amount / (end.date() - budget.date.date() + 1)
    } else {
      return budget.amount;
    }
  }
}

module.exports = BudgetService;
