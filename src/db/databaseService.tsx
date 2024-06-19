import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

var db = SQLite.openDatabase({name: 'quiz.db', location: 'default'});

const executeSqlQuary = async (qry: string, params: any = undefined) => {
    try {
        const dbInstance = await db;
        return await dbInstance.executeSql(qry, params);
    } catch (error) {
        console.log({ error });
        return null;
    }
}

const createTables = async () => {
    const query_create_users_table = `
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            phone_no TEXT,
            password TEXT NOT NULL,
            image TEXT
        );
    `;

    const quary_create_questions_table = `
        CREATE TABLE IF NOT EXISTS questions(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            que TEXT NOT NULL,
            option_1 TEXT NOT NULL,
            option_2 TEXT NOT NULL,
            option_3 TEXT,
            option_4 TEXT,
            ans TEXT NOT NULL
        );
    `;

    const quary_create_results_table = `
        CREATE TABLE IF NOT EXISTS results(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            que_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            status INTEGER NOT NULL
        );
    `;

    try {
        const dbInstance = await db;
        await dbInstance.executeSql(query_create_users_table);
        await dbInstance.executeSql(quary_create_questions_table);
        await dbInstance.executeSql(quary_create_results_table);
    } catch (err) {
        console.log({ err });
    }
}

const getUsers = async () => {
    const query_select = "SELECT * FROM users WHERE username != 'admin'";
    return executeSqlQuary(query_select);
}

const getQuestions = async () => {
    const query_select = 'SELECT * FROM questions';
    return executeSqlQuary(query_select);
}

const loginUser = async (username: string, password: string) => {
    const query_login = 'SELECT * FROM users where username = ? and password = ?';
    const params = [username, password];

    return executeSqlQuary(query_login, params);
}

const addUser = async (username: string, phone_no: string, password: string, image: string) => {
    const query_insert = 'INSERT INTO users (username, phone_no, password, image) VALUES (?, ?, ?, ?)';
    const params = [username, phone_no, password, image];

    return executeSqlQuary(query_insert, params);
}

const updateUser = async (id: number, username: string, phone_no: string, password: string, image: string) => {
    const query_insert = 'UPDATE users SET username = ?, phone_no = ?, password = ?, image = ? WHERE id = ?';
    const params = [username, phone_no, password, image, id];

    return executeSqlQuary(query_insert, params);
}

const addQuestion = async (que: string, op1: string, op2: string, op3: string, op4: string, ans: string) => {
    const query_insert = 'INSERT INTO questions (que, option_1, option_2, option_3, option_4, ans) VALUES (?, ?, ?, ?, ?, ?)';
    const params = [que, op1, op2, op3, op4, ans];

    return executeSqlQuary(query_insert, params);
}

const addResult = async (que_id: number, user_id: number, status: number) => {
    const query_insert = 'INSERT INTO results (que_id, user_id, status) VALUES (?, ?, ?)';
    const params = [que_id, user_id, status];

    return executeSqlQuary(query_insert, params);
}

const getUser = async (id: number) => {
    const query_login = 'SELECT * FROM users where id = ?';
    const params = [id];

    return executeSqlQuary(query_login, params);
}

const getResult = async (user_id: number) => {
    const query_login = 'SELECT * FROM results where user_id = ?';
    const params = [user_id];

    return executeSqlQuary(query_login, params);
}

const createAdmin = async (username: string, password: string) => {
    const result = await loginUser(username, password)
    if(result && result.length > 0 && result[0].rows.length <= 0) {
        const query_insert = "INSERT INTO users (username, password) VALUES (?, ?)";
        const params = [username, password];
    
        return executeSqlQuary(query_insert, params);
    }else {
        return result;
    }
}

const deleteQuestions = async () => {
    const query_delete_questions = "DELETE FROM questions";
    const result: any = await executeSqlQuary(query_delete_questions);
    console.log(result);
}

const deleteResults = async () => {
    const query_delete_results = "DELETE FROM results";
    const result: any = await executeSqlQuary(query_delete_results);
    console.log(result);
}

const getReport = async (user_id: number) => {
    // const query_select_report = "SELECT q.*, COALESCE(r.status, 0) AS status FROM questions q LEFT JOIN results r on q.id = r.que_id WHERE r.user_id = ?"
    const query_select_report = "SELECT q.id, q.que, q.option_1, q.option_2, q.option_3, q.option_4, q.ans, COALESCE(r.status, 0) AS status FROM questions q LEFT JOIN results r ON q.id = r.que_id WHERE r.user_id = ?"
    const params = [user_id];
    return executeSqlQuary(query_select_report, params);
}

const resetResult = async (user_id: number) => {
    const query_select_report = "DELETE FROM results WHERE user_id = ?"
    const params = [user_id];
    return executeSqlQuary(query_select_report, params);
}

export { createTables, createAdmin, loginUser, addUser, getUsers, addQuestion, updateUser, addResult, getQuestions, getUser, getResult, resetResult }