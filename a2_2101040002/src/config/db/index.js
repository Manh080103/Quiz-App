const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/wpr-quiz');
        console.log('Connect successfully!');
    } catch (error) {
        console.log('Failed to Connect!');
        
    }
}

module.exports = { connect };