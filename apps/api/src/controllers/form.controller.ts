import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";

export class FormController {
  async submitData(req: Request, res: Response, next: NextFunction) {
    const { name, email, address, phoneNumber, gender, hobby } = req.body;

    try {
      const findEmail = await prisma.client.findUnique({
        where: {
          email,
        },
      });

      if (findEmail) {
        return res.status(401).send({
          success: false,
          message: "You have submit your data before",
        });
      }

      const clientData = await prisma.client.create({
        data: {
          email,
          address,
          phoneNumber,
          hobby,
          gender,
          name,
        },
      });

      return res.status(200).send({
        success: true,
        message: "Create client data success",
        result: clientData,
      });
    } catch (error) {
      console.log(error);
      next({ success: false, message: "Cannot submit data", error });
    }
  }

  async readData(req: Request, res: Response, next: NextFunction) {
    try {
      const listClients = await prisma.client.findMany();

      return res.status(200).send({
        success: true,
        message: "Read data success",
        result: listClients,
      });
    } catch (error) {
      next({
        success: false,
        message: "Cannot read data",
      });
    }
  }
}
