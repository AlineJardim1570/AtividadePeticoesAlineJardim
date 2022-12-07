const jsonwebtoken = require('jsonwebtoken');
const { getP, getPetitions, addP, addUser, checkToken, checkEmail, signP } = require("../models/home");
const Joi = require('joi');

module.exports.home = async (app, req, res) => {
    try {
        const peticoes = await getPetitions();
        if(!peticoes || peticoes.length === 0)
        return res.status(200).json(`Não há petições registradas!`);
        else
        return res.status(200).json(peticoes);
    }   catch (error) {return res.status(500).json(`[ERROR] - ${error}`);}
}

module.exports.createUser = async (app, req, res) => {
    console.log('[Add User]');
    let user = req.body;
    const { error } = schemaUser.validate(user);
    if(error) return res.status(500).json({error:"Erro ao incluir usuário!"});

    try {
        const email_registered =  await checkEmail(user.email);
        if(!email_registered) {
        user.token = jsonwebtoken.generate(16);
        const addedUser =  await addUser(user);
        console.log("Added User: ", addedUser);
        return res.status(200).json({db:addedUser, token: user.token});
        } else { return res.status(400).json(`Email ${user.email} já está em uso!`);
        }
    } catch (error) { return res.status(500).json(`[Add User ERROR] - ${error}`);
    }
}

module.exports.loginUser = async (app, req, res) => {
    const email  = req.body.email;
    const password  = req.body.password;
    console.log(`[Login: ${email}]`);
    try {
        const user = await checkEmail(email);
        if(!user) {
            return res.status(404).json(`Não existe usuário cadastrado com o email: ${email}`);
        }
        else if(user.password === password) {return res.status(200).json(`Token: ${user.token}`);
        } else {return res.status(401).json(`Senha incorreta`);
        }
    } catch (error) {
        return res.status(404).json(`[View Petition ${id} ERROR] - ${error}`);
    }
}
module.exports.viewPetition = async (app, req, res) => {
    const id  = req.params.id;
    console.log(`[ View Petition: ${id}]`);
    try {
        const petition = await getP(id);
        if(!petition) 
        return res.status(404).json(`Não existe petição cadastrada com o id ${id}.`);
        else 
        return res.status(200).json(petition);
    } catch (error) {return res.status(404).json(`[View Petition ${id} ERROR] - ${error}`);
    }
}
module.exports.addP = async (app, req, res) => {
    let petition = req.body;
    let token = req.headers['authorization'];

    if(!token) return res.status(401).json('No token provided');
    const response_token = await validateToken(res, token);

    if(response_token) {
        const { error } = schemaPetition.validate(petition);
        if(error) return res.status(500).json({error: error.details, msg: "Erro!"});
            
        console.log(`Add Petition: ${petition}`);
    
        try {
        const id =  await addP(petition, response_token.email);
        return res.status(200).json(`Petição adicionada com sucesso ID: ${id}`);
        } catch (error) {
        return res.status(500).json(`[Add Petition ERROR] - ${error}`);
        }
    } 
}

module.exports.signP = async (app, req, res) => {
    console.log('[Sign Petition]');
    
    const id  = req.params.id;
    let token = req.headers['authorization'];
    if(!token) return res.status(401).json('Não existe o token indicado');
    const response_token = await validateToken(res, token);

    if(response_token) {
        try {
            const petition = await getP(id);
            if(!petition) return res.status(404).json(`Não existe petição cadastrada com o id ${id}.`);

            if(!petition.signaturesEmails.includes(response_token.email)) {
                const signatures = petition.signatures + 1;
                const signaturesEmails = petition.signaturesEmails; 
                signaturesEmails.push(response_token.email);
                const newSignature = {signatures, signaturesEmails};
                const result = await signP(id, newSignature);
                return res.status(200).json(`Petição ${id}, assinada!`);
            } else {
                return res.status(400).json(`A petição ${id} de ${petition.title} já foi assinada!`);
            }
        } catch (error) {
            return res.status(404).json(`[${id} ERROR] - ${error}`)
        }
    }
}

async function validateToken(res, token) {
    try {
        const result = await checkToken(token);
        if(!result) {
        res.status(401).json(`Token ${token} não existe`);
        return false;}
        else
        return result;
    } catch (error) {res.status(401).json(`[Check Token ${token} ERROR] - ${error}`);
        return false; 
    }
}
