let jobs = [
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
        "daily-hours":3,
        "total-hours":47,
        created_at: Date.now(),
        
        
    }
]

module.exports = {
    get(){
        return jobs;
    },
    create(newJob){
        jobs.push(newJob)
    },
    update(newJob){
        jobs = newJob
    },
    delete(id){
        // se o resultado da condição do filter for verdadeira ele manterá no array, 
        // se falso será removido
        jobs = jobs.filter(job => Number(job.id) !== Number(id))
    }
}