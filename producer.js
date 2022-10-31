const { connectQueue } = require('./config')

const jobOptions = {
    // jobId, uncoment this line if your want unique jobid
    removeOnComplete: true, // remove job if complete
    // delay: 6000, // 1 = 60000 min in ms
    attempts: 3 // attempt if job is error retry 3 times
};

const nameQueue = 'request-json-file'

const addJobsToQueue = async (data) => {
    return await connectQueue(nameQueue).add(data, jobOptions)
}

// addGSTRPULL

async function addJobsToQueueToProcess() {
    const countryCode = ['ID', 'RU', 'TR', 'IT', 'MI']
    for (let i = 0; i < countryCode.length; i++) {
        
        const data = {
            message: `hello from producer i am request to consumer file json country with code ${countryCode[i]}`,
            param: countryCode[i]
        }

        const response = await addJobsToQueue(data);

        console.log(`JOB ID IS ${response.id} WITH PARAMS ${response.data.param}`);
    }
}

addJobsToQueueToProcess();
