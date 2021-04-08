const jobs = require('../models/Job')
const Profile = require('../models/Profile')
const { calculateBudget, remainingDays } = require('../utils/jobsUtils')
class JobController {

    index(req, res) {

        let jobsList = jobs.get()
        const updatedJobs = jobsList.map((job) => {
            const remaining = remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'

            let profile = Profile.get()
            const budget = calculateBudget(job, profile["value-hour"])
            return {
                ...job,
                remaining,
                status,
                budget
            }
        })

        return res.render("index", { jobs: updatedJobs })
    }
    create(req, res) {
        // const jobId = jobs.filter(job => job.id === 1 ? job.id : job.id +1)
        // optional chaining operator ?.
        let jobsList = jobs.get()
        const lastId = jobsList[jobsList.length - 1]?.id || 0

        jobsList.push({
            id: lastId + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now()
        })

        return res.redirect('/')
    }
    show(req, res) {
        const jobId = req.params.id

        let jobsList = jobs.get()
        const job = jobsList.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send('Job not found!')
        }
        let data = profile.get()
        job.budget = calculateBudget(job, data["value-hour"])

        return res.render("job-edit", { job })
    }

    update(req, res) {
        const jobId = req.params.id
        let jobsList = jobs.get()
        const job = jobsList.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send('Job not found!')
        }

        const updatedJob = jobs.update({
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        })

        this.jobs = this.jobs.map(job => {
            if (Number(job.id) === Number(jobId)) {
                job = updatedJob
            }

            return job
        })

        res.redirect('/job/' + jobId)
    }
    delete(req, res) {
        const jobId = req.params.id
        // se o resultado da condição do filter for verdadeira ele manterá no array, 
        // se falso será removido
        const jobsList = jobs.get()
        jobsList.filter(job => Number(job.id) !== Number(jobId))

        return res.redirect('/')
    }
}


module.exports = new JobController()