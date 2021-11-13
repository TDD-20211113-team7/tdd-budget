const _ = require('lodash');
const dayjs = require('dayjs');
const Budget = require('./Budget');
const BudgetRepo = require('./BudgetRepo');
const isBetween = require('dayjs/plugin/isBetween');
const duration = require('dayjs/plugin/duration');

dayjs.extend(isBetween);
dayjs.extend(duration);

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
    // const totalDays = dayjs.duration(end.diff(start)).days() + 1;
    // console.log('totalDays', totalDays);

    if (budget.date.isSame(start.startOf('month'))) {
      if (budget.date.isSame(end.startOf('month'))) {
        return budget.amount / budget.date.endOf('month').date() * (end.date() - start.date() + 1)
      } else {
        return budget.amount / budget.date.endOf('month').date() * (budget.date.endOf('month').date() - start.date() + 1)
      }
    } else if (budget.date.isSame(end.startOf('month'))) {
      return budget.amount / budget.date.endOf('month').date() * (end.date() - budget.date.date() + 1)
    } else {
      return budget.amount;
    }
  }
}

module.exports = BudgetService;
