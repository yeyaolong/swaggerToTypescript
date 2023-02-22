import '@/css/index.less';
import db from '@/core/storage';

db.set('token', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaHVoYW5hZG1pbjoiLCJleHAiOjE2NzcxOTk1MzR9.HPyqM-TSDHl1AxFGn0PY34MNcuc7xQDxzhf22CJR6RzlPmzBexddrK6SpzmJKZ1bn29QIda6CQrqfLnJRedaIg')

async function getToken() {
    let token = await db.get('token', '');
    console.log('token', token);
}

getToken();



