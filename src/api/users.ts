import { Request, Response, Router } from "express";

export default async (router: Router) => {

  const path = '/users'

  router.get(path, (req: Request, res: Response) => { res.status(200).end(); });

}