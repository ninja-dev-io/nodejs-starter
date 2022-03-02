import { Router } from "express";
import users from "./users";

export default (router: Router) => {
  users(router)
}