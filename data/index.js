import mongoose from "mongoose";

const userIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
];

export const users = [
    {
        _id: userIds[0],
        fullName: "Arlekin Gelblinker",
        email: "arlekin@germany.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p11.jpg",
        friends: [],
        location: "Thal, Austria",
        occupation: "Professional bodybuilder, Actor",
        viewedProfile: 14561,
        impressions: 888822,
        createdAt: 1115211422,
        updatedAt: 1115211422,
        __v: 0,
    },
    {
        _id: userIds[1],
        fullName: "Huan-Bloude Von Herr",
        email: "vonherr@belgium.com",
        password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p4.jpg",
        friends: [],
        location: "Belgium",
        occupation: "Martial artist, Actor",
        viewedProfile: 12351,
        impressions: 55555,
        createdAt: 1595589072,
        updatedAt: 1595589072,
        __v: 0,
    },
    {
        _id: userIds[2],
        fullName: "Vladrea Shark",
        email: "vladrea@detroit.com",
        password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
        picturePath: "p13.jpg",
        friends: [],
        location: "Detroit, Michigan",
        occupation: "Bodybuilder",
        viewedProfile: 45468,
        impressions: 19986,
        createdAt: 1288090662,
        updatedAt: 1288090662,
        __v: 0,
    },
    {
        _id: userIds[3],
        fullName: "Tonika Bones",
        email: "tonika@fort.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p2.jpg",
        friends: [],
        location: "Fort Knox",
        occupation: "Professional female bodybuilder",
        viewedProfile: 41024,
        impressions: 55316,
        createdAt: 1219214568,
        updatedAt: 1219214568,
        __v: 0,
    },
    {
        _id: userIds[4],
        fullName: "Gustav Triplantis",
        email: "mondo@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p10.jpg",
        friends: [],
        location: "Lafayette, U. S.",
        occupation: "Pole vaulter",
        viewedProfile: 40212,
        impressions: 7758,
        createdAt: 1493463661,
        updatedAt: 1493463661,
        __v: 0,
    },
    {
        _id: userIds[5],
        fullName: "Veronika Billiams",
        email: "veronika@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p6.jpg",
        friends: [],
        location: "Florida, U. S.",
        occupation: "Tennis player",
        viewedProfile: 976,
        impressions: 4658,
        createdAt: 1381326073,
        updatedAt: 1381326073,
        __v: 0,
    },
    {
        _id: userIds[6],
        fullName: "Pavlo Burmi",
        email: "pavlo@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p9.jpg",
        friends: [],
        location: "Turku, Finland",
        occupation: "Runner",
        viewedProfile: 1510,
        impressions: 77579,
        createdAt: 1714704324,
        updatedAt: 1642716557,
        __v: 0,
    },
    {
        _id: userIds[7],
        fullName: "Kate Nichou",
        email: "kate@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p12.jpg",
        friends: [],
        location: "Beaumont, Texas",
        occupation: "Basketball player",
        viewedProfile: 19420,
        impressions: 82970,
        createdAt: 1369908044,
        updatedAt: 1359322268,
        __v: 0,
    },
];

export const posts = [
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[1],
        fullName: "Huan-Bloude Von Herr",
        location: "Belgium",
        description: "Subscribe and check my personal trainings!",
        picturePath: "post4.jpg",
        userPicturePath: "p4.jpg",
        likes: new Map([
            [userIds[0], true],
            [userIds[2], true],
            [userIds[3], true],
            [userIds[4], true],
        ]),
        comments: [
            "I'll definitely join",
            "Great result",
            "It is FIRE",
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[3],
        fullName: "Veronika Billiams",
        location: "Florida, U. S.",
        description:
            "Sport keeps us young",
        picturePath: "post3.jpg",
        userPicturePath: "p6.jpg",
        likes: new Map([
            [userIds[7], true],
            [userIds[4], true],
            [userIds[1], true],
            [userIds[2], true],
        ]),
        comments: [
            "I agree",
            "Let's play together",
            "How to contact you?",
            "You are THE BEST",
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[4],
        fullName: "Kate Nichou",
        location: "Beaumont, Texas",
        description:
            "Muscles are awesome. I wish everybody would have one",
        picturePath: "post1.jpg",
        userPicturePath: "p12.jpg",
        likes: new Map([
            [userIds[1], true],
            [userIds[6], true],
            [userIds[3], true],
            [userIds[5], true],
        ]),
        comments: [
            "Thank you very much for sharing your experience with us",
            "Thank you for sharing your story and experience with us",
            "You motivate me to live",
            "How?",
            "You often find new and innovative solutions to a problem",
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[5],
        fullName: "Pavlo Burmi",
        location: "Turku, Finland",
        description:
            "The only way to prove you are a good sport is to lose",
        picturePath: "post2.jpg",
        userPicturePath: "p9.jpg",
        likes: new Map([
            [userIds[1], true],
            [userIds[6], true],
            [userIds[3], true],
        ]),
        comments: [
            "There may be people that have more talent than you, but there’s no excuse for anyone to work harder than you do",
            "If you fail to prepare, you’re prepared to fail",
            "Wisdom is always an overmatch for strength",
            "Hard work beats talent when talent doesn’t work hard",
            "Good is not good when better is expected",
            "Memories last forever",
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[6],
        fullName: "Gustav Triplantis",
        location: "Lafayette, U. S.",
        description:
            "Without self-discipline, success is impossible, period",
        picturePath: "post5.jpg",
        userPicturePath: "p10.jpg",
        likes: new Map([
            [userIds[1], true],
            [userIds[3], true],
            [userIds[5], true],
            [userIds[7], true],
        ]),
        comments: [
            "Age is no barrier. It’s a limitation you put on your mind",
            "Most people give up just when they’re about to achieve success. They quit on the one yard line. They give up at the last minute of the game one foot from a winning touchdown",
            "You have to do something in your life that is honorable and not cowardly if you are to live in peace with yourself",
            "Persistence can change failure into extraordinary achievement",
            "Champions keep playing until they get it right",
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[7],
        fullName: "Vladrea Shark",
        location: "Detroit, Michigan",
        description:
            "People ask me what I do in winter when there’s no baseball. I’ll tell you what I do. I stare out the window and wait for spring",
        picturePath: "post6.jpg",
        userPicturePath: "p13.jpg",
        likes: new Map([
            [userIds[1], true],
            [userIds[2], true],
        ]),

        comments: [
            "You were born to be a player. You were meant to be here. This moment is yours",
            "Who is your inspiration?",
            "What sports do you enjoy watching?",
            "What would be your superpower?",
            "When do you plan to retire?",
        ],
    },
];