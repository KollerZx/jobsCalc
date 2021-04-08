module.exports = {

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

        const dayDiff = Math.floor(timeDiffInMs / dayInMs)

        return dayDiff
    },

    calculateBudget(job, valueHour) {
        return valueHour * job["total-hours"]
    }
}
