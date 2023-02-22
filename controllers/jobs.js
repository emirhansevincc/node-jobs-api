const Job = require('../models/Job');
const { tryCatch } = require('../utils/tryCatch');

const getAllJobs = tryCatch( async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user._id });
    res.json({ jobs, createdBy: req.user });
});

const getJob = async (req, res) => {

    // id is the same as req.params.id but _id is the same as req.user._id
    const { params: { id }, user: { _id } } = req; 
    const job = await Job.findOne({ _id: id, createdBy: _id });

    if (!job) {
        throw new Error('Job not found');
    }

    res.json({ job, createdBy: {
        name : req.user.name,
        email: req.user.email
    } });
}

const createJob = tryCatch( async (req, res) => {
    req.body.createdBy = req.user._id; // add createdBy field to req.body
    const job = await Job.create(req.body);
    res.status(201).json({ job });
});

const updateJob = async (req, res) => {

    const {
        params: { id },
        body: { company, position, status },
        user: { _id }
    } = req;

    if(!company || !position || !status) {
        throw new Error('Please provide company, position and status');
    }

    // The first parameter is the filter, the second parameter is the update, the third parameter is the options
    // Options is about what to return, new: true means return the updated document, runValidators: true means run the validators
    const findAndUpdate = await Job.findOneAndUpdate( { _id: id, createdBy: _id }, req.body, { new: true, runValidators: true } );

    if (!findAndUpdate) {
        throw new Error('Job not found');
    }

    res.json({ job: findAndUpdate });

}

const deleteJob = async (req, res) => {
    
    // id is the same as req.params.id but _id is the same as req.user._id
    const { params: { id }, user: { _id } } = req;
    const job = await Job.findOneAndDelete({ _id: id, createdBy: _id });

    if (!job) {
        throw new Error('Job not found');
    }

    res.json({ job, deletedFrom: {
        name : req.user.name,
        email: req.user.email
        }
    });
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}