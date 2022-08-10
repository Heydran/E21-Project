import { Router, Request, Response  } from "express"
const router: Router = new Router()

router.get("/", (req: Request, res: Response) => {
    return res.send("routes teste")
})

export {router}