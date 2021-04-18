const Job = require('../models/Job')
const Profile = require('../models/Profile')
const { calculateBudget } = require('../utils/jobsUtils')
class JobController {

    async create(req, res) {

        await Job.create({
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now()
        })


        return res.redirect('/')
    }
    async show(req, res) {
        const jobId = req.params.id

        const jobsList = await Job.get()
        const job = jobsList.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send('Job not found!')
        }
        const profile = await Profile.get()
        job.budget = calculateBudget(job, profile["value-hour"])

        return res.render("job-edit", { job })
    }

    async update(req, res) {
        const jobId = req.params.id
        
        const updatedJob = {
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

        await Job.update(updatedJob, jobId)

        res.redirect('/job/' + jobId)
    }
    async delete(req, res) {
        const jobId = req.params.id

        await Job.delete(jobId)
        return res.redirect('/')
    }
}


module.exports = new JobController()