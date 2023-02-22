const getAllJobs = async (req, res) => {
    res.json({ message: 'get all jobs' });
}

const getJob = async (req, res) => {
    res.json({ message: 'get job' });
}

const createJob = async (req, res) => {
    res.json(req.user);
}

const updateJob = async (req, res) => {
    res.json({ message: 'update job' });
}

const deleteJob = async (req, res) => {
    res.json({ message: 'delete job' });
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}