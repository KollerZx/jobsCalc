const { calculateBudget, remainingDays } = require('../utils/jobsUtils')
const Job = require('../models/Job')
const Profile = require('../models/Profile')
class DashboardController {
    async index(req, res) {

        const jobsList = await Job.get()
        const profile = await Profile.get()

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobsList.length
        }

        // total de horas por dia de cada job em progresso
        let jobTotalHours = 0
        const updatedJobs = jobsList.map((job) => {
            const remaining = remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'

            // incrementando a quantidade de projetos por status
            statusCount[status] += 1

            // total de horas por dia de cada job em progresso

            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours


            const budget = calculateBudget(job, profile['value-hour'])
            return {
                ...job,
                remaining,
                status,
                budget
            }
        })

        const freeHours = profile["hours-per-day"] - jobTotalHours

        return res.render("index", { jobs: updatedJobs, profile, statusCount, freeHours })
    }
}

module.exports = new DashboardController()