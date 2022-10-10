import { Router, Request, Response } from "express"
import { User } from "./../entity/User"
import { sign } from "jsonwebtoken"
import { hash, compare } from "bcrypt"
import { createTransport } from "nodemailer"
import { env } from "process"


const router: Router = Router()

router.post("/signUp", async function (req: Request, res: Response) {
    try {
        const user = await req.app.get("myDataSource").getRepository(User).findOneBy(
            { userCode: req.body.newUser.userCode })
        try {
            if (user.userEmail == req.body.newUser.userEmail) {
                return res.json({
                    registered: false,
                    userCode: null,
                    error: "Email já cadastrado"
                })
            }
        } catch { }
        const encoded = hash(req.body.newUser.userPasswd, 10, async (err, hash) => {

            const tuser = req.app.get("myDataSource").getRepository(User).create({

                userName: req.body.newUser.userName,
                userPhone: req.body.newUser.userPhone,
                userEmail: req.body.newUser.userEmail,
                userMoney: 0,
                userPasswd: hash
            })
            const results = await req.app.get("myDataSource").getRepository(User).save(tuser)

            const user = await req.app.get("myDataSource").getRepository(User).findOneBy({ userEmail: req.body.newUser.userEmail })
            var result = {}
            if (user)
                result = ({
                    registered: true,
                    userCode: user.userCode
                })
            else
                result = ({
                    registered: false,
                    userCode: null
                })
            return res.json(result)
        })

    } catch (e) {
        console.log(e.message);

        return res.json({
            result: {
                registered: false,
                userCode: null,
                error: e
            }
        })
    }
})

router.get("/query", async (req: Request, res: Response) => {
    const users = await req.app.get("myDataSource").getRepository(User).find()
    console.log(users)

    res.json(users)
})
router.post("/query", async (req: Request, res: Response) => {
    const user = await req.app.get("myDataSource").getRepository(User).findOneBy(
        { userCode: req.body.userCode })


    res.json(user)
})

router.put("/edit/:id", async (req: Request, res: Response) => {
    const user = await req.app.get("myDataSource").getRepository(User).findOneBy(
        { userCode: req.params.id }
    )
    req.app.get("myDataSource").getRepository(User).merge(user, req.body)
    const results = await req.app.get("myDataSource").getRepository(User).save(user)
    return res.json(results)
})

// router.delete("/delete/:id", async (req: Request, res: Response) => {
//     const results = await req.app.get("myDataSource").getRepository(User).delete(req.params.id)
//     return res.json(results)
// })

router.post("/login", async (req: Request, res: Response) => {
    console.log(req.body.user)

    const user = await req.app.get("myDataSource").getRepository(User).findOneBy(
        { userEmail: req.body.user.email }
    )
    var token = null
    var result = {}
    if (user) {


        compare(req.body.user.password, user.userPasswd, async (err, val) => {
            if
                (val)
                result = {
                    logged: true,
                    user: {
                        userName: user.userName,
                        userPhone: user.userPhone,
                        userCode: user.userCode,
                        userMoney: user.userMoney
                    }

                }
            else
                result = { logged: false, user: null, error: "credenciais invalidas" }
            token = await sign(result, "segredo", { expiresIn: 604800 })
            return res.json({ token })
        })
    }
    else {
        return res.json({ token: { logged: false, user: null, error: "credenciais invalidas" } })
    }
})

router.post("/setMoney", async (req: Request, res: Response) => {
    const user = await req.app.get("myDataSource").getRepository(User).findOneBy(
        { userCode: req.body.id }
    )
    req.app.get("myDataSource").getRepository(User).merge(user, { userMoney: req.body.userMoney })
    const results = await req.app.get("myDataSource").getRepository(User).save(user)
    return res.json(results)
})

router.post("/recoverPasswd", async (req: Request, res: Response) => {
    try {
        var results = {}
        const user = await req.app.get("myDataSource").getRepository(User).findOneBy(
            { userEmail: req.body.user.userEmail }
        )
        console.log(user);

        if (user) {
            console.log("user", process.env.EMAIL_URL, "pass", process.env.EMAIL_PASSWORD);

            const transporter = await createTransport({
                host: "smtp.umbler.com",
                port: 587,
                auth: {
                    user: process.env.EMAIL_URL,
                    pass: process.env.EMAIL_PASSWORD
                }
            })
            const mailOptions = {
                from: process.env.EMAIL_URL,
                to: user.userEmail,
                subject: `Recover password for BeezNees Account`,
                text: `Hellow ${user.Name}, input this code ${"placeholder"} in our app to change your password`
            }
            const result = await transporter.sendMail(mailOptions).then(info => {
                console.log(info)
                res.json(
                    {
                        result:
                        {
                            successful: true,
                            message: `Sucessfull send email ${info}`
                        }
                    })
            }).catch(err =>
                res.json(
                    {
                        result:
                        {
                            successful: false,
                            error: err.message
                        }
                    }))
        }
        else results = { result: { successful: false, error: "Email not registered" } }


    } catch {

    }

})

export default router