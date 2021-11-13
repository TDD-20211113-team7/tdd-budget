const _ = require('lodash');
const dayjs = require('dayjs');
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

  // /**
  //  * 
  //  * @public
  //  * @param {String} startDate YYYYMMDD
  //  * @param {String} endDate YYYYMMDD
  //  * @returns {Number}
  //  */
  // query(startDate, endDate) {
  //   const start = dayjs(new Date(startDate));
  //   const startOfMonth = start.startOf('month');
  //   const end = dayjs(new Date(endDate));
  //   const endOfMonth = end.startOf('month');
  //   const dayOfMonth = start.endOf('month').day();

    
  //   let budgetList = this.repo.getAll();
  //   console.log(budgetList);
  //   for (const budget of budgetList) {
  //     if (startOfMonth.isSame(budget.date)) {
  //       return budget.amount / dayOfMonth;
  //     }
  //   }

  //   return 0;
  // }


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
      console.log(isBetween, dayjs(element.date).format(), startOfMonth.format(), endOfMonth.format(), start.format(), end.format());
      return isBetween;
    })
    return _.sum(results.map(result => this.getBudgetOfMonth(start, end, result)));
  }

  getBudgetOfMonth(start, end, budget) {
    if (budget.date.isSame(start.startOf('month'))) {
      return budget.amount / (budget.date.date() - start.date() + 1)
    } else if (budget.date.isSame(end.startOf('month'))) {
      return budget.amount / (end.date - budget.date.date() + 1)
    } else {
      return budget.amount;
    }
  }
}

module.exports = BudgetService;
