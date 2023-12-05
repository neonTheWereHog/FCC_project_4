const { userModel } = require("../schemasAndModels/SAM.js")
const { limitByInt, limitByDate, formatDate } = require("./funcs.js")

const createNewUser = (req, res) => {
    const { username } = req.body
    let user = new userModel({
                     username: username,
                     count: 0,
                     log: []
                   })
    user.save().then((data) => {
      return res.json({username: data.username, _id: data._id})
    }).catch(err => {
        console.log(err)
        return res.send("Sorry! It looks like we had some trouble setting up your account")
    })
  
  }

    const getUsers = (req, res) => {
        userModel.aggregate([
            {$match: {username: String}},
            {$project: {_id: 1, username: 1}}
        ]).then(data => {
            return res.send(data)
        })
    
  }


let listExercise = (req, res) => {
    const { _id } = req.params;
    let { duration, description, date } = req.body;
    let workout;
    let durationErr = new Error("validationError: 'duration' must be a number greater than 0")
    let descErr = new Error("validationError: 'description' must be a string between 0 and 21 characters long")
    let dateErr = new Error("validationError: 'date' must be a valid date.")
    let idErr = new Error("validationError: You must provide the id of a user.")

    /********
     * 
     * SECTION FOR VALIDATION
     * 
     *********/
    if (!date) {date = formatDate(new Date().toUTCString())} else {date = formatDate(new Date(date).toUTCString())}

    if (new Date(date) == "Invalid Date") throw(dateErr)

    if (Number(duration) <= 0) throw(durationErr)

    if (description.length > 20 || description.length == 0 || !description) throw(descErr)

    /*******
     * 
     * SECTION FOR RESPONDING
     * 
     ********/

    userModel.findById(_id).then(data => {
        
        workout = {
            description: description,
            duration: Number(duration),
            date: new Date(date).toDateString(),
        }
        data.count += 1
        data.log.push(workout)
        data.save().then(result => {
            userModel.aggregate([
                {$match: {_id: result._id}},
                {$project: {logs: 0, __v: 0, log: 0, count: 0}},
                {$addFields: {
                    date: new Date(date).toDateString(),
                    duration: Number(duration),
                    description: description,
                }}
            ]).then(r => {
                return res.json(r[0])
            })
        })
    }).catch(err => {
        return res
            .status(404)
            .json({idError: "Please provide the id of a user."})
    })

}

const deleteUser = (req, res) => {
    const { id } = req.params
    userModel.findByIdAndDelete(id).then(result => {
        res.json({success: true})
    })

}

const getLogs = (req, res) => {
    const { _id } = req.params;
    let { from, to, limit } = req.query

    if (limit !== undefined) {
        limit.match(/[A-Za-z]/) ? limit = 1 : limit
    }

    userModel.findById(_id).then(user => {
        let holdr = {
            username: user.username,
            from: from,
            to: to,
            count: 0,
            _id: user._id,
            log: []
        }
        let arr = user.log
        if (limit !== undefined) {
            holdr.log.push(...limitByInt(arr, from, to, limit))
        } else {
            holdr.log.push(...limitByDate(arr, from, to))
        }

        holdr.count = holdr.log.length
        return res.json(holdr)
    }).catch(err => {
        return res.json({error: "invalid ID"})
    })
}

module.exports = { 
    createNewUser,
    getUsers,
    listExercise, 
    deleteUser, 
    getLogs
 }