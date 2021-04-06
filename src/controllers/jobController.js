const path = require('path')

class JobController {
    constructor() {
        this.dayDiff
        this.profile = {
            name: "Henrique",
            avatar: "https://github.com/KollerZx.png",
            "monthly-budget": 3000,
            "days-per-week": 5,
            "hours-per-day": 5,
            "vacation-per-year": 4,
            "value-hour": 75
        }

        this.jobs = [
            {
                id:  1,
                name: "Pizzaria Guloso",
                "daily-hours": 2,
                "total-hours": 1,
                created_at: Date.now(),
                
            },
            {
                id:  2,
                name: "OneTwo Project",
                "daily-hours": 3,
                "total-hours": 47,
                created_at: Date.now(),
                
                
            }
        ]

        this.views = path.join(__dirname + '/../views/')
        
    }
    remainingDays(job) {
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()

        const createdDate = new Date(job.created_at)

        //dia do vencimento
        const dueDay = createdDate.getDate() + Number(remainingDays)
        const dueDateInMs = createdDate.setDate(dueDay)

        //Dia do vencimento - o dia atual em milisegundos
        const timeDiffInMs = dueDateInMs - Date.now()
        //transformar milisegundos em dias
        const dayInMs = 1000 * 60 * 60 * 24

        this.dayDiff = Math.floor(timeDiffInMs / dayInMs)

        return this.dayDiff
    }
    monitorJobs(req, res) {

        const jobMonitor = this.jobs.map((job) => {
            const remaining = this.remainingDays(job)

            const status = remaining <= 0 ? 'done' : 'progress'
            const budget = this.calculateBudget(job, this.profile["value-hour"])
            return {
                ...job,
                remaining,
                status,
                budget:budget
            }
        })

        return res.render(this.views + "index", { jobs: jobMonitor })
    }
    createJob(req,res){
        // const jobId = jobs.filter(job => job.id === 1 ? job.id : job.id +1)
        const lastId = this.jobs[this.jobs.length - 1]?.id || 1
        this.jobs.push({
            id: lastId + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now()
        })
        
        return res.redirect('/')
    }
    hourlyValue(req, res){
        //pegar os dados do req.body
        const data = req.body

        //definir quantas semanas tem em 1 ano
        const weeksPerYear = 52

        //remover as semanas de férias, para calcular a média de semanas em 1 mês
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12

        //horas trabalhadas por semana
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
        
        //total de horas trabalhadas no mês
        const monthlyTotalHours = weekTotalHours * weeksPerMonth

        //valor da hora

        const valueHour = data["value-hour"] = data["monthly-budget"] / monthlyTotalHours

        this.profile = {
            ...this.profile,
            ...req.body,
            "value-hour": valueHour
        }

        return res.redirect('/profile')
    }
    showProfile(req,res){
        const profile = this.profile
        return res.render(this.views + "profile", { profile:profile })
    }
    showJob(req,res){
        const jobId = req.params.id

        let job = this.jobs.find(job => Number(job.id) === Number(jobId))

        if(!job){
            return res.send('Job not found!')
        }
        let budget = this.calculateBudget(job, this.profile["value-hour"])

        job = {
            ...job,
            budget:budget
        }
        return res.render(this.views + "job-edit", { job })
    }
    calculateBudget(job, valueHour){
        return valueHour * job["total-hours"]
    }
}


module.exports = new JobController()