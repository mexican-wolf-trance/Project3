const jsonwebtoken = require('jsonwebtoken');
const { confirmUserExists } = require('../../users/UserChecker');

const tokenSignature = 'covid_is_hell_on_earth';

const tokenAuth = async (req, res, next) =>
{
    const header = req.headers.Authorization;

    if (header === undefined)
    {
        res.sendStatus(401);
        return;
    }

    const [type, token] = header.split(' ');

    if (type === 'Bearer')
    {
        try
        {
            const payload = jsonwebtoken.verify(token, tokenSignature);
            console.log("payload: ", payload)
            const doesUserExist = await confirmUserExists(payload.userId);

            console.log("doesUserexist? ", doesUserExist)
            if (doesUserExist)
            {
                next();
            }
            else
            {
                res.sent(401);
            }
        }
        catch (error)
        {
            res.send(error.message);
        }
    }
};

module.exports = tokenAuth;
