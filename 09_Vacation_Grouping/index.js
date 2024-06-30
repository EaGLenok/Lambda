const inputJson = require('./vacation.json')

const transformedData = inputJson.reduce((acc, curr) => {
    const userId = curr.user._id;
    const userName = curr.user.name;
    const vacation = {
        startDate: curr.startDate,
        endDate: curr.endDate
    };

    if (!acc[userId]) {
        acc[userId] = {
            userId: userId,
            name: userName,
            weekendDates: []
        };
    }

    acc[userId].weekendDates.push(vacation);

    return acc;
}, {});

const resultJson = Object.values(transformedData);

console.log(JSON.stringify(resultJson, null, 2));
