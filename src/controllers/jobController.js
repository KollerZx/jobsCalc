const Job = require('../models/Job')
const Profile = require('../models/Profile')
const { calculateBudget, remainingDays } = require('../utils/JobsUtils')
class JobController {

    create(req, res) {
        // const jobId = jobs.filter(job => job.id === 1 ? job.id : job.id +1)
        // optional chaining operator ?.
        const jobsList = Job.get()
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

        const jobsList = Job.get()
        const job = jobsList.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send('Job not found!')
        }
        const profile = Profile.get()
        job.budget = calculateBudget(job, profile["value-hour"])

        return res.render("job-edit", { job })
    }

    update(req, res) {
        const jobId = req.params.id
        let jobsList = Job.get()
        const job = jobsList.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send('Job not found!')
        }

        const updatedJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

        const newJobs = jobsList.map(job => {
            if (Number(job.id) === Number(jobId)) {
                job = updatedJob
            }

            return job
        })

        Job.update(newJobs)

        res.redirect('/job/' + jobId)
    }
    delete(req, res) {
        const jobId = req.params.id
        // se o resultado da condição do filter for verdadeira ele manterá no array, 
        // se falso será removido

        Job.delete(jobId)
        return res.redirect('/')
    }
}


module.exports = new JobController()