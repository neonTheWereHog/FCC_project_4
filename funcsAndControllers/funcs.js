const limitByInt = (logs, from, to, limit) => {
    let holdr = []
    let returnArr = []
    for (let i = 0; i < logs.length; i++) {

        /* If 'from' and 'to' are both defined, then, if
        the date of the Ith item in 'logs' is both greater than
        'from' and less than 'to', it is push to holdr. */
        if (from !== undefined && to !== undefined) {
            if (new Date(logs[i].date) > new Date(from) && new Date(logs[i].date) < new Date(to)) {
                holdr.push(logs[i]) 
                continue;
            }
        }
        
        if (from !== undefined && to === undefined) {           
            /****                                            
            checks if 'from' is defined, then,
            if the date of the Ith item in logs
            is greater than the date stored in
            'from', it will push it to holdr
            and start the next loop                
            ****/
            if (new Date(logs[i].date) > new Date(from)) {
                holdr.push(logs[i]) 
                continue;
            } else {
                continue;
            }
        }

        if (to !== undefined && from === undefined) {
            /****                                            
            if 'to' is defined and 'from' isn't, then,
            if the date of the Ith item in logs
            is less than the date stored in
            'to', it will push it to holdr
            and start the next loop                
            ****/
            if (new Date(logs[i].date) < new Date(to)) {
                holdr.push(logs[i])
                continue;
            } else {
                continue;
            }
        }
        /* If 'to' and 'from' are both undefined,
           then we push logs to 'holdr'*/
        if (to === undefined && from === undefined) {
            holdr.push(...logs)
            break;
        }
    }
    for (let i = 0; holdr[i] !== undefined && i < limit; i++) {
        returnArr.push(holdr[i])
    }
    return returnArr
}

const limitByDate = (logs, from, to) => {
    let holdr = []
    for (let i = 0; i < logs.length; i++) {
        if (from !== undefined && to !== undefined) {
            if (new Date(logs[i].date) > new Date(from) && new Date(logs[i].date) < new Date(to)) {
                holdr.push(logs[i]) 
                continue;
            }
        }
        if (from !== undefined && to === undefined) {           
            /****                                            
            checks if 'from' is defined, then,
            if the date of the Ith item in logs
            is greater than the date stored in
            'from', it will push it to holdr
            and start the next loop                
            ****/
            if (new Date(logs[i].date) > new Date(from)) {
                holdr.push(logs[i]) 
                continue;
            } else {
                continue;
            }
        } 
        if (to !== undefined && from === undefined) {
            /****                                            
            checks if 'to' is defined, then,
            if the date of the Ith item in logs
            is less than 'to', it will push it to holdr
            and start the next loop                
            ****/
            if (new Date(logs[i].date) < new Date(to)) {
                holdr.push(logs[i])
                continue;
            } else {
                continue;
            }
        }
        if (to === undefined && from === undefined) {
            holdr.push(...logs)
            break;
        }
        
    }
    return holdr
}

const formatDate = (date) => {
    date = date.match(/[A-Za-z0-9: ]/g).slice(0, date.length - 14).join("")
    let day = date.slice(4, 7)
    let month = date.slice(7, 11)
    date = date.slice(0, 4) + month + day + date.slice(11, date.length)
    return date
}

module.exports = { limitByInt, limitByDate, formatDate }