import express, {
  Express,
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import cors from "cors";
import { PORT } from "./config";
import { FormRouter } from "./routers/form.router";

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes("/api/")) {
        res.status(404).send("Not Found !");
      } else {
        next();
      }
    });

    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes("/api/")) {
          console.error("Error : ", err.stack);
          res.status(500).send("Error !");
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const formRouter = new FormRouter();

    this.app.use("/api/form", formRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(` ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
