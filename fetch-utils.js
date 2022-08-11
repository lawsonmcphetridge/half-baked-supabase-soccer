const SUPABASE_URL = 'https://inscuvivqekepbbejenx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imluc2N1dml2cWVrZXBiYmVqZW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTk2MzgyMjIsImV4cCI6MTk3NTIxNDIyMn0.mMud0-2r80_UKoUASXkpnvhHuiTGmN43rkaeKWa6nkQ';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);



export async function createGame(game){
    const response = await client.from('games').insert(game);
    return checkError(response);
}

export async function getGames() {
    const resp = await client.from('games').select('*');
    return checkError(resp);    
}

export async function getUser() {
    return client.auth.session();
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectToGames() {
    if (await getUser()) {
        location.replace('./games');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
