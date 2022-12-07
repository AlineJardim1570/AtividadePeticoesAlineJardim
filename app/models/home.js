const ObjectId = require('mongodb').ObjectId;
const client = require("../../config/dbConnection");

module.exports = {

    checkEmail: async (email) => {console.log(`[${email}]`);
    const result = await client.db("DSW").collection("usuarios").findOne({email});
    return result;
    },

    addP: async (data, email) => {console.log(`[Add Petition]`);
    try {const newP = {
                description: data.description, 
                date: new Date(),
                goal: data.goal,
                signatures: 0,
                signaturesEmails: [],
            }
    const addPt = await client.db("DSW").collection("peticoes").insertOne(newP);
    return addPt.insertedId;
    } catch (error) {console.log(`Error: ${error}`);}
    },

    addUser: async (data) => {console.log(`[Add user]`);
    try {const newUser = {
                email: data.email, 
                password: data.password, 
                token: data.token,
            }

    const addedUser = await client.db("DSW").collection("usuarios").insertOne(newUser);
    return addedUser;
    } catch (error) {console.log(`${error}`);
    }
    },

    getpeticoes: async () => {
    const peticoes = await client.db("DSW").collection("peticoes").find({}).toArray();
    return peticoes;
    },

    getP: async (id) => {
    console.log(`[Get Petition: ${id}]`);
    const petition = await client.db("DSW").collection("peticoes").findOne({_id: new ObjectId(id)
        });
    return petition;
    },

    checkToken: async (token) => {
    console.log(`[Check Token: ${token}]`);
    try {
            const result = await client.db("DSW").collection("usuarios").findOne({token});
            return result;
    } catch (error) {console.log(`[ ${token}] ERROR: ${error}`);
    }
    },

    updateP: async (id, data) => {
    console.log(`[Update Petition: ${id}]`);
    const petition = await client.db("DSW").collection("peticoes").updateOne({ _id: new ObjectId(id) },{$set: 
        {
        description: data.description,
        goal: data.goal,
        date: new Date()
        }
            }
        );
return petition;
    },
    signP: async (id, data) => {console.log(`[${id}]`);
    const petition = await client.db("DSW").collection("peticoes").updateOne({ _id: new ObjectId(id) },{$set: 
                {
    signatures: data.signatures
                }
            }
        );
    return petition;
    }}