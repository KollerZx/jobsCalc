const Profile = require ('../models/Profile')

class ProfileController{
    
    async getProfile(req,res){
        return res.render("profile",{ profile: await Profile.get()})
    }
    async hourlyValue(req, res){
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

        const profile = await Profile.get()
        await Profile.update({
            ... profile,
            ...req.body,
            "value-hour": valueHour
        })
        

        return res.redirect('/profile')
    }
}

module.exports = new ProfileController()